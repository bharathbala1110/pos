import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Button } from 'react-native-paper';

const Baling = ({navigation}) => {
  const [baleQuantity, setBaleQuantity] = useState('');
  const handleQuantityChange = val => {
    setBaleQuantity(val);
  };
  const handleNext=()=>{
    navigation.navigate('OperatorSignature')
  }
  return (
    <>
    <View className="flex-1 mt-3 mx-3">
      <Text className="text-lg font-semibold pb-3">Bale Quantity(kg)</Text>
      <TextInput
        className="border mt-2 h-10 pl-2"
        keyboardType="numeric"
        value={baleQuantity}
        onChangeText={value => handleQuantityChange(value)}
      />
    </View>
    <TouchableOpacity>
    <Button
      className="bg-green-500 text-lg hover:bg-green-700
 font-bold py-2 px-3 rounded w-full "
      textColor="white"
      onPress={handleNext}
   >
      Next {'>'}
    </Button>
  </TouchableOpacity>
  </>
  );
};

export default Baling;
