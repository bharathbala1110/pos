import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Button, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getBatchList} from '../../features/Batches/batchSlice';

const data = [
  {
    batch_id: 1,
    date: '2024-01-05T09:31:17.000Z',
    supplier_id: 4,
    supplier: 'thiru',
    quantity: '50',
    status: 'Segregated',
  },
  {
    batch_id: 2,
    date: '2024-01-08T11:49:47.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '70',
    status: 'Segregated',
  },
  {
    batch_id: 3,
    date: '2024-01-09T09:50:13.000Z',
    supplier_id: 6,
    supplier: 'moorthy',
    quantity: '20',
    status: 'Segregated',
  },
  {
    batch_id: 23,
    date: '2024-01-10T06:18:27.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 25,
    date: '2024-01-10T06:20:44.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 28,
    date: '2024-01-10T06:36:11.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 29,
    date: '2024-01-10T06:36:21.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 30,
    date: '2024-01-10T06:38:26.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 31,
    date: '2024-01-10T06:38:44.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 37,
    date: '2024-01-10T07:10:41.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 38,
    date: '2024-01-10T09:56:29.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 39,
    date: '2024-01-10T09:57:22.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
  {
    batch_id: 40,
    date: '2024-01-10T10:06:09.000Z',
    supplier_id: 5,
    supplier: 'selvam',
    quantity: '370',
    status: 'Segregated',
  },
];

const Batch = ({navigation}) => {

const dispatch = useDispatch()
const {batchList} = useSelector(state => state.batchList)
useEffect(()=>{
    dispatch(getBatchList())
    console.log(batchList)
},[])

  const Item = ({item}) => (
    
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('PurchaseDetails', {id: item.order_id})
        }>
        <Text style={styles.title}>{item.display_batch_id}</Text>
        <Text style={styles.content}>{'Quantity: ' + item.totalQuantity}</Text>
        <View className="items-start mt-2">
          <Button
            mode="text"
            className="bg-green-500 px-3  hover:bg-green-700
      rounded-full"
            textColor="white">
            {item.status==1?'created':'processing'}
          </Button>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={batchList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.batch_id}
      />
      <View style={styles.fabContainer}>
        <FAB
          color="white"
          icon={() => <Icon name="add" color="white" />}
          style={styles.fabStyle}
          onPress={() => navigation.navigate('NewBatch')}
        />
      </View>
    </View>
  );
};
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
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
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
export default Batch;
