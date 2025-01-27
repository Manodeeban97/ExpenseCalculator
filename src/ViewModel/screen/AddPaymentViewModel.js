import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
import {useNavigation} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateHTMLContent} from '../../utils/PdfHelper';
import {Expenselist, RealmContext} from '../models/Task';
import {BSON} from 'realm';

const {useQuery, useRealm} = RealmContext;

const AddPaymentViewModel = () => {
  const realm = useRealm();
  const expenseData = useQuery(Expenselist);
  const [isrecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [expenseinfo, setExpenseinfo] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [listId, setListID] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [currentInput, setCurrentInput] = useState(0);
  const [dataSet, setDataSet] = useState(false);
  // const [expenseData, setExpenseData] = useState([]);
  const navigation = useNavigation();
  // const expense = expenseData.filtered('subID == $0', listId);
  // const totalAmount = expense.sum('amount');

  const SelectData = [
    {label: 'Miscellaneous', value: 'miscellaneous'},
    {label: 'Food & Beverages', value: 'food_and_beverages'},
    {label: 'select1', value: 'select1'},
    {label: 'select2', value: 'select2'},
    {label: 'select3', value: 'select3'},
  ];

  const initialiseVoice = () => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = event => setVoiceData(event.value[0]);
  };


  useEffect(() => {
    if (currentInput && !dataSet) {
      if (currentInput === 1) {
       setExpenseinfo(voiceData);
      } else if (currentInput === 2) {
        setExpAmount(voiceData);
      } else if (currentInput === 3) {
        setName(voiceData);
      }
      setDataSet(true);
    }
  }, [currentInput, voiceData]);
  

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
  // const handlePay = async () => {
  //   if (expenseinfo && category && name && expAmount) {
  //     const amount = parseInt(expAmount);
  //     const newExpense = {
  //       id: listId,
  //       expenseinfo,
  //       category,
  //       name,
  //       amount,
  //       attachment,
  //     };

  //     try {
  //       // Get the existing expenses from AsyncStorage
  //       const existingExpenses = await AsyncStorage.getItem('expenses');
  //       let expenses = JSON.parse(existingExpenses) || [];
  //       expenses.push(newExpense);
  //       await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
  //       navigation.navigate('ListScreen');

  //       setExpenseinfo('');
  //       setCategory('');
  //       setAttachment(null);
  //       setExpAmount('');
  //       setName('');
  //     } catch (error) {
  //       console.error('Error saving data', error);
  //     }
  //   }
  //   initialiseVoice();
  // };
  const handleUpdate = async () => {
    try {
      if (listId !== '') {
        const expense = expenseData.filtered('subID == $0', listId);
        const totalAmount = expense.sum('amount');
        realm.write(() => {
          // Update the task with the specified _id
          realm.create(
            'Task',
            {_id: new BSON.ObjectId(listId), amount: totalAmount},
            'modified',
          );
        });
      }
    } catch (error) {
      console.log('Error updating list in local storage: ', error);
    }
  };

  const handlePay = async () => {
    if (expenseinfo && category && name && expAmount) {
      const amount = parseInt(expAmount);
      const newExpense = {
        _id: new BSON.ObjectId(),
        subID: listId,
        expenseinfo,
        category,
        name,
        amount,
      };

      try {
        realm.write(() => {
          realm.create('ExpenseList', newExpense);
        });
        handleUpdate();
        navigation.navigate('ListScreen');

        setExpenseinfo('');
        setCategory('');
        setAttachment(null);
        setExpAmount('');
        setName('');
      } catch (error) {
        console.error('Error saving data', error);
      }
    }
    initialiseVoice();
  };

  const fetchExpenses = async () => {
    const existingExpenses = await AsyncStorage.getItem('expenses');
    let expenses = JSON.parse(existingExpenses) || [];
    // setExpenseData(expenses);
  };

  const createAndSharePDF = async () => {
    try {
      const expense = expenseData.filtered('subID == $0', listId);
      const attachmentData = expense.map(item => item?.attachment);
      const htmlContent = await generateHTMLContent(expense, attachmentData);

      const options = {
        html: htmlContent,
        fileName: 'ExpenseCalculator',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      const shareOptions = {
        title: 'Share PDF',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
      };

      await Share.open(shareOptions);
    } catch (error) {
      Alert.alert('Error', 'Failed to create and share PDF');
      console.error(error);
    }
  };

  const handleFocus = (inputNumber) => {
    setCurrentInput(inputNumber);
    setDataSet(false);
  };
  

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Expenselist));
    });
  }, [realm]);

  return {
    initialiseVoice,
    onPressMic,
    handlePay,
    createAndSharePDF,
    fetchExpenses,
    isrecording,
    voiceData,
    expenseinfo,
    expAmount,
    name,
    category,
    expenseData,
    navigation,
    setCategory,
    setAttachment,
    setListID,
    SelectData,
    setExpenseinfo,
    setExpAmount,
    setName,
    setCurrentInput,
    setDataSet,
    handleFocus
  };
};

export default AddPaymentViewModel;
