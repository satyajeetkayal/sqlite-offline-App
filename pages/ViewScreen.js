import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase.db'});
const ViewScreen = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState({});

  const searchUser = () => {
    console.log(userId);
    setUserId({});
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [userId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setData(results.rows.item(0));
          } else {
            alert('No User Found');
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
          //value={userId}
          onChangeText={text => setUserId(text)}
        />
        <Button title="View" onPress={searchUser} />
      </View>
      <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
        <Text>{data.user_id}</Text>
        <Text>{data.user_name}</Text>
        <Text>{data.user_contact}</Text>
        <Text>{data.user_address}</Text>
      </View>
    </>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({});
