import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addMaterial} from '../../features/purchase/newPurchaseOrderSlice';
import {getMaterial} from '../../features/purchase/materialListSlice';

const Material = ({navigation}) => {
  // const {purchaseList}= useSelector(state=>state.purchaseListReducer)
  // useEffect(()=>{
  //  console.log(purchaseList)
  // },[])
  const dispatch = useDispatch();
  const {orderData} = useSelector(state => state.newOrder);

  const {materialList} = useSelector(state => state.materialList);

  const [materialDetails, setMaterialDetails] = useState(
    !orderData.materials
      ? [{material: '', quantity: '', sacks: ''}]
      : orderData.materials,
  );
  useEffect(() => {
    dispatch(getMaterial());

    //  dispatch(addMaterial(materialDetails))
    console.log('orderData', orderData);
    console.log('materialList', materialList);
    console.log('materialDetails', materialDetails);
  }, []);
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].material = value;
      return updatedDetails;
    });
    // dispatch(addMaterial(materialDetails))
  };

  const handleQuantityChange = (value, index) => {
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].quantity = value;
      return updatedDetails;
    });
  };
  const handleSacksChange = (value, index) => {
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].sacks = value;
      return updatedDetails;
    });
  };

  const addMaterialBox = () => {
    setMaterialDetails(preDetail => [
      ...preDetail,
      {material: '', quantity: '', sacks: ''},
    ]);
  };
  const handleNextPage = () => {
    dispatch(addMaterial(materialDetails));
    navigation.navigate('PurchaseConfirm');
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
            <Text className="text-lg font-semibold">Material Name</Text>
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
            selectedValue={item.material}
            onValueChange={value => handleMaterialChange(value, index)}>
            {materialList &&
              materialList.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={data.material_name}
                  value={data.purchase_material_id}
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

        <View className=" mt-3">
          <Text className="text-lg font-semibold">No. of Sacks</Text>
          <TextInput
            className="border mt-2 h-10 pl-2"
            keyboardType="numeric"
            value={item.sacks}
            onChangeText={value => handleSacksChange(value, index)}
          />
        </View>
      </View>
    ));
  };
  const handleDelete = index => {
    const updatedDetails = [...materialDetails];
    updatedDetails.splice(index, 1);
    setMaterialDetails(updatedDetails);
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
              onPress={addMaterialBox}
              className="bg-green-500 text-lg hover:bg-green-700
     font-bold  px-3 rounded"
              textColor="white">
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
          onPress={handleNextPage}>
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};
export default Material;
