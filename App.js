import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/Screens/Home/HomeScreen';
import DetailScreen from './src/Screens/Details/DetailScreen';
import CreateProductScreen from './src/Screens/CreateProduct/CreateProductScreen';
import Store from './src/Context/Store';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  CreateProductScreen: {
    screen: CreateProductScreen,
  },

  DetailScreen: {
    screen: DetailScreen,
  },
});
const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [products, setProducts] = React.useState([]);
  const value = {products, setProducts};

  return (
    <Store.Provider value={value}>
      <AppContainer />
    </Store.Provider>
  );
}
