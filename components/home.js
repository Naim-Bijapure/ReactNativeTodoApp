import { connect } from 'react-redux'
import React, { Component } from 'react'

// import {View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container, Item, Content, Card, CardItem, Header, Picker, Left, Badge, Body, Right, Button, Title, Text } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ALL_TASKS, GET_TODO, FILTER_TODO } from './constants';




class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" color={tintColor} size={20} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: undefined
    }
  }


  onValueChangeCategory(value) {

    this.setState({
      selectedCategory: value
    });
    this.props.changeCategory(value);
  }

  render() {
    let { data } = this.props;
    console.log('inside render home', data);

    return (

      <Container>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={this._signOutAsync}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Content>

          <Item rounded style={{ width: 350, height: 60, marginTop: 10 }}>

            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selectedCategory}
              onValueChange={this.onValueChangeCategory.bind(this)}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="select Category" value={undefined} />
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Wishlist" value="Wishlist" />
              <Picker.Item label="Work" value="Work" />
              <Picker.Item label="Finished" value="Finished" />
            </Picker>

          </Item>

          {data.map((e, index) => {
            return (

              <Card rounded key={index} style={{ marginTop: 10, borderColor: 'blue', borderRadius: 10 }}>

                <CardItem header bordered >
                  <Text>{e.task}</Text>
                </CardItem>

                <CardItem footer bordered style={{ flex: 1, justifyContent: 'space-between' }} >

                  <Text style={{ fontSize: 15 }}>Category : {e.category}</Text>

                </CardItem>
                <CardItem footer bordered style={{ flex: 1, justifyContent: 'space-between' }} >
                  <Text style={{ fontSize: 15 }}>Date:{e.date}</Text>
                  <Text style={{ fontSize: 15 }}>reminder: {e.reminder}</Text>

                </CardItem>


              </Card>
            );
          })}
        </Content>
      </Container>


    )

  }
  run = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    const userToken = await AsyncStorage.getItem('userToken');

    // console.log(userToken);
  };
  componentDidMount() {
    this.props.getAllTasks();
  }
}

function mapStateToProps(state) {
  console.log('home state', state);

  return { data: state }
}

function getAllTaskFromDB() {
  return async function (dispatch) {
    let getData = await AsyncStorage.getItem(ALL_TASKS);
    let parsedData = JSON.parse(getData);
    if (parsedData) {

      dispatch({ type: GET_TODO, params: parsedData });
    }
  }
}

function filterTasks(category) {
  return async function (dispatch) {
    let getData = await AsyncStorage.getItem(ALL_TASKS);
    let parsedData = JSON.parse(getData);
    if (parsedData) {

      dispatch({ type: FILTER_TODO, params: { category: category, data: parsedData } });
    }
  }
}


function mapDispatchToProps(dispatch) {

  return {
    getAllTasks: () => { dispatch(getAllTaskFromDB()) },
    changeCategory: (category) => { dispatch(filterTasks(category)) },
  }


}
export default connect(mapStateToProps, mapDispatchToProps)(Home);