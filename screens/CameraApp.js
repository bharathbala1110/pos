import {View, Text, StyleSheet, Button, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export default function CameraApp({navigation}) {
  const device = useCameraDevice('back');
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef();
  useEffect(() => {
    
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({});
        
        // setPhotoUri(photo.path);
        console.log(photo.path);
        navigation.goBack({ photoUri: photo.path})
      } catch (err) {
        console.error('Failed to take photo', err);
      }
    }
  };

  return (
    <View className="flex-1">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
        
      />
      {/* {photoUri && <Image source={{ uri:`file://${photoUri}`}} style={styles.capturedPhoto} />} */}
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  capturedPhoto: {
    width: '100%',
    height: 300, // adjust height as needed
    resizeMode: 'contain', // adjust resize mode as needed
    marginTop: 20,
  },
});