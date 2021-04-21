
import {ImageBackground, Image,Alert, Button,  ScrollView,
  TextInput, TouchableOpacity,
  StyleSheet} from 'react-native';
import React, { useState } from 'react';


import { View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";


import ImagePicker from '../components/ImagePicker';





const FaceRecognition = props =>  {


const [mood, setMood] = useState();


const getMood = async () => {
 

  console.log("Detecting mood....");
    let res= await fetch('http://192.168.1.7:8000/image');
    let responseJson = await res.json();

    if (responseJson.mood) {
      setMood(responseJson.mood);
      console.log(mood);
    }
  }

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


        <TouchableOpacity style={styles.btn} onPress={getMood}
        onPress={() =>
          { 
          if(mood==='neutral'){
            props.navigation.navigate("Calm");
          }else if(mood==='happy'){
            props.navigation.navigate('Happy Tracks');
          }else if(mood==='surprise'){
            props.navigation.navigate('Excited');
          }else if(mood==='sad'){
            props.navigation.navigate('Sad');
          }else if(mood==='angry'){
            props.navigation.navigate('Angry');
          }else{
            props.navigation.navigate('Calm');
          }
        }
      
        }
          
        >
        <Text style={styles.text}>Play Music</Text>
       </TouchableOpacity>
        

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
  btn:{
    width:300,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf:'center',
    backgroundColor: "#1D8778"
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
