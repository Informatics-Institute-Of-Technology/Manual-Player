import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { abs } from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const TrackItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.track}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.artist}>{props.artist}</Text>
            </View>
            <View style={styles.left}>
       
                <Icon style={styles.icon} name="heart-outline" color="#1D8778" size={25}  onPress={props.onViewDetail}/>
         
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

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
  }
  
});

export default TrackItem;
