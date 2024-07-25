import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VoiceViewModel = () => {
  const [isrecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  // const [amount, setAmount] = useState('');
  const [step, setStep] = useState(0);

  const navigation = useNavigation();

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
     
    },
    {
      title: 'Add Date',
      data: date,
      voiceData: voiceData,
      isrecording: isrecording,
    },
  
  ];

  const listItemData = AsyncStorage.getItem('list');
  console.log(listItemData, 'mano');

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

  const initialiseVoice = () => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = event => setVoiceData(event.value[0]);
  };

  const handleAdd = async () => {
    if (title && date) {
      const newItem = {id: Math.random(), title, date, amount: 0};

      try {
        const existingList = await AsyncStorage.getItem('list');
        let list = JSON.parse(existingList) || [];
        list.push(newItem);
        await AsyncStorage.setItem('list', JSON.stringify(list));
        navigation.navigate('ListScreen');
      } catch (error) {
        console.error('Error saving data', error);
      }
    }
  };

  return {
    onPressMic,
    initialiseVoice,
    handleAdd,
    VoiceList,
    isrecording,
    voiceData,
    title,
    date,
    navigation,
  };
};

export default VoiceViewModel;
