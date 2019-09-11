import React, { Component } from 'react'

import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, } from 'react-native'
import { Container, Header, Content, Button, Form, Item, Input, Label, Text } from 'native-base';


class Auth extends Component {

  static navigationOptions = {
    title: 'Please sign in',
  };
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }
  onChangeUserName = (value) => {
    this.setState({ userName: value });
  }

  onChangePassword = (value) => {
    this.setState({ password: value });
  }
  render() {
    return (

      <Container>
        <Content>
          <Form style={{ marginTop: 50 }} >
            <Item floatingLabel style={{ paddingBottom: 20 }} >
              <Label >Username</Label>
              <Input onChangeText={this.onChangeUserName} />
            </Item>
            <Item floatingLabel last style={{ paddingBottom: 20 }}>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={this.onChangePassword} />
            </Item>

            <Button style={{ flex: 1, justifyContent: 'center', marginTop: 20 }}
              onPress={this._signInAsync}
              disabled={this.state.password != '' && this.state.userName != '' ? false : true}
            >
              <Text>Login</Text>
            </Button>
          
          </Form>
          <Item style={{marginTop:180}}>

         <Label><Text style={{color:'blue'}}>Developed By : Naim Bijapure</Text></Label> 
          </Item>

          <Item style={{marginTop:10}}>

         <Label><Text style={{color:'blue'}}>Contact: Naimbijapure@gmail.com</Text></Label> 
          </Item>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', this.state.userName);
    this.props.navigation.navigate('Tabs');
  };
}

export default Auth;