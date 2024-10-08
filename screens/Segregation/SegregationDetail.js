import {useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addMaterial} from '../../features/purchase/newPurchaseOrderSlice';
import {getMaterial} from '../../features/purchase/materialListSlice';
import {useEffect, useState} from 'react';
import {
  getSegregationBatchById,
 
} from '../../features/Segregation/segregation';
import CheckBox from '@react-native-community/checkbox';
export default function SegregationDetail() {
  const {params} = useRoute();
  const id = params.id;
  console.log(params);
  // const [checked, setChecked] = useState(false);
  // const {purchaseList}= useSelector(state=>state.purchaseListReducer)
  // useEffect(()=>{
  //  console.log(purchaseList)
  // },[])
  const dispatch = useDispatch();
  const {orderData} = useSelector(state => state.newOrder);
  const [isSelected, setSelection] = useState(false);
  const {po_material,segregation_material,segregators} = useSelector(
    state => state.segregation.segregationBatchById,
  );
  const [isChecked, setIsChecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [materialDetails, setMaterialDetails] = useState([
    {
      material: '',
      segregators: '',
      segregationMaterial: '',
      quantity: '',   
    },
  ]);
  useEffect(() => {
    if(id){
      dispatch(getSegregationBatchById(id));
    }
    
    console.log('po_material', po_material);
  }, [id,dispatch]);
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].material = value;
      console.log('setMaterialDetails', materialDetails);
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
  const handleSegregationMaterialChange = (value, index) => {
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].segregationMaterial = value;
      return updatedDetails;
    });
  };
  const handleSegregatorsChange = (value, index) => {
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].segregators = value;
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
        className="mx-6 my-4 border border-gray-500 rounded p-3 flex flex-col">
        <View className="border-b">
          <View className="flex">
            <Text className="bg-slate-600 text-white rounded-full w-6 text-center">
              {index + 1}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Material Id</Text>
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
            {po_material &&
              po_material.map((data, i) => (
                <Picker.Item
                  key={index}
                  name={i}
                  label={data.display_id}
                  value={data}
                />
              ))}
          </Picker>
        </View>
        <View className="border-b mt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Segregators</Text>
          </View>
          <Picker
            selectedValue={item.segregators}
            onValueChange={value => handleSegregatorsChange(value, index)}>
            {segregators &&
              segregators.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={data.name}
                  value={data.segregator_id}
                />
              ))}
          </Picker>
        </View>

        <View className="border-b mt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Segregation Material</Text>
          </View>
          <Picker
            selectedValue={item.segregationMaterial}
            onValueChange={value =>
              handleSegregationMaterialChange(value, index)
            }>
            {segregation_material &&
              segregation_material.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={data.material}
                  value={data.segregation_material_id}
                />
              ))}
          </Picker>
        </View>

        <View className=" mt-4 mb-2">
          <Text className="text-lg font-semibold">Quantity(kg)</Text>
          <TextInput
            className="border mt-4 h-10 pl-2"
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={value => handleQuantityChange(value, index)}
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
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        <View >
       
      </View>
      <View className='flex-row items-center mt-16'>
        <CheckBox
          value={isChecked}
          onValueChange={handleCheckboxChange}
          tintColors={{ true: '#007BFF', false: '#8B8B8B' }}
        />
        <Text className=' text-gray-700'>Segregation Completed</Text>
      </View>
      </ScrollView>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-2 px-3 rounded w-full "
          textColor="white"
          onPress={handleNextPage}>
          Submit
        </Button>
      </TouchableOpacity>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     margin: 8,
//   },
// });