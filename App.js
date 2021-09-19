import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import RegisterScreen from './pages/RegisterScreen';
import UpdateScreen from './pages/UpdateScreen';
import ViewScreen from './pages/ViewScreen';
import ViewAll from './pages/ViewAll';
import DeleteScreen from './pages/DeleteScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="Delete" component={DeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
