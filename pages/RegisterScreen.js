import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = openDatabase({name: 'UserDatabase.db'});
const RegisterScreen = () => {
  const navigation = useNavigation();

  const [userName, setUsername] = useState('');
  const [userContact, setUsercontact] = useState('');
  const [userAddress, setUseraddres] = useState('');

  const register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please Enter Username.');
      return;
    }
    if (!userContact) {
      alert('Please Enter Contact.');
      return;
    }
    if (!userAddress) {
      alert('Please Enter Address.');
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address)VALUES(?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucess',
              'You are Registered Sucessfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };
  return (
    <>
      <TextInput
        placeholder="Username"
        style={{borderWidth: 0.5, margin: 10}}
        value={userName}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Contact number"
        style={{borderWidth: 0.5, margin: 10}}
        value={userContact}
        onChangeText={text => setUsercontact(text)}
      />
      <TextInput
        placeholder="Address"
        style={{borderWidth: 0.5, margin: 10}}
        value={userAddress}
        onChangeText={text => setUseraddres(text)}
        multiline={true}
        maxLength={225}
        numberOfLines={5}
      />
      <Button title="Submit" onPress={register_user} />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
