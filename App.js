import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VoiceModal from './src/View/components/VoiceModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GestureModal from './src/View/components/GestureModal';
import {Provider} from 'react-redux';
// import store from './store';
import ListScreen from './src/View/screen/ListScreen';
import VoiceScreen from './src/View/screen/VoiceScreen';
import store from './src/store';
import AddPaymentScreen from './src/View/screen/AddPaymentScreen';
// import SplitExpenseScreen from './src/View/components/NewComponent';
import SplitExpenseScreen from './src/View/screen/SplitExpenseScreen';
// import GestureScreen from './screen/GestureScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListScreen">
          <Stack.Screen
            name="ListScreen"
            component={ListScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="VoiceScreen"
            options={{headerShown: false}}
            component={VoiceScreen}
          />
          <Stack.Screen
            name="GestureModal"
            options={{headerShown: false}}
            component={GestureModal}
          />
          <Stack.Screen
            name="AddPaymentScreen"
            options={{headerShown: false}}
            component={AddPaymentScreen}
          />
          <Stack.Screen
            name="SplitExpenseScreen"
            options={{headerShown: false}}
            component={SplitExpenseScreen}
          />
          {/* <Stack.Screen name="GestureScreen" component={GestureScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
