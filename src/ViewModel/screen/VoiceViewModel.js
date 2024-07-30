import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {
  app,
  ExpenseSchema,
  getRealmConfig,
  realmConfig,
} from '../../../realmConfig';
import Realm from 'realm';
import {loginAnonymous} from '../../../authentication';
import {useQuery, useRealm} from '@realm/react';

const VoiceViewModel = () => {
  const [isrecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [openCalendar, setOpenCalendar] = useState(false);
  // const [amount, setAmount] = useState('');
  const [step, setStep] = useState(0);
  const realm = useRealm();
  const expense = useQuery(ExpenseSchema);

  const navigation = useNavigation();

  const handleDate = (event, selected) => {
    if (event.type === 'dismissed') {
      setDate('');
      setOpenCalendar(false);
    } else {
      const currentDate = selected || new Date();
      const formattedDate = format(currentDate, 'MMM-dd-yyyy');
      setDate(formattedDate);
      setOpenCalendar(false);
    }
  };

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
        // setTitle('');
        // setDate('');
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

  // const handleAdd = async () => {
  //   if (title && date) {
  //     const newItem = {id: Math.random(), title, date, amount: 0};

  //     try {
  //       const existingList = await AsyncStorage.getItem('list');
  //       let list = JSON.parse(existingList) || [];
  //       list.push(newItem);
  //       await AsyncStorage.setItem('list', JSON.stringify(list));
  //       navigation.navigate('ListScreen');
  //     } catch (error) {
  //       console.error('Error saving data', error);
  //     }
  //   }
  // };
  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(ExpenseSchema));
    });
  }, [realm]);

  const handleAdd = async () => {
    // console.log(app.currentUser,"newItem")
    // console.log("handleAdd",new Realm.BSON.ObjectId())
    console.log(title, date, 'hfhfhf');
    if (title && date) {
      const newItem = {
        _id: new Realm.BSON.ObjectId(),
        title,
        date,
        amount: 0,
      };
      try {
        // const user = app.currentUser || (await loginAnonymous());
        realm.write(() => {
          realm.create('expenselist', newItem);
        });
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
    openCalendar,
    isrecording,
    voiceData,
    title,
    date,
    navigation,
    setTitle,
    setDate,
    setOpenCalendar,
    handleDate,
  };
};

export default VoiceViewModel;
