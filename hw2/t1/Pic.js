/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  View,
  Navigator, 
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Switch,
} from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
//import RCamera from './App';
//import FaceDetection, { FaceDetectorContourMode, FaceDetectorLandmarkMode, FaceContourType, FaceLandmarkType } from "react-native-face-detection";
import FaceDetection from '@react-native-ml-kit/face-detection';
import { BlurView } from '@react-native-community/blur';

export default class Pic extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      uri1: this.props.navigation.state.params.uri1,
      uri2: this.props.navigation.state.params.uri2,
      box: '',
      orientation: 'portrait',
      f: [],
      hideFrame: [],
      showContours: [],
      showLandmarks: [],
    };
  }
 
  _pressButton() {
    this.props.navigation.navigate('Home');
  }

_savaImg = () => {
  if (this.state.uri1 === null) {
  } else {
    let promise = CameraRoll.save(this.state.uri1.toString());//CameraRoll.saveToCameraRoll(this.state.uri1.toString());
    promise
      .then(function (_result) {
        ToastAndroid.show(
          'Save Successful：\n' + _result,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(function (_error) {
        ToastAndroid.show(
          'Save Successful!!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    let promise2 = CameraRoll.save(this.state.uri2.toString());//CameraRoll.saveToCameraRoll(this.state.uri1.toString());
    promise2
      .then(function (_result) {
        ToastAndroid.show(
          'Save Successful!!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(function (_error) {
        ToastAndroid.show(
          'Save Failed：\n' + _error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }
};

face = false;
onFaceDetected = ({faces}) => {
  if (faces[0]) {
    this.face = true;
    this.setState({
      box: {
        width: faces[0].bounds.size.width,
        height: faces[0].bounds.size.height,
        x: faces[0].bounds.origin.x,
        y: faces[0].bounds.origin.y,
        yawAngle: faces[0].yawAngle,
        rollAngle: faces[0].rollAngle,
      },
    });
  } else {
    this.face = false;
    this.setState({
      box: null,
    });
  }
};

  async processFaces() {
  const faces = await FaceDetection.detect(this.state.uri1, { landmarkMode: 'all',contourMode: 'all'});
  console.log('faces:', faces[0].landmarks.leftCheek, faces[0].landmarks.rightCheek);
  this.setState({
    box: {
      x: faces[0].landmarks.leftCheek.position.x/180,
      y: faces[0].landmarks.leftCheek.position.y/300,
      width: faces[0].landmarks.rightCheek.position.x-faces[0].landmarks.leftCheek.position.x,
      height: faces[0].landmarks.rightCheek.position.y-faces[0].landmarks.leftCheek.position.y,
    }});
    this.setState({
      f: faces,
    });
}

  render() {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
    if (this.state.orientation === 'portrait') {
      return (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{height: 300, width: 180}}
              source={{uri: this.state.uri1}}
            />
            <Image
              style={{height: 300, width: 180}}
              source={{uri: this.state.uri2}}
            />
          </SafeAreaView>
          <SafeAreaView style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
              onPress={this._savaImg.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SAVE </Text>
            </TouchableOpacity>
          <TouchableOpacity
              onPress={this.processFaces.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SWAP </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      );
    }
    else {
      return (
        <SafeAreaView style={styles.container2}>
          <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{height: 250, width: 180}}
              source={{uri: this.state.uri1}}
            />
            <Image
              style={{height: 250, width: 180}}
              source={{uri: this.state.uri2}}
            />
          <TouchableOpacity
              onPress={this._savaImg.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SAVE </Text>
            </TouchableOpacity>
          <TouchableOpacity
              onPress={this._pressButton.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SWAP </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEB887',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#DEB887',
    paddingHorizontal: 40,
  },
  button: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: 'green',
  },
});
