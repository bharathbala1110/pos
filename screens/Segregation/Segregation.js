import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {getMaterialList} from '../../features/Batches/batchSlice';
import { getSegregationBatchList } from '../../features/Segregation/segregation';
import { Button, FAB, Icon } from 'react-native-paper';

export default function Segregation({navigation}) {
  const dispatch = useDispatch();
  const [materialDetails, setMaterialDetails] = useState();
  const [batch, setBatch] = useState();

  const {segregationBatchList} = useSelector(state => state.segregation);
  
  useEffect(() => {
    dispatch(getSegregationBatchList());
    console.log('materialList', segregationBatchList);
    // console.log("use effect",materialList[0].purchaseAndMaterial)
  }, [dispatch]);

  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setBatch(value);
  };
  return (
    <>
    <View className="mx-2 my-4 flex-1  rounded p-4 flex flex-col">
      <View className="border-b">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Batch Id</Text>
        </View>
        <Picker
          selectedValue={batch}
          onValueChange={value => handleMaterialChange(value)}>
          {segregationBatchList &&
            segregationBatchList.map((data, i) => (
              <Picker.Item
                key={i}
                name={i}
                label={`${data.display_id} (${data.totalQuantity}kg)`}
                value={data.batch_id}
              />
            ))}
        </Picker>
      </View>
     
    </View>
       <TouchableOpacity>
       <Button
         className="bg-green-500 text-lg hover:bg-green-700
font-bold py-2 px-3 rounded w-full "
         textColor="white"  onPress={() =>
          navigation.navigate('SegregationDetail', {id: batch})
        }>
     
         Next {'>'}
       </Button>
     </TouchableOpacity>
     </>
  );
}
const styles = StyleSheet.create({

 
 
 
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 28,
  },

});