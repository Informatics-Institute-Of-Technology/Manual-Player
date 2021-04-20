import {StyleSheet, Text, ActivityIndicator, View, Image, FlatList,TouchableHighlight, ImageBackground} from 'react-native';
import React, {useState, useEffect, Component} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

  export default class Happy extends Component {
   
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        isLoading: true
      };
    }
  
    componentDidMount() {
      fetch('http://192.168.1.7:8000/song/happy')
        .then((response) => response.json())
        .then((json) => {
          this.setState({ data: json.song });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  
    renderTracks() {
      const { data } = this.state;
   
      return data.map((track, index) => (

       
        <View key={track.id} style={styles.container} >
          <Text>{track.title}</Text>
          <Text>{track.artist}</Text>
        </View>
      
      ));


    }

    render() {
      const { loading } = this.state;
  
      if (loading) {
        return (
          <View>
            <ActivityIndicator size="large" color="#0c9" />
          </View>
        );
      }
  
      return (
        <ImageBackground source={require('../../assets/fog.jpg')} style={styles.image}>
        <View style={styles.list}>
          <ScrollView>
          
          {this.renderTracks()}

          </ScrollView>
      
        </View>
        </ImageBackground>
      );
    }

}

  const styles = StyleSheet.create({
    container: {
      marginVertical:10,
      padding:5,
      marginHorizontal:10,
      backgroundColor:"white",
      borderRadius:10
    },
    text:{
    color: "white",
    fontSize: 20
    },
    image: {
      flex: 1
    },
    list:{
      height: height-135
    }
  });