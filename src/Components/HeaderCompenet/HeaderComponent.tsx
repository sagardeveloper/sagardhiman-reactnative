import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {Scale} from '../Scale';

interface headerProps {}

export default function Header(props: headerProps) {
  return (
    <View style={styles.headerStyle}>
      <View
        style={{
          flex: 0.85,
          justifyContent: 'center',
          paddingLeft: Scale(15),
        }}>
        <Text style={{fontSize: Scale(20)}}>UPayments Store</Text>
      </View>

      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/searchIcon.png')}
          resizeMode="contain"
          style={{width: Scale(25), height: Scale(25)}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.1,
    backgroundColor: '#EAE9EE',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
