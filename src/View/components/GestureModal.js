import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
// } from 'react-native-vision-camera';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
// import { Camera } from 'expo-camera';

const TensorCamera = cameraWithTensors(Camera);

const GestureModal = () => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('front', {
    physicalDevices: ['ultra-wide-angle-camera'],
  });
  const {hasPermission} = useCameraPermission();
  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);


  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet'
  //   // const objects = detectObjects(frame)
  //   // const label = objects[0].name
  //   console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
  //   // console.log(`You're looking at a ${frame}.`)
  // }, [])

  return (
    <View style={{height: '100%'}}>
      {/* <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        zoom={0}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={tensorDims.height}
        resizeWidth={tensorDims.width}
        resizeDepth={3}
        onReady={handleCameraStreamV2}
        autorender={true}
      /> */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        // frameProcessor={frameProcessor}
        device={device}
        isActive={true}
      />
    </View>
  );
};

export default GestureModal;

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    left: 90,
    top: 100,
    width: 500 / 2,
    height: 800 / 2,
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 0,
  },
});
