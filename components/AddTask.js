import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { Container, Header, Left, Body, Right, Button, Title, Picker, Text, Content, Form, Item, Input, Label, DatePicker } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ADD_TODO, ALL_TASKS } from './constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    alignContent: 'space-around',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'

  }
});

class AddTask extends Component {

  static navigationOptions = {
    title: 'Add Tasks',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="edit" color={tintColor} size={20} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      selectedReminder: undefined,
      selectedCategory: undefined,
      task: ''
    };

  }

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  }

  onValueChangeReminder(value) {

    this.setState({
      selectedReminder: value
    });
  }

  onValueChangeCategory(value) {

    this.setState({
      selectedCategory: value
    });
  }
  onChangeTask = (value) => {
    this.setState({ task: value });
  }


  onSubmit = () => {
    const { selectedCategory, selectedReminder, task, chosenDate } = this.state;
    let Data = {
      task: task,
      date: chosenDate.toString().substr(4, 12),
      reminder: selectedReminder,
      category: selectedCategory
    }
    this.props.AddTask(Data, this.props.data);
    alert(' Task Added ');
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');

  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Task</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={this._signOutAsync}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Content>

          <Form style={styles.form} >

            <Item rounded style={{ width: 350, height: 60, marginTop: 10 }} >
              <Input placeholder='Enter Task' onChangeText={(task) => this.setState({task})} value={this.state.task} />
            </Item>

            <Item rounded style={{ width: 350, height: 60, marginTop: 10 }} >

              <DatePicker
                // minimumDate={new Date(2018, 1, 1)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}

              />
            </Item>

            <Item rounded style={{ width: 350, height: 60, marginTop: 10 }}>

              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selectedReminder}
                onValueChange={this.onValueChangeReminder.bind(this)}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
              >
                <Picker.Item label="select reminder" value={undefined} />
                <Picker.Item label="none" value="none" />
                <Picker.Item label="daily" value="daily" />
                <Picker.Item label="weekly" value="weekly" />
                <Picker.Item label="monthly" value="monthly" />
                <Picker.Item label="yearly" value="yearly" />
              </Picker>

            </Item>


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
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Wishlist" value="Wishlist" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Finished" value="Finished" />
              </Picker>

            </Item>

            <Button rounded style={{ marginTop: 10 }} onPress={this.onSubmit}
              disabled={this.state.selectedCategory != undefined && this.state.selectedReminder && this.state.task != '' ? false : true}
            >
              <Text>Add Task</Text>
            </Button>


          </Form>
        </Content>
      </Container>
    )

  }
  componentDidMount(){
    
 const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
     
      this.setState({
        task:'',
        selectedCategory:'',
        selectedReminder:''
      });
    });
  }
}
function mapStateToProps(state) {
  return {
    data: state
  }
}
function addTaskToDB(newData, oldState) {

  return async function (dispatch) {

    let getData = await AsyncStorage.getItem(ALL_TASKS);
    let parseData = JSON.parse(getData);

    if (parseData) {
      parseData.push(newData);
      await AsyncStorage.setItem(ALL_TASKS, JSON.stringify(parseData));
      let updatedData = await AsyncStorage.getItem(ALL_TASKS);
      let parseUpdatedData = JSON.parse(updatedData);
      dispatch({ type: ADD_TODO, params: parseUpdatedData });

    } else {
      await AsyncStorage.setItem(ALL_TASKS, JSON.stringify([newData]));

      let getData = await AsyncStorage.getItem(ALL_TASKS);
      let parseData = JSON.parse(getData);
      dispatch({ type: ADD_TODO, params: parseData });

    }


  }
}








function mapDispatchToProps(dispatch) {

  return {
    AddTask: (newData, oldState) => { dispatch(addTaskToDB(newData, oldState)) },
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
