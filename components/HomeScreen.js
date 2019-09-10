
import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';

import home from './home';
import Auth from './Auth';
import AddTask from './AddTask';
import AuthLoading from './AuthLoading';





// const AppStack = createStackNavigator({ Home: home});
const AuthStack = createStackNavigator({ SignIn: Auth });

const TabNavigator = createBottomTabNavigator({
  Home: { screen: home },
  'Add Tasks': { screen: AddTask },

// Home: {
//     screen: createStackNavigator({ TabScreen1: home })// wrap it
//   },

// 'Add Tasks': {
//     screen: createStackNavigator({ TabScreen1: AddTask })// wrap it
//   },
});

 const HomeScreenNavigation= createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    // App: AppStack,
    Auth: AuthStack,
    Tabs:TabNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
export default HomeScreenNavigation;