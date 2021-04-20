import React from 'react';
import { FlatList , View} from 'react-native';
import { useSelector } from 'react-redux';

import {ImageBackground} from 'react-native';

import {
    StyleSheet, Text,   TouchableOpacity } from "react-native";
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const SadPlaylist = props => {

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
    text:{
    color: "white",
    fontSize: 20
    },
    image: {
      flex: 1
    },
    btn:{
      width: "45%",
      borderRadius: 20,
      marginHorizontal:5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginVertical:6,
      backgroundColor: 'rgba(29, 135, 120, 0.4)',

    },

    btnactive:{
        width: "45%",
        borderRadius: 20,
        marginHorizontal:5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical:6,
        backgroundColor: '#1D8778',
  
      },
  

    list:{
      height: height-135
    }
});

export default SadPlaylist;

//Page displaying all tracks
