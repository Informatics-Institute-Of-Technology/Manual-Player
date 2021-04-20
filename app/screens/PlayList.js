import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import PlayListDetail from '../components/PlayListDetail';
import PlayListInputModal from '../components/PlayListInputModal';
import { AudioContext } from '../context/AudioProvider';
import color from '../misc/color';

let selectedPlayList={}
const PlayList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayList,setShowPlayList] = useState(false);
  const context = useContext(AudioContext);
  const { playList, addToPlayList, updateState } = context;

  const createPlayList = async playListName => {
    const result = await AsyncStorage.getItem('playlist');
    if (result !== null) {
      const audios = [];
      if (addToPlayList) {
        audios.push(addToPlayList);
      }
      const newList = {
        id: Date.now(),
        title: playListName,
        audios: audios,
      };

      const updatedList = [...playList, newList];
      updateState(context, { addToPlayList: null, playList: updatedList });
      await AsyncStorage.setItem('playlist', JSON.stringify(updatedList));
    }
    setModalVisible(false);
  };

  const renderPlayList = async () => {
    const result = await AsyncStorage.getItem('playlist');
    if (result === null) {
      const defaultPlayList = {
        id: Date.now(),
        title: 'My Favorite',
        audios: [],
      };

      const newPlayList = [...playList, defaultPlayList];
      updateState(context, { playList: [...newPlayList] });
      return await AsyncStorage.setItem(
        'playlist',
        JSON.stringify([...newPlayList])
      );
    }

    updateState(context, { playList: JSON.parse(result) });
  };

  useEffect(() => {
    if (!playList.length) {
      renderPlayList();
    }
  }, []);

  const handleBannerPress= async(playList)=>{

if(addToPlayList){
  const result=await AsyncStorage.getItem('playlist');

  let oldList=[];
  let updatedList=[];
  let sameAudio=false;

  if(result!==null){
    oldList=JSON.parse(result)
    // console.log(oldList);
    updatedList= oldList.filter(list=>
      {
        if(list.id===playList.id){
      //check audio is already inside the playlist or not
            for(let audio of list.audios){
              if(audio.id===addToPlayList.id){
                //alert with some message
                  sameAudio=true;
                  return;
              }
            }
            //otherwise Update playlist 
            list.audios = [...list.audios, addToPlayList];

        }
        return list;
      })
  }
  if(sameAudio){
    //alert
    Alert.alert('found same audio!',`${addToPlayList.filename} is already inside the list.`);
    sameAudio=false;
    return updateState(context,{addToPlayList:null});
  }
  updateState(context,{addToPlayList:null, playList:[...updatedList]});
  return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]));

}

//if no audio is selected then open the list
  // console.log('opening list');
  selectedPlayList=playList
  setShowPlayList(true);
  }
  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      {playList.length
        ? playList.map(item => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.playListBanner}
              onPress={()=> handleBannerPress(item)}
            >
              <Text>{item.title}</Text>
              <Text style={styles.audioCount}>
                {item.audios.length > 1
                  ? `${item.audios.length} Songs`
                  : `${item.audios.length} Song`}
              </Text>
            </TouchableOpacity>
          ))
        : null}

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ marginTop: 15 }}
      >
        <Text style={styles.playListBtn}>+ Add New Playlist</Text>
      </TouchableOpacity>

      <PlayListInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={createPlayList}
      />
    </ScrollView>
    <PlayListDetail visible={showPlayList} playList={selectedPlayList} onclose={()=>setShowPlayList(false)}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  playListBanner: {
    padding: 5,
    backgroundColor: 'rgba(204,204,204,0.3)',
    borderRadius: 5,
    marginBottom: 15,
  },
  audioCount: {
    marginTop: 3,
    opacity: 0.5,
    fontSize: 14,
  },
  playListBtn: {
    color: color.ACTIVE_BG,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
  },
});

export default PlayList;
