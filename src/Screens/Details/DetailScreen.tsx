import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import axios from 'axios';
import {bearerToken, apis} from '../../Helper/config';
import {styles} from './DetailScreenStyle';

interface detailProps {
  id: number;
  navigation: any;
}

export default function DetailScreen(props: detailProps) {
  const [img, setImg] = useState('');
  const [textPrice, setTextPrice] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [desc, setDesc] = useState('');

  const getProductListApi = () => {
    let {params} = props?.navigation?.state;
    let _productList = apis.baseUrl + apis.getProductList + params;

    let config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const requestOne = axios.get(_productList, config);

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          setImg(responses[0]?.data?.product?.avatar);
          setTextTitle(responses[0]?.data?.product?.name);
          setDesc(responses[0]?.data?.product?.description);
          setTextPrice(responses[0]?.data?.product?.price);
        }),
      )
      .catch(errors => {
        // react on errors.
      });
  };

  useEffect(() => {
    getProductListApi();
  }, []);

  return (
    <View style={styles.mainScreen}>
      <View style={styles.topMainStyle}>
        <Image
          source={
            img?.length > 0 ? {uri: img} : require('../../assets/dummy.jpg')
          }
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>

      <View style={styles.scondStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <View style={styles.textTopStyle}>
            <Text numberOfLines={1} style={styles.textTitleStyle}>
              {textTitle}
            </Text>

            <Text style={styles.textPriceStyle}>${textPrice}</Text>
          </View>

          <View style={styles.descriptionStyle}>
            <Text style={styles.descTextStyle}>{desc}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
