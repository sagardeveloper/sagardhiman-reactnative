import {StyleSheet, Dimensions, Platform} from 'react-native';
import Scale from '../../Components/Scale';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#EAE9EE',
  },

  topMainStyle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    width: width,
    height: height * 0.7,
  },
  btnStyle: {
    backgroundColor: '#fff',
    right: Scale(20),
    borderRadius: Scale(30),
    position: 'absolute',
    zIndex: 100,
    bottom: Platform.OS === 'ios' ? Scale(25) : Scale(25),
    display: 'flex',
  },
  scondStyle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: Scale(20),
    borderTopRightRadius: Scale(20),
  },
  scrollViewStyle: {
    paddingHorizontal: Scale(20),
    borderWidth: Scale(0.5),
    overflow: 'scroll',
  },
  textTopStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Scale(10),
  },
  textTitleStyle: {
    fontSize: Scale(18),
    color: '#fff',
    width: Scale(320),
  },
  textPriceStyle: {fontSize: Scale(16), width: Scale(250), color: '#fff'},
  descriptionStyle: {
    marginTop: Scale(10),
  },
  descTextStyle: {
    fontSize: Scale(18),
    color: '#fff',
    width: Scale(370),
  },
});
