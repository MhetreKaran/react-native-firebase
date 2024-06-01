import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [foods, setFoods] = useState([]); // Initial empty array of users

  //Delete item
  const handleDelete = (key) => {
    firestore()
      .collection('foods')
      .doc(key)
      .delete()
      .then(() => Alert.alert('Item Delete Successfully!'))
      .catch(err => console.log('error in delete item'));
  };


  useEffect(() => {
    const subscriber = firestore()
      .collection('foods')
      .onSnapshot(querySnapshot => {
        const foods = [];

        querySnapshot.forEach(documentSnapshot => {
          foods.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setFoods(foods);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Home Screen</Text>
      <FlatList
        data={foods}
        renderItem={({item, index}) => (
          <View>
            <Text>{item.title}</Text>
            <Image
              source={{uri: `${item?.image_url}`}}
              style={{width: 100, height: 100, borderWidth: 1}}
            />
            <Text>{`Price: ${item.price}`}</Text>
            <Text>{`Rating: ${item.rating}`}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text onPress={()=>handleDelete(item.key)}>delete</Text>
            <Text onPress={()=>navigation.navigate("AddFoods",{
                isEdit:true,
                title:item.title,
                image_url:item.image_url,
                price:item.price,
                rating:item.rating,
                itemKey:item.key 
            })}>Edit</Text>
            </View>
          </View>
        )}
      />
      <Button
        title="Add Foods"
        onPress={() => navigation.navigate('AddFoods')}
      />
   

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
