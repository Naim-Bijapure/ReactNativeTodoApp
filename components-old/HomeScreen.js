import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';

import SignUp from '../components/SignUp';
import Login from '../components/Login';
import MainPage from './MainPage';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  SignUp: { screen: SignUp},
  Login: { screen: Login },
  MainPage:{screen:MainPage}
});

export default createAppContainer(TabNavigator);