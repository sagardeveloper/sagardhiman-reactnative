import {StyleSheet, Dimensions, Platform} from 'react-native';
import Scale from '../../Components/Scale';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#EAE9EE',
  },
  chipMainStyle: {
    flex: 0.15,
  },
  scrollViewStyle: {
    flex: 0.75,
    paddingHorizontal: Scale(10),
  },
  btnStyle: {
    backgroundColor: '#fff',
    right: Scale(20),
    borderRadius: Scale(30),
    position: 'absolute',
    zIndex: 100,
    bottom: Platform.OS === 'ios' ? Scale(25) : Scale(25),
    display: 'flex',
    elevation: 10,
  },
  categoryStyle: {
    borderRadius: Scale(15),
    paddingHorizontal: Scale(10),
    marginHorizontal: Scale(10),
    borderWidth: Scale(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: Scale(50),
  },
  imageStyle: {
    width: Scale(50),
    height: Scale(50),
  },
});
