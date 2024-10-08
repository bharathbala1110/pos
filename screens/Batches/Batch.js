import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Button, FAB} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getBatchList} from '../../features/Batches/batchSlice';



const Batch = ({navigation}) => {

const dispatch = useDispatch()
const {batchList} = useSelector(state => state.batchList)
useEffect(()=>{
    dispatch(getBatchList())
    console.log(batchList)
},[dispatch])

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
          icon={() => <Text className='text-white ml-2 w-11 h-10' >&#x2b;</Text>}
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
