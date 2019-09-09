

// Login.js
import React from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet
} from 'react-native'
import State from './store/state';
import { LOGINURL } from './store/constants';

const state = new State();

export default class Login extends React.Component {
    state = {
        login_username: '',
        login_password: '',
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    Login = async () => {
        const { login_username, login_password } = this.state
        try {
            // here place your Login logic
            //   let data = {'login_username':login_username,'login_password':login_password};
            data = { email: 'N@g.com', password: 'NNN' };

            fetch(LOGINURL, {
                method: 'POST',                 // or 'PUT'
                mode: 'no-cors',
                body: JSON.stringify(data),   // data can be `string` or {object}!
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(res => res.json())
                .then(response => {
                    alert('logged in');
                    // this.props.navigation.navigate('MainPage',{user:true,userName:response.user_name})


                    alert(JSON.stringify(response));
                    alert(JSON.stringify(data));

                })
                .catch(error => { alert(error) });




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
                    onChangeText={val => this.onChangeText('login_username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('login_password', val)}
                />
                <Button
                    title='Login'
                    onPress={this.Login}
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