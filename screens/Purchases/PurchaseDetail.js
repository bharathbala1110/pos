import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PurchaseDetail() {
  return (
    <SafeAreaView>
      <View className="m-4">
        <View>
          <Text className="font-extrabold">Order #PO2647</Text>
          <Text>Supplier: ADI</Text>
          <Text>Supplier ID: 1050</Text>
          <Text>Total Quantity: 700.00kg</Text>
          <Text>Procurement mode: Dropoff</Text>
        </View>
      </View>
      <View className="m-4 ">
        <Text className="font-extrabold">Dropoff Details</Text>
        <Text>Vehicle number : NIL</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
