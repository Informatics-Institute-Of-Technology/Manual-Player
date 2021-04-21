import {StyleSheet, Text, ActivityIndicator, View, Image, FlatList,TouchableHighlight, ImageBackground} from 'react-native';
import React, {useState, useEffect, Component} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

  export default class AllTracks extends Component {
   
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        isLoading: true
      };
    }
  
    componentDidMount() {
      fetch('http://192.168.1.3:8000/song/')
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

        <View key={track.id}  style={styles.track}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onViewDetail} useForeground>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.imageContainer}>
              <Image  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.image} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{track.title}</Text>
                <Text style={styles.artist}>{track.artist}</Text>
              </View>
              <View style={styles.left}>
         
                  <Icon style={styles.icon} name="heart-outline" color="#1D8778" size={25}  onPress={props.onViewDetail}/>
           
              </View>
            </View>
          </TouchableCmp>
        </View>
      </View>



       
        // <View key={track.id} style={styles.container} >
        //   <Text>{track.title}</Text>
        //   <Text>{track.artist}</Text>
        // </View>
      
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

    track: {
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      marginHorizontal: 10,
      marginVertical:6,
      height:70
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: 67,
      height:70,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      height: '15%',
      padding: 10
    },
    title: {
      fontSize: 18,
      marginTop: 4,
      color:'white'
    },
    artist: {
      fontSize: 14,
      color: 'white'
    },
    left:{
      position: 'absolute',
      right:0,
      alignSelf:'center'
    },
    icon:{
      padding:10
    },

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
    list:{
      height: height-135
    }
  });