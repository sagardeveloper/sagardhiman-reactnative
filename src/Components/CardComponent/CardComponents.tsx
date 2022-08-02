import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {Scale} from '../Scale';

const {width, height} = Dimensions.get('screen');

interface cardProps {
  productList: any;
  navigation: any;
}

export default function CardComponent(props: cardProps) {
  return (
    <TouchableOpacity
      style={styles.headerStyle}
      onPress={() => props.navigation()}>
      <View
        style={{
          flex: 0.7,
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: '#5fff',
          //   width: Scale(50),
          //   height: Scale(50),
          //   alignSelf: 'center',
          //   paddingLeft: Scale(15),
        }}>
        {/* {props.leftComponent()} */}
        {/* <Text style={{fontSize: Scale(15)}}>UPayments Store</Text> */}
        <Image
          source={
            props?.productList?.avatar
              ? {uri: props?.productList?.avatar}
              : require('../../assets/searchIcon.png')
          }
          resizeMode="contain"
          style={{
            width: Scale(120),
            height: Scale(80),
          }}
        />
      </View>

      <View
        style={{
          flex: 0.2,
          backgroundColor: '#000',
          justifyContent: 'space-between',
          borderRadius: Scale(9),
          padding: Scale(6),
          width: Platform.OS === 'ios' ? width * 0.046 : width * 0.455,
        }}>
        <View
          style={{
            flex: 0.6,
            //  backgroundColor: 'red'
          }}>
          <Text numberOfLines={1} style={{color: '#fff', fontSize: Scale(12)}}>
            {props?.productList?.name}
          </Text>
        </View>

        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', fontSize: Scale(12)}}>
            ${props?.productList?.price}
          </Text>
          <Image
            source={require('../../assets/pencil.png')}
            resizeMode="contain"
            style={{width: Scale(15), height: Scale(15)}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    display: 'flex',
    backgroundColor: '#EAE8EE',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Scale(15),
    height: Scale(200),
    width: Scale(178),
    marginVertical: Scale(5),
    marginHorizontal: Scale(5),
    elevation: 5,
  },
});
