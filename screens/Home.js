import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();
const screenDimensions = Dimensions.get('screen');
console.log("screenDimensions",screenDimensions)

const Home=({navigation})=> {
 
   return (
    <View style={styles.container}>
      <ScrollView>
        {/* Heading */}

        <View style={{ flexDirection: "row" }}>
          {/* Purchase */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              borderRightWidth: 0.6,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Purchase")}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/purchase.jpeg")}
            />
            <Text style={styles.textStyle}>Purchase</Text>
          </TouchableOpacity>
          {/* Batch */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Batch")}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/batch.jpg")}
            />
            <Text style={styles.textStyle}>Batch</Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderTopWidth: 0.6, flexDirection: "row" }}>
          {/* Stock */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              borderRightWidth: 0.6,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Segregation")}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/segregation.jpg")}
            />
            <Text style={styles.textStyle}>Segregation</Text>
          </TouchableOpacity>
          {/* Sales */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Bale")}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/bale.png")}
            />
            <Text style={styles.textStyle}>Baling</Text>
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 0.6, flexDirection: "row" }}>
          {/* Stock */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              borderRightWidth: 0.6,
              justifyContent: "center",
              alignItems: "center",
              
            }}
            onPress={() => navigation.navigate("Sales")}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/sale.png")}
            />
            <Text style={styles.textStyle}>Sales</Text>
          </TouchableOpacity>
          {/* Sales */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: "50%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 60, height: 70 }}
              source={require("../assets/green.webp")}
            />
            <Text style={styles.textStyle}>Bluetooth Scale</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
    backgroundColor: "#fff",
   
  },

  textStyle: {
    fontSize: 18,
  },
});
export default  Home;