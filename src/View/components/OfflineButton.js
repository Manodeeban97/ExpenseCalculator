import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RealmContext} from '../../ViewModel/models/Task';
import {useNetInfo} from '@react-native-community/netinfo';
import {ListStyle} from '../StyleSheet/ListStyles';
import {Alert} from 'react-native';

const {useQuery, useRealm} = RealmContext;

export function OfflineModeButton() {
  const realm = useRealm();
  const NetInfo = useNetInfo();

  const handleSync = () => {
    if (NetInfo.isConnected === true) {
      realm.syncSession.resume();
      setTimeout(() => {
        realm.syncSession.pause();
      }, 1000);
      Alert.alert('SuccessFul', 'Data Sync Successful', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      alert('Data Sync Successful');
    } else {
      Alert.alert('No internet!', 'Please Connect to Internet', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        width: 150,
        backgroundColor: '#5d5bd4',
        // backgroundColor: '#7080fd',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handleSync}>
      <Text style={styles.buttonText}>Sync</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    padding: 12,
    color: 'white',
  },
});
