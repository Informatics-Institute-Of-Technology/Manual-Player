
import {ImageBackground, Image,Alert, Button,  ScrollView,
  TextInput,
  StyleSheet} from 'react-native';
import React, { useState } from 'react';


import { View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";


import ImagePicker from '../components/ImagePicker';


const FaceRecognition = props =>  {

  const [selectedImage, setSelectedImage] = useState();

  const imageTakenHandler = imagePath => {
      setSelectedImage(imagePath);
  };


  return (
    
       <View style={styles.container}>
              <ImageBackground source={require('../../assets/background.png')} style={styles.image}>        
              <StatusBar style="auto" />
              <ScrollView>
      <View style={styles.form}>
        <ImagePicker onImageTaken={imageTakenHandler} />
      </View>
    </ScrollView>
             
           
 
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({

  imagePicker: {
    alignItems: 'center',
    marginBottom: 15

  },

            container: {
              flex: 1
            },
        
          
            text: {
              color: "white",
              fontSize: 20
            },
         
            image:{
              flex:1
            }
            
          });

    export default FaceRecognition;
