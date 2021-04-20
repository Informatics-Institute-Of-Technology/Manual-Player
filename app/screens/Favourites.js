
import {ImageBackground} from 'react-native';
import React from 'react';
import { FlatList} from 'react-native';
import { useSelector } from 'react-redux';


import {
    StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

import { View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity
} from "react-native";

const {width, height} = Dimensions.get('window');

const Favourites = props => {

  return (
    <ImageBackground source={require('../../assets/girl.jpg')} style={styles.image}>
    <View  style={styles.list}>
  
    </View>
    </ImageBackground>
  );
};

        
        const styles = StyleSheet.create({
          container: {
            flex: 1
          },
        
          image: {
            flex: 1
          },
          list:{
            height: height-135
          }
            
          });

export default Favourites;