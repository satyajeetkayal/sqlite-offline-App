import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase.db'});

const ViewAll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; i++)
          temp.push(results.rows.item(i));
        setData(temp);
      });
    });
  }, []);
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View key={item.user_id}>
            <Text>{item.user_id}</Text>
            <Text>{item.user_name}</Text>
            <Text>{item.user_contact}</Text>
            <Text>{item.user_address}</Text>
          </View>
        )}
      />
    </>
  );
};

export default ViewAll;

const styles = StyleSheet.create({});
