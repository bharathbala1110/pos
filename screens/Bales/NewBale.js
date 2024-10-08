import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSegregationBatchList } from '../../features/Segregation/segregation';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { getbaleMaterial } from '../../features/Bale/baleSlice';

export default function NewBale({navigation}) {
  const dispatch = useDispatch();
  const [materialDetails, setMaterialDetails] = useState();
  // const [batch, setBatch] = useState();
  const [isSelected, setSelection] = useState(false);
  const {baleMaterial} = useSelector(state => state.bale);
  const [isChecked, setIsChecked] = useState(false);
  const [batch, setBatch] = useState();
  const operators=['Karthi','Sabari']

  useEffect(() => {
    dispatch(getbaleMaterial());
    console.log('baleMaterial', baleMaterial);
    // console.log("use effect",materialList[0].purchaseAndMaterial)
  }, [dispatch]);

  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setBatch(value);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
    <View className="mx-2 my-4 flex-1  rounded p-4 flex flex-col">
      <View className="border-b">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Operator</Text>
        </View>
        <Picker
          selectedValue={batch}
          onValueChange={value => handleMaterialChange(value)}>
          {operators &&
            operators.map((data, i) => (
              <Picker.Item
                key={i}
                name={i}
                label={`${data}`}
                value={data}
              />
            ))}
        </Picker>
      </View>
      <View className="border-b mt-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Bale Material</Text>
        </View>
        <Picker
          selectedValue={batch}
          onValueChange={value => handleMaterialChange(value)}>
          {baleMaterial &&
            baleMaterial.map((data, i) => (
              <Picker.Item
                key={i}
                name={i}
                label={`${data.name})`}
                value={data.id}
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
          navigation.navigate('NewBale')
        }>
     
         Next {'>'}
       </Button>
     </TouchableOpacity>
     </>
  )
}