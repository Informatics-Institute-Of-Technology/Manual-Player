
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import color from './app/misc/color';
import React, {useState, useEffect, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ActivityIndicator, View, Image, TouchableHighlight } from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.APP_BG,
  },
};


export default function App() {

  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 5000);
  }, []);

  return splash ? 
  (<View style={styles.container1}>
  <Image style={styles.logo} source={require('./assets/Logo.jpg')} />
  <Image style={styles.gif} source={require('./assets/waves.gif')} />
  </View>) : (
    <AudioProvider>
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  </AudioProvider>
  );

}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor:"black",
    justifyContent: "center",
    alignItems: "center"
  },

  container2: {
    flex: 1
  },

  logo: {
    width: 300,
    height: 320
  }
});

