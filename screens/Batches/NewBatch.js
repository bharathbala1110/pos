import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';

import {
  getMaterialList,
  postBatchData,
  
} from '../../features/Batches/batchSlice';

const NewBatch=({navigation})=> {
  
  const dispatch = useDispatch();

  
  const {materialList} = useSelector(state => state.batchList);

  useEffect(() => {
    dispatch(getMaterialList());
    console.log("materialList",materialList[0])
    // console.log("use effect",materialList[0].purchaseAndMaterial)
  }, [dispatch]);


  const [materialDetails, setMaterialDetails] = useState([
    {purchaseAndMaterial: materialList.length>0?materialList[0]:''},
  ]);
  const addMaterialBox = () => {
    setMaterialDetails(preDetail => [...preDetail, {purchaseAndMaterial: ''}]);
  };
  const handleDelete = index => {
    const updatedDetails = [...materialDetails];
    updatedDetails.splice(index, 1);
    setMaterialDetails(updatedDetails);
  };
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].purchaseAndMaterial = value;
      console.log('material', materialDetails);
      // updatedDetails[index].po_id = po_id;
      return updatedDetails;
    });
  };
  const handleSubmit = () => {
    dispatch(postBatchData(materialDetails));
    // dispatch(resetMaterialList())
    navigation.navigate('Batch');
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
            <Text className="text-lg font-semibold">Material ID</Text>
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
            selectedValue={item.purchaseAndMaterial}
            onValueChange={value => handleMaterialChange(value, index)}>
            {materialList &&
              materialList.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={`${data.display_id}-${data.supplier_name} (${data.date})`}
                  value={data}
                />
              ))}
          </Picker>
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
          onPress={handleSubmit}>
          Submit
        </Button>
      </TouchableOpacity>
    </>
  );
}
export default NewBatch;