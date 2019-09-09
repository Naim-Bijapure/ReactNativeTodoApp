/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const FETCH_IMAGES='https://jumlakuwait.com/api/ManageProduct_api/getAllCategories';
const IMG_SRC='https://jumlakuwait.com/images/category_imgs/';

import State from './store/state';

class MainPage extends React.Component{

    
    render(){
        const { navigation } = this.props;
        const user = navigation.getParam('user', false);
        const userName = navigation.getParam('userName', 'invalid');

  return(    
    <Fragment>
        <View>
          <Text>main page</Text>           
        </View>
    </Fragment>
  )
    }

    componentDidMount(){
    
        // fetch(FETCH_IMAGES).then((res)=>(res.json()))
        //  .then(
        //       (response)=>{
        //           alert(JSON.stringify(response.status_message));
        //       let arrResponse=response.status_message;
        //       let  newArr=[]; 
        //        arr.map((e)=>{
        //            newArr.push(e.category_img); 
        //        }); 
        //       }
        //  );
    }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default MainPage;
