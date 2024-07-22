import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import {Addlist} from '../../Redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Addlist } from '../../redux/Action';
// import { Addlist } from '../../redux/Action';

const VoiceViewModel = () => {
  const [isrecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (step === 1) {
      setTitle(voiceData);
    } else if (step === 2) {
      setDate(voiceData);
    } else {
      null;
    }
    setStep(prev => (prev + 1) % 3);
  }, [voiceData]);

  const VoiceList = [
    {
      title: 'Add Title',
      data: title,
      voiceData: voiceData,
      isrecording: isrecording,
      // onPressMic: onPressMic,
      // onPressCheck: () => handleSetOperation('setTitle'),
    },
    {
      title: 'Add Date',
      data: date,
      voiceData: voiceData,
      isrecording: isrecording,
      // onPressMic: onPressMic,
      // onPressCheck: () => handleSetOperation('setDate'),
    },
    // {
    //   title: 'Add Amount',
    //   data: amount,
    //   voiceData: voiceData,
    //   isrecording: isrecording,
    //   // onPressMic: onPressMic,
    //   // onPressCheck: () => handleSetOperation('setLocation'),
    // },
  ];

  // const existingList = await AsyncStorage.getItem('list');
  const listItemData = AsyncStorage.getItem('list');
  console.log(listItemData, 'mano');
  // const listItemData = useSelector(state => state.listItem);

  // const handleSetOperation = operation => {
  //   if (operation == 'setTitle') {
  //     setTitle(voiceData.trim());
  //     setVoiceData('');
  //   } else if (operation == 'setDate') {
  //     setDate(voiceData.trim());
  //     setVoiceData('');
  //   } else {
  //     setLocation(voiceData.trim());
  //     setVoiceData('');
  //   }
  // };

  // const onPressMic = () => {
  //   isrecording ? handleEnd() : handleStart();
  // };
  const onPressMic = async () => {
    if (isrecording) {
      try {
        Voice.stop();
        setIsRecording(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Voice.start('en-US');
        setIsRecording(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const handleStart = async () => {
  //   try {
  //     await Voice.start('en-US');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleEnd = async () => {
  //   try {
  //     Voice.stop();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const initialiseVoice = () => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = event => setVoiceData(event.value[0]);
  };

  // const handleAdd = () => {
  //   if (title && date) {
  //     dispatch(Addlist({title, date, amount: 0}));
  //     navigation.navigate('ListScreen');
  //   }
  // };
  const handleAdd = async () => {
    if (title && date) {
      const newItem = {id: Math.random(), title, date, amount: 0};

      try {
        // Get the existing list from AsyncStorage
        const existingList = await AsyncStorage.getItem('list');
        let list = JSON.parse(existingList) || [];

        // Add the new item to the list
        list.push(newItem);
        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem('list', JSON.stringify(list));

        // Navigate to the ListScreen
        navigation.navigate('ListScreen');
      } catch (error) {
        console.error('Error saving data', error);
      }
    }
  };

  return {
    // handleSetOperation,
    onPressMic,
    initialiseVoice,
    handleAdd,
    listItemData,
    VoiceList,
    isrecording,
    voiceData,
    title,
    date,
    navigation,
  };
};

export default VoiceViewModel;
