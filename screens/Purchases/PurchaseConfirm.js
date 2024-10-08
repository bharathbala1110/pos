import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addDriverSign, addSupplierSign, postPurchase } from "../../features/purchase/newPurchaseOrderSlice";

const PurchaseConfirm=({navigation})=> {
   const dispatch = useDispatch()
    const {orderData} = useSelector(state => state.newOrder)
    useEffect(()=>{
      console.log(orderData)
    },[driverSignature])
    const [driverSignature,setDriverSignature]=useState('')
    const [supervisorSignature,setSupervisorSignature]=useState('')

    const handleSignature = (signatureType, signatureValue) => {
     
        if (signatureType === "Driver") {
            setDriverSignature(signatureValue);
            dispatch(addDriverSign(signatureValue))
        } else if (signatureType === "Supervisor") {
            setSupervisorSignature(signatureValue);
            dispatch(addSupplierSign(signatureValue))
        }
    };
    const navigateToSignaturePage = (signatureType) => {
        navigation.navigate('PurchaseSignatory', { signatureType: signatureType, handleSignature: handleSignature });
    };
    const onConfirm=()=>{
      console.log("orderData",orderData)
     
      dispatch(postPurchase(orderData))
      console.log("after purchase orderData",orderData)

      console.log(".............................")
      navigation.navigate("Purchase")
    }
  return (
    <>
    <ScrollView>  
      <View className="flex-1 m-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg">Driver Signature</Text>
        <TouchableOpacity>
          <Button
            className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-0 px-4 rounded  "
            textColor="white" onPress={()=>navigateToSignaturePage('Driver')}
          >
            Add Signature
          </Button>
        </TouchableOpacity>
      </View>
      <View className='border-0.5 rounded mt-2 h-80'>
          {driverSignature && (<Image resizeMode={"contain"} source={{uri:driverSignature}} className='h-56 w-full object-cover '/>)}
      </View>
    </View>
    <View className="flex-1 mx-2 mt-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg">Supervisor Signature</Text>
        <TouchableOpacity>
          <Button
            className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-0 px-4 rounded"
            textColor="white"
            onPress={()=>navigateToSignaturePage('Supervisor')}
          >
            Add Signature
          </Button>
        </TouchableOpacity>
      </View>
      <View className='border-0.5 rounded mt-2 h-80'>
      {supervisorSignature && (<Image resizeMode={"contain"} source={{uri:supervisorSignature}}   className='h-56 w-full object-cover '/>)}
      </View>
    </View>
    </ScrollView>
     <TouchableOpacity>
     <Button
       className="bg-green-500 text-lg hover:bg-green-700
font-bold py-2 px-3 rounded w-full "
       textColor="white" onPress={onConfirm}
     >
       Confirm
       
     </Button>
   </TouchableOpacity>
   </>
  );
}
export default PurchaseConfirm;