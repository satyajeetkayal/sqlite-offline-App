import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);
  return (
    <>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="Update" onPress={() => navigation.navigate('Update')} />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="View" onPress={() => navigation.navigate('View')} />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button
          title="View All"
          onPress={() => navigation.navigate('ViewAll')}
        />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="Delete" onPress={() => navigation.navigate('Delete')} />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
