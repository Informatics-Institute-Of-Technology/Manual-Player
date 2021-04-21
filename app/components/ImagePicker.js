import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();
  const [mood, setMood] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };



  
  const [singleFile, setSingleFile] = useState(null);

  const uploadImage = async () => {
    // Check if any file is selected or not
   
    if (singleFile != null) {


      // If file selected then create FormData
      // const fileToUpload =  singleFile;
      var imageData = {
         uri: singleFile,
         type: "image/jpg",
         name: singleFile,
       }
       const body = new FormData()
       body.append('file',imageData)
     
      // Please change file upload URL
      let res= await fetch('http://192.168.1.7:8000/image', {

        method: 'POST',
        body,
      });
      let responseJson = await res.json();
  
   
      if (responseJson.mood) {
        setMood(responseJson.mood)
        alert("Mood detected: "+mood);
      }
      
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
    setSingleFile(image.uri);
    
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.txt}>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>

 
      <TouchableOpacity style={styles.btn}  onPress={takeImageHandler}>
        <Text style={styles.text}>Take Image</Text>
       </TouchableOpacity>
   

<View style={styles.form}>
        <TouchableOpacity style={styles.btn}  onPress={uploadImage}>
        <Text style={styles.text}>Send to API</Text>
       </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom:5
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginVertical:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  btn:{
    width:300,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#1D8778"
  },
  image: {
    width: '100%',
    height: '100%'
  },
  txt:{
    color: "white",
    fontSize: 15
  },
  text: {
    color: "white",
    fontSize: 20
  }
});

export default ImgPicker;
