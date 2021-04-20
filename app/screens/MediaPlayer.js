import React ,{ Component }from 'react';

import { useSelector } from 'react-redux';

import {
  Dimensions,
  ImageBackground,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";

import { MaterialIcons } from "@expo/vector-icons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";


class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, isVideo, image) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
    this.image = image;
  }
}




const PLAYLIST = [
  new PlaylistItem(
    "You Are the Reason",
    "https://firebasestorage.googleapis.com/v0/b/emoscape-a5299.appspot.com/o/happy%2FCalum%20Scott%20-%20You%20Are%20The%20Reason%20(Official).mp3?alt=media&token=c4a9d68c-219b-4e8f-be15-c87369eb9bfc",
    false,
    "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
  ),
  new PlaylistItem(
    "Rockabye",
    "https://firebasestorage.googleapis.com/v0/b/emoscape-a5299.appspot.com/o/sad%2FClean%20Bandit%20-%20Rockabye%20feat.%20Sean%20Paul%20%26%20Anne-Marie.mp3?alt=media&token=5beaa703-a479-4afb-ac5e-ab964cea78fb",
    false,
    "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
  ),
  new PlaylistItem(
    "Can't help falling in love”",
    "https://firebasestorage.googleapis.com/v0/b/emoscape-a5299.appspot.com/o/angry%2FCan't%20Help%20Falling%20In%20Love%20-%20Elvis%20Presley%20cover%20by%20Alexandra%20Porat.mp3?alt=media&token=99b677db-0508-4ffa-bd88-c6c7749ea6b6",
    false,
    "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
  ),
  new PlaylistItem(
    "Home",
    "https://firebasestorage.googleapis.com/v0/b/emoscape-a5299.appspot.com/o/neutral%2FWestlife%20-%20Home.mp3?alt=media&token=13d25ad3-3ab7-4644-bad6-6de5a9cbdc38",
    false,
    "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
  ),
  new PlaylistItem(
    "I'll see you again",
    "https://firebasestorage.googleapis.com/v0/b/emoscape-a5299.appspot.com/o/surprise%2FWestlife%20-%20I'll%20See%20You%20Again.mp3?alt=media&token=7f53813f-aca6-4af8-8371-4a86bd355343",
    false,
    "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
  )
];


const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
  require("../../assets/images/play_button.png"),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require("../../assets/images/pause_button.png"),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require("../../assets/images/stop_button.png"),
  22,
  22
);
const ICON_FORWARD_BUTTON = new Icon(
  require("../../assets/images/forward_button.png"),
  30,
  25
);
const ICON_BACK_BUTTON = new Icon(
  require("../../assets/images/back_button.png"),
  30,
  25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
  require("../../assets/images/loop_all_button.png"),
  65,
  24
);
const ICON_LOOP_ONE_BUTTON = new Icon(
  require("../../assets/images/loop_one_button.png"),
  65,
  24
);

const ICON_MUTED_BUTTON = new Icon(
  require("../../assets/images/muted_button.png"),
  50,
  41
);
const ICON_UNMUTED_BUTTON = new Icon(
  require("../../assets/images/unmuted_button.png"),
  50,
  41
);



const ICON_TRACK_1 = new Icon(require("../../assets/images/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("../../assets/images/thumb_1.png"), 18, 19);
const ICON_THUMB_2 = new Icon(require("../../assets/images/thumb_2.png"), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "rgba(52, 52, 52, 0)";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 17;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT - 5 * 2.0) / 5.0 - FONT_SIZE * 2;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      display: null,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false
    };



  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        "cutive-mono-regular": require("../../assets/fonts/CutiveMono-Regular.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    

    const source = { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (PLAYLIST[this.index].isVideo) {
      console.log(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
        display: null
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        showVideo: PLAYLIST[this.index].isVideo,
        isLoading: false,
        display: PLAYLIST[this.index].image,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(
        this.state.loopingType !== LOOPING_TYPE_ONE
      );
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece
        })
    );
  };

  render() {

    const { navigation } = this.props;  
    const trackTitle = navigation.getParam('title');
    const trackArtist = navigation.getParam('artist');
    const trackurl = navigation.getParam('url');
    const trackImage = navigation.getParam('image');

    return !this.state.fontLoaded ? (
      <View style={styles.emptyContainer} />
    ) : (

      <ImageBackground source={require('../../assets/photo-1558591710-4b4a1ae0f04d.jpg')} style={styles.image}>

      <View style={styles.container}>

        <View>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            {trackTitle}</Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            {trackArtist}</Text>
            
         

        </View>
    
         {/* <View style={styles.videoContainer}>  */}
          <View>  
          <Video
            ref={this._mountVideo}
            // style={[
            //   styles.video,
            //   {
            //     opacity: this.state.showVideo ? 1.0 : 0.0,
            //     width: this.state.videoWidth,
            //     height: this.state.videoHeight
            //   }
            // ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
      <Image  source={{ uri: trackImage }} style={styles.img} />
        </View>


        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
            }
          ]}
        >
          <Slider
            style={styles.playbackSlider}

            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text
              style={[
                styles.text,
                styles.buffering,
                { fontFamily: "cutive-mono-regular" }
              ]}
            >
              {this.state.isBuffering ? BUFFERING_STRING : ""}
            </Text>
            <Text
              style={[
                styles.text,
                styles.timestamp,
                { fontFamily: "cutive-mono-regular" }
              ]}
            >
              {this._getTimestamp()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
            }
          ]}
        >
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}
          >
            <Image style={styles.button1} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
            <Image
              style={styles.button}
              source={
                this.state.isPlaying
                  ? ICON_PAUSE_BUTTON.module
                  : ICON_PLAY_BUTTON.module
              }
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}
          >
            <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}
          >
            <Image style={styles.button2} source={ICON_FORWARD_BUTTON.module} />
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerMiddleRow
          ]}
        >
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onMutePressed}
            >
              <Image
                style={styles.button}
                source={
                  this.state.muted
                    ? ICON_MUTED_BUTTON.module
                    : ICON_UNMUTED_BUTTON.module
                }
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_2.module}
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onLoopPressed}
          >
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[this.state.loopingType].module}
            />
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerBottomRow
          ]}
        >
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}
          >
            <View style={styles.button}>
            <Icon1 name="metronome" color="black" size={36} />
            </View>
          </TouchableHighlight>
          <Slider
            style={styles.rateSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this.state.rate / RATE_SCALE}
            onSlidingComplete={this._onRateSliderSlidingComplete}
          />
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPitchCorrectionPressed}
          >
            <View style={styles.button}>
              <Text
                style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
              >
                PC: {this.state.shouldCorrectPitch ? "yes" : "no"}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._onSpeakerPressed}
            underlayColor={BACKGROUND_COLOR}
          >
            <MaterialIcons
              name={
                this.state.throughEarpiece
                  ? ICON_THROUGH_EARPIECE
                  : ICON_THROUGH_SPEAKER
              }
              size={32}
              color="black"
            />
          </TouchableHighlight>
        </View>
      </View>

      </ImageBackground>
    );
    
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: 'rgba(52, 52, 52, 0)',
    marginTop:0
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop:0,
    paddingTop:0,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: 'rgba(52, 52, 52, 0)',
    maxHeight: 490
  },
  wrapper: {},
  space: {
    height: FONT_SIZE
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: ICON_THUMB_1.height * 0.1,
    maxHeight: ICON_THUMB_1.height * 0.1
  },
  img:{
    width:DEVICE_WIDTH/2,
    height:DEVICE_WIDTH/2,
    alignItems: "center",
    alignSelf: "stretch",
    marginTop:0
  },
  playbackSlider: {
    alignSelf: "stretch"
  },
  timestampRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE,
    paddingVertical:12
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
    alignItems: "center",
    textAlign: 'center'
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20,
    marginBottom:12
  },
  button: {
    paddingHorizontal: 5
  },  
  button1: {
    marginLeft:20
  },
  button2: {
    marginRight:20
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height +30,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: "stretch",
    paddingHorizontal: 24
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height - 2,
    alignSelf: "stretch",
    paddingRight: 15,
    paddingLeft: 15
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE - 1,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH
  }
});
