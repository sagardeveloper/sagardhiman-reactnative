import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CardComponent from '../../Components/CardComponent/CardComponents';
import Header from '../../Components/HeaderCompenet/HeaderComponent';
import Scale from '../../Components/Scale';
import {bearerToken, apis} from '../../Helper/config';
import axios from 'axios';
import {styles} from './HomeScreenStyle';
import Context from '../../Context/Store';
import {} from 'react-navigation';

interface HomeProps {
  id: number;
  navigation: any;
}

function HomeScreen(props: HomeProps) {
  let contextType = useContext(Context);

  console.log('contextType', contextType);
  //
  const [categories, setCategories] = useState([]);
  const [product, setProducts] = useState([]);
  //

  const willRenderCall = () =>
    props.navigation.addListener('willFocus', payload => {
      console.debug('willFocus');
    });

  const selectedCategory = (selecteItem: any, selectedIndex: number) => {
    let _localState = categories;

    var itemArray: any = [];

    _localState.map((selectedItem: any, indexNumber: any) => {
      let _itemData: any = selectedItem;
      if (selecteItem == 'All') {
        _itemData['selected'] = false;
      }
      if (selecteItem != 'All' && indexNumber == selectedIndex) {
        _itemData['selected'] = true;
      } else {
        _itemData['selected'] = false;
      }
      itemArray.push(_itemData);
    });
    setCategories(itemArray);
    getSelectedCategoryApi(selecteItem?.name);
  };

  const categoryChip = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => selectedCategory(item, index)}
        style={[
          styles.categoryStyle,
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

  const gotoDetails = (_product: any) => {
    console.log('detail >>', _product);
    props.navigation.navigate('DetailScreen', _product?._id);
  };

  const productCard = ({item}) => {
    return (
      <CardComponent productList={item} navigation={() => gotoDetails(item)} />
    );
  };

  const getProductListApi = () => {
    let _category = apis.baseUrl + apis.getCatergoy;
    let _productList = apis.baseUrl + apis.getProductList;

    let config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const requestOne = axios.get(_category, config);
    const requestTwo = axios.get(_productList, config);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          setProducts(responses[1]?.data?.products);
          contextType.setProducts(responses[1]?.data?.products);
          let newArray: any = [{name: 'All', selected: true}];

          responses[0]?.data?.categories.map(
            (selcetedItem: any, selectedIndex: any) => {
              let _localObject = selcetedItem;

              _localObject['selected'] = false;

              newArray.push(_localObject);
            },
          );

          setCategories(newArray);
        }),
      )
      .catch(errors => {});
  };

  const getSelectedCategoryApi = (_category: any) => {
    let _arrayCategory: any = [];
    if (_category == 'All') {
      contextType.setProducts(product);
      return;
    }

    product.map((allCategory: any) => {
      if (_category == allCategory?.category) {
        _arrayCategory.push(allCategory);
      }
      contextType.setProducts(_arrayCategory);
    });
  };

  useEffect(() => {
    getProductListApi();
  }, []);

  return (
    <View style={styles.mainScreen}>
      <Header />
      <View style={styles.chipMainStyle}>
        <FlatList
          data={categories}
          renderItem={categoryChip}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ScrollView style={styles.scrollViewStyle}>
        <FlatList
          data={contextType.products}
          renderItem={productCard}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() =>
          props.navigation.navigate('CreateProductScreen', getProductListApi)
        }>
        <Image
          source={require('../../assets/plus.png')}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
