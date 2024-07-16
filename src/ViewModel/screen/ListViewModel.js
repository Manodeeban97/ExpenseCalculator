import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ListViewModel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const listItemData = useSelector(state => state.listItem);

  const navigation = useNavigation();

  const viewModal = type => {
    if (type === 'voice') {
      navigation.navigate('VoiceScreen');
      setModalVisible(false);
    } else {
      navigation.navigate('GestureModal');
      setModalVisible(false);
    }
  };
  return {viewModal, modalVisible, listItemData,setModalVisible};
};

export default ListViewModel;
