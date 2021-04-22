import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import FaceRecognition from '../screens/FaceRecognition';
import MenuOne from '../screens/MenuOne';
import MenuTwo from '../screens/MenuTwo';
import Search from '../screens/SearchTrack';
import Happy from '../screens/Happy';
import Sad from '../screens/Sad';
import Excited from '../screens/Excited';
import Angry from '../screens/Angry';
import Calm from '../screens/Calm';
import ImagePicker from '../components/ImagePicker';

import AudioList from '../screens/AudioList';
import Playlist from '../screens/PlayList';
import Player from '../screens/Player';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MPlayer  from "../screens/MediaPlayer";

import PlaylistDetail from '../components/PlayListDetail';


const NavigatorHome = createStackNavigator(
  

  {
    Home: {
      screen: MenuOne
    },
  
   'Manual Play': {
        screen: MenuTwo
      },

      'PlayList':{
        screen: Playlist

      },
      
      'PlaylistDetail':{
        screen: PlaylistDetail
      },

      'Player':{
        screen: Player
      },

        Recognition: {
          screen: FaceRecognition
        },

        ImagePicker: {
          screen: ImagePicker
        },

        'Happy Tracks':{
          screen: Happy
        },
        'Sad':{
          screen: Sad
        },
        'Excited' :{
          screen: Excited
        },
        
        'Angry' :{
          screen: Angry
        },
        
        'Calm' :{
          screen: Calm
        },
    
      
        'Media-Player':{
          screen: MPlayer
        }
       
    },
   
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor:'white'      
        },
        headerTitleStyle: { alignSelf: 'center' },
        headerTintColor: 'black'
      }
    }

    );


  const NavigatorFav = createStackNavigator(
      {
        'Playlists': {
          screen: Playlist
        }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor:'white'      
        },
        headerTitleStyle: { alignSelf: 'center' },
        headerTintColor: 'black'
      }
    });

    const NavigatorSearch = createStackNavigator(
      {
        Search: {
          screen: Search
        }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor:'white'      
        },
        headerTitleStyle: { alignSelf: 'center' },
        headerTintColor: 'black'
      }
    });
    

    const Tracks = createStackNavigator(
      {
        'Tracks': {
          screen: AudioList
        }
    
 
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor:'white'      
        },
        headerTitleStyle: { alignSelf: 'center' },
        headerTintColor: 'black'
      }
    }


);


const TabNavigator = createBottomTabNavigator({

  Home: { screen:NavigatorHome, navigationOptions:{
    tabBarIcon:(tabInfo) =>{
      return   <Icon name="home" color={tabInfo.tintColor} size={35}/>
    }
  }},
  Playlist: { screen:NavigatorFav, navigationOptions:{
    tabBarIcon:(tabInfo) =>{
      return   <Icon name="playlist-music" color={tabInfo.tintColor}  size={33} />
    }
  }},
  AllTracks: { screen: Tracks, navigationOptions:{
    tabBarIcon:(tabInfo) =>{
      return   <Icon name="headphones" color={tabInfo.tintColor}  size={35} />
    }
  }},

  Search: { screen: NavigatorSearch, navigationOptions:{
    tabBarIcon:(tabInfo) =>{
      return   <Icon name="magnify" color={tabInfo.tintColor}  size={35} />
    }
  }}
},
{
tabBarOptions:{
  activeTintColor:"#1D8778",
  style: {
    height:55,
    backgroundColor:'black',
    borderTopWidth: 0,
    paddingTop:30,
    marginBottom:0,
    elevation: 0,
    position: 'absolute'},
    labelStyle: {
      fontSize: 15,
      marginTop:12
    }
  }
  

});


export default createAppContainer(TabNavigator);
