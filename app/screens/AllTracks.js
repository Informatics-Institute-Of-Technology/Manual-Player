import React from 'react';
import { FlatList , View} from 'react-native';


import {ImageBackground} from 'react-native';

import {
    StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const AllTracks = props => {

  return (
    <ImageBackground source={require('../../assets/girl.jpg')} style={styles.image}>

   

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

export default AllTracks;

//Page displaying all tracks
