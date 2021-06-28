import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {io} from 'socket.io-client'
import {SERVER_URL} from './config.js'

import Home from './components/home.js';
import QuickWord from './components/quickWord/quickWord.js';
import MagicNumber from './components/magicNumber/magicNumber.js';
import Pregame from './components/pregame.js';

const Stack = createStackNavigator();
export const socketB = io(SERVER_URL)

export default class App extends Component {
  
  componentDidMount() {
   const socket = socketB
    
  }

  render() {


    
  

    /* async function getRandom() {
      try {
        fetch(this.SERVER_URL + '/magicNumber', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
        .then((number) => {
            console.log(number);
            this.setState({ number: number });
          })
      }
      catch (error) {
        console.log("Error : " + error);
      }
    } */
  return (
    <NavigationContainer>
      <Text>Welcome to cross pwgame!</Text>
        <Stack.Navigator initialRouteName="Pregame" screenOptions={{headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name="Pregame" component={Pregame} />
          <Stack.Screen name="QuickWord" component={QuickWord} />
          <Stack.Screen name="MagicNumber" component={MagicNumber} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
