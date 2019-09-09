
// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { REGISTERURL } from './store/constants';

export default class SignUp extends React.Component {
  state = {
    user_role:1,
    register_username:'',
    register_password:'',
    register_email:"",
    register_countryCode:'',
    register_mobile_no:''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const {user_role ,register_username, register_password, register_email,register_countryCode,register_mobile_no } = this.state
    try {
      // here place your signup logic
     let data={
    user_role:1,
    register_username:register_username,
    register_password:register_password,
    register_email:register_email,
    register_countryCode:register_countryCode,
    register_mobile_no:register_mobile_no
     }

   
fetch(REGISTERURL, {
  method : 'POST',                 // or 'PUT'
  body   : JSON.stringify({
        'user_role':'1',
    'register_username':'NB',
    'register_password':'1111',
    'register_email':'N@g.com',
    'register_countryCode':91,
    'register_mobile_no':1212121212
  }),   // data can be `string` or {object}!
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => {
  if(response.status==200){
    alert('successfully signed in');
    this.props.navigation.navigate('Login')

  }else{
    
    // alert(response.status_message);
    alert(JSON.stringify(response));
  }

})
.catch(error => {alert(error)});    

     
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('register_username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('register_password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('register_email', val)}
        />

        <TextInput
          style={styles.input}
          placeholder='Country Code'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('register_countryCode', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('register_mobile_no', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})