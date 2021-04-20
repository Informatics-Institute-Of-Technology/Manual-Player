import {ImageBackground} from 'react-native';import React from 'react';
import { View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";


import {
    StyleSheet,
    TouchableOpacity
  } from "react-native";

const MenuOne = props => {
    return(
            <View style={styles.container}>
             <ImageBackground source={require('../../assets/background.png')} style={styles.image}>

              <StatusBar style="auto" />
            
              <TouchableOpacity style={styles.btn} onPress={()=> {
                  props.navigation.navigate('Manual Play');
              }}>
                <Text style={styles.text}>MANUAL PLAY</Text>
              </TouchableOpacity>
        
              <TouchableOpacity style={styles.btn} onPress={()=> {
                  props.navigation.navigate('Recognition');
              }}>
                <Text style={styles.text}>USE FACE RECOGNITION</Text>
              </TouchableOpacity>
              </ImageBackground>
            </View>
          );
        }
        
        const styles = StyleSheet.create({
            container: {
              flex: 1
            },
          
            image: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            },
          
            btn: {
              width: "80%",
              borderRadius: 25,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              backgroundColor: "#1D8778"
          
            },
          
            text: {
              color: "white",
              fontSize: 20
            }
            
          });

export default MenuOne;