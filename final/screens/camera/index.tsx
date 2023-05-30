import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
  Alert,
  LayoutChangeEvent,
  PixelRatio,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
//import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {runOnJS} from 'react-native-reanimated';
//import {labelImage} from 'vision-camera-image-labeler';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState();
  const [ocr, setOcr] = React.useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  const devices = useCameraDevices();
  const cameraDevice = devices.back;

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const labels = scanOCR(frame);
    console.log('Labels:', labels);
    runOnJS(setOcr)(labels);
  }, []);

  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map(block => {
          return (
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(block.text);
                Alert.alert(`"${block.text}" copied to the clipboard`);
              }}>
              <Text
                style={{
                  fontSize: 25,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                {block.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const renderDetectorContent = () => {
    if (cameraDevice && cameraPermission === 'authorized') {
      return (
        <View>
          <Camera
            style={styles.camera}
            device={cameraDevice}
            isActive
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            onLayout={(event: LayoutChangeEvent) => {
              setPixelRatio(
                event.nativeEvent.layout.width /
                  PixelRatio.getPixelSizeForLayoutSize(
                    event.nativeEvent.layout.width,
                  ),
              );
            }}
          />
          {renderOverlay()}
        </View>
        // <Camera style={styles.camera} device={cameraDevice} isActive={true} />
      );
    }
    return <ActivityIndicator size="large" color="#1C6758" />;
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Text Recognition</Text>

      {renderDetectorContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffe4e1',
    padding: 24,
  },
  saveArea: {
    backgroundColor: '#3D8361',
  },
  header: {
    height: 50,
    backgroundColor: '#3D8361',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    marginVertical: 16,
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#694fad',
  },
  camera: {
    marginTop: 10,
    height: 300,
    width: '100%',
    alignSelf: 'center',
  },
  barcodeText: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    textAlign: 'center',
    color: '#100F0F',
    fontSize: 24,
  },
  btnGroup: {
    margin: 16,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#63995f',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
});
