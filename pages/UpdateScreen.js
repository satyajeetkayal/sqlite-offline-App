import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = openDatabase({name: 'UserDatabase.db'});
const UpdateScreen = () => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');
  const [userContact, setUsercontact] = useState('');
  const [userAddress, setUseraddress] = useState('');

  const updateAllStates = (name, contact, address) => {
    setUsername(name);
    setUsercontact(contact);
    setUseraddress(address);
  };

  const searchUser = () => {
    console.log(userId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [userId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address);
          } else {
            alert('No User found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };
  const updateUser = () => {
    console.log(userId, userName, userContact, userAddress);

    if (!userId) {
      alert('Please fill User id');
      return;
    }
    if (!userName) {
      alert('Please fill Username');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=?, user_address=? where user_id=?',
        [userName, userContact, userAddress, userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated Successfully.',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };
  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black', bottom: 10}}
          placeholder="Enter User Id"
          value={userId}
          onChangeText={text => setUserId(text)}
        />
        <Button title="Search" onPress={searchUser} />
      </View>
      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black'}}
          placeholder="Username"
          value={userName}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black'}}
          maxLength={10}
          keyboardType="numeric"
          placeholder="Contact Number"
          value={'' + userContact}
          onChangeText={text => setUsercontact(text)}
        />
      </View>
      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.3, borderColor: 'black', bottom: 10}}
          multiline={true}
          maxLength={225}
          //numberOfLines={5}
          placeholder="Address"
          value={userAddress}
          onChangeText={text => setUseraddress(text)}
        />
        <Button title="Update" onPress={updateUser} />
      </View>
    </>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({});
