
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import {db}from '../config';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Tabs');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class AuthLoadingScreen extends React.Component {

  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class TabHomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

    render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button onPress={this._signOutAsync} title="sign out"></Button>
        <Button onPress={this._addData} title="add"></Button>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _addData= async ()=>{
//    db.ref('todos').push({name:'cool'}); 
console.log('added');

//  db.collection('test').add({
  //      data:'yo man'
  //  }).then(()=>{alert('added')}).catch(()=>{alert('error')});
  await AsyncStorage.setItem('all_tasks',JSON.stringify(['hello','cool man'])); 
  
  // var  data=await AsyncStorage.getItem('all_tasks');
    // console.log(JSON.parse(data)); 
  
  }
}

class TabSettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Add Tasks',
  };
   
  constructor(props){
      super(props);
      this.state={
          data:['initial data']
      }
  }

   


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        {this.state.data.map((e)=>{
            return <Text>{e}</Text>
        })}
      </View>
    );


  }

  _getData= async ()=> {
  var getData = await AsyncStorage.getItem('all_tasks');
  let data= JSON.parse(getData);
  return data;

}

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('all_tasks');

    //  console.log(userToken);
    return userToken;
  };

componentDidMount(){
    // alert('hello');
 const { navigation } = this.props;
 
 this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      // Call any action
    //   alert('focused');
    //  console.log(this._bootstrapAsync()); 
    this._getData().then((data)=>{
      console.log(data);
       this.setState({data:data});
        
      });

      // db.collection("test")
      // .get()
      // .then(querySnapshot => {
      //     const data = querySnapshot.docs.map(doc => doc.data());
      //     //   alert(JSON.stringify(data)) // array of cities objects
      //     var arr=[];
      //     data.map((e)=>{
      //         arr.push(e.data);
      //       });
      //       this.setState({data:arr});
      //       console.log(data);
      //   });
    });
}

}


const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const TabNavigator = createBottomTabNavigator({
//   Home: { screen: TabHomeScreen},
//   'Add Tasks': { screen: TabSettingsScreen },

Home: {
    screen: createStackNavigator({ TabScreen1: TabHomeScreen })// wrap it
  },

'Add Tasks': {
    screen: createStackNavigator({ TabScreen1: TabSettingsScreen })// wrap it
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Tabs:TabNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));