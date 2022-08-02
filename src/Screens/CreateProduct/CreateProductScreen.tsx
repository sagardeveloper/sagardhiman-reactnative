import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Scale from '../../Components/Scale';
import {styles} from './CreateProductScreenStyle';

import axios from 'axios';
import {bearerToken, apis} from '../../Helper/config';

interface detailProps {
  id: number;
  navigation: any;
}

export default function CreateProductScreen(props: detailProps) {
  const [imgeLink, setImgLink] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [textTitle, setTextTitle] = useState('');

  const [textPrice, setTextPrice] = useState(0);

  const [textDesc, setTextDesc] = useState('');

  const getCategoryListApi = () => {
    let _category = apis.baseUrl + apis.getCatergoy;

    let config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const requestOne = axios.get(_category, config);

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          let newArray: any = [];

          responses[0]?.data?.categories.map(
            (selcetedItem: any, selectedIndex: any) => {
              let _localObject = selcetedItem;

              if (selectedIndex == 0) {
                _localObject['selected'] = true;
              } else {
                _localObject['selected'] = false;
              }
              newArray.push(_localObject);
            },
          );

          setCategories(newArray);
        }),
      )
      .catch(errors => {
        // react on errors.
      });
  };

  const createProductApi = () => {
    let _category = apis.baseUrl + apis.getProductList;

    let config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const options = {
      name: textTitle,
      price: textPrice,
      category: selectedCategory,
      description: textDesc,
      avatar: imgeLink,
      developerEmail: apis.developerEmail,
    };
    axios
      .post(_category, options, config)
      .then(() => {
        let {params} = props?.navigation?.state;
        params();
        props.navigation.goBack();
      })
      .catch(errors => {
        console.log('errors', errors);

        // react on errors.
      });
  };

  useEffect(() => {
    getCategoryListApi();
  }, []);

  const handleTitleText = (title: string) => {
    setTextTitle(title);
  };

  const handlePriceText = (price: number) => {
    setTextPrice(price);
  };

  const handleDescriptionText = (desc: string) => {
    setTextDesc(desc);
  };

  const handleImageLink = (link: string) => {
    setImgLink(link);
  };

  const handelSelectedCategory = (comingItem: any, indexS: number) => {
    setSelectedCategory(comingItem?.name);

    let _localState = categories;

    var itemArray: any = [];

    _localState.map((selectedItem: any, indexNumber: any) => {
      let _itemData: any = selectedItem;
      if (indexNumber == indexS) {
        _itemData['selected'] = true;
      } else {
        _itemData['selected'] = false;
      }
      itemArray.push(_itemData);
    });
    setCategories(itemArray);
  };

  const categoryChip = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handelSelectedCategory(item, index)}
        style={[
          styles.categoryChipStyle,
          {
            borderColor: item.selected ? '#000' : 'rgba(0,0,0,0.1)',
            backgroundColor: item.selected ? '#000' : '#fff',
          },
        ]}>
        <Text
          style={{fontSize: Scale(16), color: item.selected ? '#fff' : '#000'}}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        enabled
        style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <View style={styles.firstStyle}>
            <Text style={styles.productTextStyle}>Product Title</Text>

            <TextInput
              placeholder="Product title"
              placeholderTextColor={'gray'}
              keyboardType={'default'}
              onChangeText={(text: any) => handleTitleText(text)}
              value={textTitle}
              //   returnKeyType={'done'}
              style={styles.productTextinputStyle}
            />

            {/* Price */}

            <Text style={styles.priceTextStyle}>Price</Text>

            <TextInput
              placeholder="Price"
              placeholderTextColor={'gray'}
              keyboardType={'phone-pad'}
              onChangeText={(text: any) => handlePriceText(text)}
              value={textPrice}
              returnKeyType={'done'}
              style={styles.priceTextInputStyle}
            />

            {/* Description */}

            <Text style={styles.priceTextStyle}>Description</Text>

            <TextInput
              placeholder="Description"
              placeholderTextColor={'gray'}
              keyboardType={'default'}
              textAlignVertical={'top'}
              multiline={true}
              onChangeText={(text: any) => handleDescriptionText(text)}
              value={textDesc}
              returnKeyType={'done'}
              style={styles.descriptionTextInputStyle}
            />

            {/* Image link */}

            <TextInput
              placeholder="Image Link"
              placeholderTextColor={'gray'}
              keyboardType={'default'}
              onChangeText={(text: any) => handleImageLink(text)}
              value={imgeLink}
              returnKeyType={'done'}
              style={styles.imageLinkStyle}
            />

            <FlatList
              data={categories}
              renderItem={categoryChip}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.secondStyle}>
            <TouchableOpacity
              onPress={createProductApi}
              style={styles.createButtonStyle}>
              <Text style={styles.addProductTextStyle}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
