import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button as But,
  SafeAreaView,
  Image,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {getSupplier} from '../../features/purchase/supplierListSlice';

import React, {useEffect, useRef, useState} from 'react';
import {Button, RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {
  PurchaseDetail,
  addPhotoUri,
  getPostFile,
  postPurchase,
  purchaseDetail,
} from '../../features/purchase/newPurchaseOrderSlice';
import axios from 'axios';

// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

// import { Camera } from 'react-native-camera';

const NewPurchase = ({navigation, route}) => {
  // const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // const { hasPermission, requestPermission } = useCameraPermission()
  const dispatch = useDispatch();
  const {purchaseDetail} = useSelector(state => state.newOrder.orderData);
  const {supplierList} = useSelector(state => state.supplierList);
  const initialSelectedSupplier = supplierList.find(supplier => supplier.supplier_id === purchaseDetail?.supplierId);
 console.log(initialSelectedSupplier?.supplier_name)
  const drivers = ['Antony', 'Batsha', 'Kumar'];
  const vehicles = ['HK8098', 'HK9988', 'HK0967'];
  const device = useCameraDevice('back');
  const [photoUri, setPhotoUri] = useState(null);
  const [selectedProcurementMode, setSelectedProcurementMode] = useState(purchaseDetail?.procurementMode);
  const [selectedStartMeter, setSelectedStartMeter] = useState(purchaseDetail?.startMeterReading);
  const [selectedEndMeter, setSelectedEndMeter] = useState(purchaseDetail?.endMeterReading);
  const [selectedSupplier, setSelectedSupplier] = useState(initialSelectedSupplier?.supplier_id);
  const [selectedSupplierId, setSelectedSupplierId] = useState();
  const [driver, setDriver] = useState(drivers[0]);
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [photoOption, setPhotoOption] = useState(true);
  const [startCamera, setStartCamera] = useState(false);
  const [photoBase64, setPhotoBase64] = useState(null);

  
  const cameraRef = useRef();
  useEffect(() => {
    checkPermission();
    dispatch(getSupplier());
    // console.log('purchaseDetail', purchaseDetail);
    // console.log('supplier list', supplierList);
    if (startCamera) {
      navigation.setParams({headerShown: false});
    }
  }, [startCamera]);

  // useEffect(() => {
  //   console.log('Selected Supplier ID:', selectedSupplierId);

  //   console.log('Selected Supplier Name:', selectedSupplier);
  // }, [selectedSupplierId, selectedSupplier]);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({});
        const result = await fetch(`file://${photo.path}`);
        const data = await result.blob();
        const filePath = photo.path;
        const file = await RNFS.readFile(filePath, 'base64');
//         console.log("file",file)
//         const formData = new FormData();
//         formData.append('photo', {
//           uri: `file://${photo.path}`,
//           name: 'photo.jpg',
//           type: 'image/jpeg',
//         });
// //  // Use blob directly
//         formData.append('name','bharath')
//         console.log('form', formData);
//         const response = await axios.post('http://192.168.1.8:2000/api/purchase/uploadImage', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log("res",response)
        // dispatch(getPostFile(formData));
        dispatch(addPhotoUri(photo.path))
        setPhotoUri(photo.path);
        // console.log(photo.path);

        // Convert photo to Base64
        // const base64String = await RNFS.readFile(photo.path, 'base64');
        // setPhotoBase64(base64String);
        // console.log(base64String);
        setStartCamera(false);
      } catch (err) {
        console.error('Failed to take photo', err);
      }
    }
  };
  const sendToServer=async(blob)=>{
   const formData=new FormData()
   formData.append('photo',blob,'photo.jpg')
   
   console.log("form",formData)
   dispatch(getPostFile(formData))
  //  try{
  //     const res=await axios.post('http://192.168.1.9:2000/api/purchase/upload',formData)
  //     console.log(res)
  //  }
  //  catch(e){
  //   console.log(e)
  //  }
  }
  const nextPage = () => {
    if (selectedProcurementMode == 1) {
      const data = {
        supplierId: selectedSupplier,
        // selectedSupplierId: selectedSupplierId,
        procurementMode: selectedProcurementMode,
        driver: driver,
        vehicle: vehicle,
        startMeterReading: selectedStartMeter,
        endMeterReading: selectedEndMeter,
        photoUri: photoUri,
      };

      dispatch(PurchaseDetail(data));
      navigation.navigate('MaterialPage');
    } else {
      const data = {
        supplierId: selectedSupplier,
        procurementMode: selectedProcurementMode,
        vehicle: vehicle,
      };

      dispatch(PurchaseDetail(data));
      navigation.navigate('MaterialPage');
    }
  };
  const handleDriverValueChange = (itemValue, itemIndex) =>
    setDriver(itemValue);
  const handleVehicleChange = (itemValue, itemIndex) => setVehicle(itemValue);
  const handlePhotoOptionChange = (itemValue, itemIndex) => {
    setPhotoOption(itemValue);
  };
  const handleStartMeterChange = e => {
    setSelectedStartMeter(e);
  };
  const handleEndtMeterChange = e => {
    setSelectedEndMeter(e);
  };
  const handleSupplier = supplier => {
    console.log("supplier",supplier)
    setSelectedSupplier(supplier);
  };

  return (
    <>
      {!startCamera && (
        <>
          <ScrollView className="mt-4">
            <View className="flex-row items-center justify-between mx-1 mb-2">
              <Text className=" text-lg font-semibold mb-2 ml-1">Supplier</Text>
              <TouchableOpacity>
                <Button
                  className="bg-green-500 hover:bg-green-700 
                             font-bold py-[5rem] px-3 rounded ml-4"
                  textColor="white">
                  New Supplier
                </Button>
              </TouchableOpacity>
            </View>

            <View className="border-b  rounded-md mx-1">
              <Picker
                selectedValue={selectedSupplier}
                onValueChange={value => handleSupplier(value)}>
                {supplierList &&
                  supplierList.map(supplier => (
                    <Picker.Item
                      key={supplier.supplier_id}
                      label={supplier.supplier_name}
                      value={supplier.supplier_id}
                    />
                  ))}
              </Picker>
            </View>
            <View className="mt-3 ml-2">
              <Text className="text-lg font-semibold">Procurement Mode</Text>
            </View>

            <View>
              {/* Add a label */}

              {/* Create a RadioButton.Group */}
              <RadioButton.Group
                onValueChange={value => setSelectedProcurementMode(value)}
                value={selectedProcurementMode}>
                {/* Create individual radio buttons with labels */}
                <View className="flex-row items-center justify-between mx-2">
                  <Text>Pickup</Text>
                  <RadioButton value="1" color="green" />
                </View>
                <View className="flex-row items-center justify-between mx-2">
                  <Text>Drop off</Text>
                  <RadioButton value="2" color="green" />
                </View>
              </RadioButton.Group>
            </View>

            {selectedProcurementMode == '1' && (
              <View>
                <Text className="ml-2 mt-2 text-lg font-semibold">
                  Pickup Details
                </Text>
                <View className="m-2 border border-gray-500 rounded p-3 flex flex-col">
                  <View className="border-b">
                    <Text className="text-lg font-semibold">Driver Name</Text>
                    <Picker
                      selectedValue={driver}
                      onValueChange={handleDriverValueChange}>
                      {drivers.map(pokemon => (
                        <Picker.Item
                          key={pokemon}
                          label={pokemon}
                          value={pokemon}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View className="border-b mt-3">
                    <Text className="text-lg font-semibold">
                      Vehicle Number
                    </Text>
                    <Picker
                      selectedValue={vehicle}
                      onValueChange={handleVehicleChange}>
                      {vehicles.map(pokemon => (
                        <Picker.Item
                          key={pokemon}
                          label={pokemon}
                          value={pokemon}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View className=" mt-3">
                    <Text className="text-lg font-semibold">
                      Start Meter Reading
                    </Text>
                    <TextInput
                      value={selectedStartMeter}
                      onChangeText={handleStartMeterChange}
                      name="startMeter"
                      className="border mt-2 h-10 pl-2"
                      keyboardType="numeric"
                    />
                  </View>

                  <View className=" mt-3">
                    <Text className="text-lg font-semibold">
                      End Meter Reading
                    </Text>
                    <TextInput
                      onChangeText={handleEndtMeterChange}
                      className="border mt-2 h-10 pl-2"
                      keyboardType="numeric"
                      value={selectedEndMeter}
                    />
                  </View>
                </View>
                <View className="flex-row items-center justify-between mx-2 my-2">
                  <Text className=" text-lg font-semibold mb-2 ml-1">
                    Supplier Signature
                  </Text>
                  <TouchableOpacity
                    disabled={photoOption}
                    onPress={() => setStartCamera(true)}>
                    <Button
                      className="bg-green-500 hover:bg-green-700 font-bold py-[5rem] px-3 rounded ml-4"
                      textColor="white"
                      disabled={photoOption}>
                      Click Photo
                    </Button>
                  </TouchableOpacity>
                </View>
                <RadioButton.Group
                  onValueChange={handlePhotoOptionChange}
                  value={photoOption}>
                  {/* Create individual radio buttons with labels */}
                  <View className="flex-row items-center justify-between mx-2">
                    <Text>Yes</Text>
                    <RadioButton value={false} color="green" />
                  </View>
                  <View className="flex-row items-center justify-between mx-2">
                    <Text>No</Text>
                    <RadioButton value={true} color="green" />
                  </View>
                </RadioButton.Group>

                {photoUri && (
                  <View className="flex-1 mx-1 my-1">
                    <Image
                      className="w-full h-64 border rounded"
                      source={{uri: `file://${photoUri}`}}
                      style={{flex: 1, resizeMode: 'cover'}}
                    />
                  </View>
                )}
              </View>
            )}
            {/*  */}
            {selectedProcurementMode == '2' && (
              <View>
                <TextInput
                  className="border m-2 h-10 pl-2"
                  value={vehicle}
                  onChangeText={value => setVehicle(value)}
                />
              </View>
            )}
          </ScrollView>

          <TouchableOpacity>
            <Button
              className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-2 px-3 rounded w-full "
              textColor="white"
              onPress={nextPage}
              disabled={!selectedProcurementMode}>
              Next {'>'}
            </Button>
          </TouchableOpacity>
        </>
      )}
      {startCamera && (
        <>
          {/* Header */}
          <SafeAreaView className="flex-1">
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              ref={cameraRef}
              photo={true}
            />
            <View style={styles.buttonContainer}>
              <But title="Take Photo" onPress={takePhoto} />
            </View>
            
          </SafeAreaView>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
export default NewPurchase;
