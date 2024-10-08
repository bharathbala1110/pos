import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Signature from 'react-native-signature-canvas';
import { Button } from 'react-native-paper';
const SupervisorSign = () => {
    const handleOK = base64DataUrl => {
        // Handle the captured signature (base64 encoded image)
        // setSignature(base64DataUrl);
      };
      const handleNext=()=>{
        // navigation.navigate('SupervisorSignature')
      }
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Signature
          onOK={handleOK}
          descriptionText={` Signature`}
          clearText="Clear"
          confirmText="Save"
          style={{height: '80%'}}
        />
      </View>
      <TouchableOpacity>
    <Button
      className="bg-green-500 text-lg hover:bg-green-700
 font-bold py-2 px-3 rounded w-full "
      textColor="white"
      onPress={handleNext}
   >
      Submit {'>'}
    </Button>
  </TouchableOpacity>
    </>
  )
}

export default SupervisorSign