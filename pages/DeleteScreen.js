import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = openDatabase({name: 'UserDatabase.db'});
const DeleteScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');

  const deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_user where user_id=?',
        [userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };
  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <TextInput
          style={{borderWidth: 0.4, bottom: 10}}
          placeholder="Enter User Id"
          value={userId}
          onChangeText={text => setUserId(text)}
        />
        <Button title="Delete" onPress={deleteUser} />
      </View>
    </>
  );
};

export default DeleteScreen;

const styles = StyleSheet.create({});
