import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import { getbaleDropdown, getBaleList } from '../../features/Bale/baleSlice';
import { getBatchList } from '../../features/Batches/batchSlice';
import {Button} from 'react-native-paper';

export default function NewBale2({navigation}) {
    const [materialDetails, setMaterialDetails] = useState([
      {batchId: '', quantity: ''},
    ]);
    const dispatch = useDispatch();
    const {baleDropdownList} = useSelector(state => state.bale);
    useEffect(()=>{
     dispatch(getbaleDropdown())
     console.log("baleDropdownList",baleDropdownList)
    },[])
    const handleNext = () => {
     
     console.log("submitted")
     navigation.navigate("Baling")
    };
    const handleMaterialChange = (value, index) => {
        console.log('value', value);
        // const {po_id,material_id}=value
        setMaterialDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[index].batchId = value;
          console.log('material', materialDetails);
          // updatedDetails[index].po_id = po_id;
          return updatedDetails;
        });
      };
      const handleQuantityChange = (value, index) => {
        setMaterialDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[index].quantity = value;
          return updatedDetails;
        });
      };
      const addMaterialBox = () => {
        setMaterialDetails(
          preDetails=>[...preDetails,{batchId: '', quantity: ''}]
        );
      };
    const renderMaterialBoxes = () => {
        return materialDetails.map((item, index) => (
          <View
            key={index}
            className="mx-2 my-4 border border-gray-500 rounded p-3 flex flex-col">
            <View className="border-b">
              <View className="flex">
                <Text className="bg-slate-600 text-white rounded-full w-6 text-center">
                  {index + 1}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold">Batch ID</Text>
                {index != 0 && (
                  <Button
                    icon="delete"
                    mode="contained"
                    onPress={() => handleDelete(index)}>
                    Delete
                  </Button>
                )}
              </View>
              <Picker
                selectedValue={item.batchId}
                onValueChange={value => handleMaterialChange(value, index)}>
                {baleDropdownList &&
                  baleDropdownList.map((data, i) => (
                    <Picker.Item
                      key={i}
                      name={i}
                      label={data.batch_id}
                      value={data.batch_id}
                    />
                  ))}
              </Picker>
            </View>
    
            <View className=" mt-3">
              <Text className="text-lg font-semibold">Quantity(kg)</Text>
              <TextInput
                className="border mt-2 h-10 pl-2"
                value={item.quantity}
                keyboardType="numeric"
                onChangeText={value => handleQuantityChange(value, index)}
              />
            </View>
          </View>
        ));
      };
  return (
    <>
      <ScrollView>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Material Details
        </Text>
        {renderMaterialBoxes()}

        <View>
          <TouchableOpacity className="items-center">
            <Button
              mode="contained"
              className="bg-green-500 text-lg hover:bg-green-700
     font-bold  px-3 rounded"
              textColor="white"
              onPress={addMaterialBox}>
              Add
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-2 px-3 rounded w-full "
          textColor="white"
          onPress={handleNext}>
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  )
}