/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ToastAndroid,
  CameraRoll,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Pic from './Pic';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {BlurView} from '@react-native-community/blur';

class RCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.front,
      uri1: '',
      uri2: '',
      box: '',
    };
  }
  va = true;
  face = false;
  takePicture = async function () {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      if (this.va) {
        this.va = false;
        let state = this.state;
        state.uri1 = data.uri;
        this.setState(state);
      } else {
        this.va = true;
        let state = this.state;
        state.uri2 = data.uri;
        this.setState(state);
      }
    }
  };

  switchCamera() {
    if (this.camera) {
      var state = this.state;
      if (state.cameraType === RNCamera.Constants.Type.back) {
        state.cameraType = RNCamera.Constants.Type.front;
      } else {
        state.cameraType = RNCamera.Constants.Type.back;
      }
      this.setState(state);
    }
  }

  c = setInterval(() => {
    if (this.face === false) {
      ToastAndroid.showWithGravity(
        'Captured images should contains a face!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }, 3000); //clearInterval(test2)

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
      console.log(faces[0].bounds);
    } else {
      this.face = false;
      this.setState({
        box: null,
      });
    }
  };

  _pressButton() {
    let _this = this;
    const {navigator} = this.props;
    this.props.navigation.push('Edit', {
      uri1: this.state.uri1,
      uri2: this.state.uri2,
      box: this.state.box,
    });
    this.props.navigation.navigate('Edit');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType} //RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          onFacesDetected={this.onFaceDetected}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        {this.face && (
          <View
            style={{
              position: 'absolute',
              borderWidth: 4,
              borderColor: '#89ff00',
              //borderStyle: 'solid',
              width: this.state.box.width,
              height: this.state.box.height,
              left: this.state.box.x,
              top: this.state.box.y,
              zIndex: 9,
            }}
          />
        )}
        <SafeAreaView
          style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> TAKE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._pressButton.bind(this)}
            navigation={navigate}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> EDIT </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.switchCamera.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> CHANGE </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={{height: 150, width: 150, flexDirection: 'row'}}>
          {this.state.uri1 && (
            <Image
              style={{height: 100, width: 100}}
              source={{uri: this.state.uri1}}
            />
          )}
          {this.state.uri2 && (
            <Image
              style={{height: 100, width: 100}}
              source={{uri: this.state.uri2}}
            />
          )}
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {screen: RCamera},
  Edit: {screen: Pic},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 15,
    alignSelf: 'center',
    margin: 20,
  },
});

export default createAppContainer(AppNavigator);
