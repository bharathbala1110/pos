import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseList } from '../../features/purchase/purchaseSlice';
import { fetchPurchaseList } from '../../services/purchaseService';
const Purchase=({navigation})=> {
 const dispatch = useDispatch()
 const { purchaseOrderList, loading, error } = useSelector(state => state.purchaseList);
 useEffect(()=>{
//  const s=fetchPurchaseList()
 dispatch(getPurchaseList())
//  console.log(state)

},[dispatch])

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('PurchaseDetails', {id: item.order_id})
        }>
        <Text style={styles.title}>{'Order#PO' + item.order_id}</Text>
        <Text style={styles.content}>{'Supplier: ' + item.supplier}</Text>
        <Text style={styles.content}>{'Quantity: ' + item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={purchaseOrderList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.order_id}
      />
      <View style={styles.fabContainer}>
        <FAB
          color="white"
          icon={() => <Icon name="add" color="white" />}
          style={styles.fabStyle}
          onPress={() => navigation.navigate('NewPurchase')}
        />
      </View>
    </View>
  );
}
export default Purchase;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FAF9F6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 19,
  },
  content: {
    fontSize: 16,
    opacity: 0.8,
    color: 'gray',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 28,
  },
  fabStyle: {
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
});
