import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const AddFoods = ({navigation}) => {
  const {params} = useRoute();
  console.log('params', params);

  const {isEdit, itemKey} = params;

  const [title, setTitle] = useState(isEdit ? params.title : '');
  const [price, setPrice] = useState(isEdit ? params.price : '');
  const [rating, setRating] = useState(isEdit ? params.rating : 1);
  const [image_url, setImage_url] = useState(isEdit ? params.image_url : '');
  //add data in collection
  const addData = () => {
    firestore()
      .collection('foods')
      .add({
        title,
        price,
        rating,
        image_url: `https://t4.ftcdn.net/jpg/03/21/32/45/360_F_321324549_3utrdpZOFdsyUElymaPhm5LXRyTpnteh.jpg`,
      })
      .then(() => navigation.goBack())
      .catch(err => console.log(err));
  };
  //update food item
  const handleUpdate = () => {
    firestore()
      .collection('foods')
      .doc(itemKey)
      .update({
        title,
        price,
        rating,
        image_url,
      })
      .then(() => {
        Alert.alert('Item Update Successfully!');
        navigation.goBack();
      })
      .catch(err => console.log('error in Update item'));
  };
  return (
    <View>
      <Text>Add Foods</Text>
      <View>
        <TextInput
          keyboardType="default"
          value={title}
          onChangeText={e => setTitle(e)}
          placeholder="Enter Title"
        />
        <TextInput
          value={price}
          onChangeText={e => setPrice(e)}
          placeholder="Enter Price"
        />
        <TextInput
          keyboardType="numeric"
          value={rating}
          onChangeText={e => setRating(e)}
          placeholder="Enter Rating"
        />
        {isEdit ? (
          <Button title="Update Food" onPress={() => handleUpdate()} />
        ) : (
          <Button title="Add Food" onPress={() => addData()} />
        )}
      </View>
    </View>
  );
};

export default AddFoods;

const styles = StyleSheet.create({});
