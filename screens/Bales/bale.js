import React, { useEffect } from 'react'
import { getBaleList } from '../../features/Bale/baleSlice'
import { useDispatch, useSelector } from 'react-redux';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button, FAB} from 'react-native-paper';
export default function Bale({navigation}) {
    const dispatch = useDispatch()
 const {baleList , loading } = useSelector(state => state.bale);
    useEffect(()=>{
     dispatch(getBaleList())
     console.log(baleList)
    },[])
   const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={0.6}
       >
        <Text style={styles.title}>{item.bale_id}</Text>
        <Text style={styles.content}>{'Material Type : ' + item.bale_material}</Text>
        <Text style={styles.content}>{'Quantity : ' + item.bale_quantity}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={baleList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.bale_id}
      />
      <View style={styles.fabContainer}>
        <FAB
          color="white"
          icon={() => <Text className='text-white ml-2 w-11 h-10' >&#x2b;</Text>}
          style={styles.fabStyle}
          onPress={() => navigation.navigate('NewBaling')}
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

