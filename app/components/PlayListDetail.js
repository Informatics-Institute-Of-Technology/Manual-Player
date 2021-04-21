//import libraries
import React from 'react';
import { View, Text,StyleSheet, Modal,FlatList, Dimensions } from 'react-native';
import color from '../misc/color';
import AudioListItem from './AudioListItem';


// create a component
const playListDetail = ({visible,playList,onclose}) => {
    return (
        <Modal visible={visible} animationType ='slide' transparent
        onRequestClose={onclose}>
            <View style={styles.container}>
                <Text style={styles.title}>{playList.title}</Text>
                <FlatList 
                contentContainerStyle={styles.listContainer}
                data={playList.audios} keyExtractor={Item => Item.id.toString()}
                renderItem={({item}) => (
                    <View style={{marginBottom:10}}>
                <AudioListItem title={item.filename} 
                duration={item.duration}/>
                </View>
                )}/>
            </View>
            <View style={[StyleSheet.absoluteFillObject, styles.ModalBG]}/>
        </Modal>
    );
};

const{width,height}=Dimensions.get('window')
// define your styles
const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        height:height-150,
        width:width-15,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,

    },
    modalBG:{
        backgroundColor:color.MODAL_BG,
        zIndex:-1,
    },
    listContainer:{
        padding:20,
    },
    title:{
        textAlign:'center',
        fontSize:20,
        paddingVertical:5,
        fontWeight: 'bold',
        color:'black',
    },
});

//make this component available to the app
export default playListDetail;

