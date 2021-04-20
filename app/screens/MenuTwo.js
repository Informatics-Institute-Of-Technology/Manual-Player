import {ImageBackground} from 'react-native';
import React from 'react';
import { View, Text} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import {
    StyleSheet,
    TouchableOpacity
  } from "react-native";


const MenuTwo = props => {
    return(
            <View style={styles.container}>
             <ImageBackground source={require('../../assets/piano.jpg')} style={styles.image}>
                      
              <StatusBar style="auto" />
                    
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.btn} onPress={()=> {
                  props.navigation.navigate('Happy Tracks');
              }}>
               
                <Icon name="emoticon-happy-outline" color="#fff" size={40} />
                <Text style={styles.text}>HAPPY</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.btn} onPress={()=> {
                  props.navigation.navigate('Sad');
              }}>
                <Icon name="emoticon-cry-outline" color="#fff" size={40} />
                <Text style={styles.text}>SAD</Text>
              </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row' }}>
              <TouchableOpacity style={styles.btn}onPress={()=> {
                  props.navigation.navigate('Excited');
              }}>
            
                <Icon name="emoticon-excited-outline" color="#fff" size={40} />
                <Text style={styles.text}>EXCITED</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn}onPress={()=> {
                  props.navigation.navigate('Angry');
              }}>
              <Icon name="emoticon-angry-outline" color="#fff" size={40} />
              <Text style={styles.text}>ANGRY</Text>
              </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btn}onPress={()=> {
                  props.navigation.navigate('Calm');
              }}>   
              <Icon name="emoticon-neutral-outline" color="#fff" size={40} />
              <Text style={styles.text}>CALM</Text>
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
              borderWidth: 8,
              borderColor: 'rgba(52, 52, 52, 0.4)',
          
              marginHorizontal:16,
              width: 165,
              borderRadius: 90,
              height: 165,
              alignItems: "center",
              justifyContent: "center",
              marginBottom:20,
              backgroundColor: "#1D8778"
            
     
          
            },
          
            text: {
              paddingTop:10,
              color: "white",
              fontSize: 20
            }
            
          });

export default MenuTwo;