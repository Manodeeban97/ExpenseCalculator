// import React, {useState, useEffect} from 'react';
// import {View, Text, FlatList, Button, Alert} from 'react-native';
// import Voice from '@react-native-voice/voice';

// const NewComponent = () => {
//   const [recognizedText, setRecognizedText] = useState('');
//   const [items, setItems] = useState([]);
//   const [step, setStep] = useState('title'); // Steps: title, date, amount
//   const [currentItem, setCurrentItem] = useState({
//     title: '',
//     date: '',
//     amount: '',
//   });

//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResults;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechResults = e => {
//     const text = e.value[0];
//     setRecognizedText(text);
//   };

//   const startRecognizing = async () => {
//     try {
//       await Voice.start('en-US');
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const stopRecognizing = async () => {
//     try {
//       await Voice.stop();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleNextStep = () => {
//     stopRecognizing();
//     switch (step) {
//       case 'title':
//         setCurrentItem({...currentItem, title: recognizedText});
//         setStep('date');
//         Alert.alert('Next', 'Please say the date.');
//         break;
//       case 'date':
//         setCurrentItem({...currentItem, date: recognizedText});
//         setStep('amount');
//         Alert.alert('Next', 'Please say the amount.');
//         break;
//       case 'amount':
//         setCurrentItem({...currentItem, amount: recognizedText});
//         addItem();
//         setStep('title');
//         Alert.alert(
//           'Done',
//           'Item added. Please say the title for the next item.',
//         );
//         break;
//     }
//     setRecognizedText(''); // Clear the recognized text for the next step
//   };

//   const addItem = () => {
//     const newItem = {
//       id: (items.length + 1).toString(),
//       ...currentItem,
//       amount: parseFloat(currentItem.amount),
//     };
//     setItems([...items, newItem]);
//     setCurrentItem({title: '', date: '', amount: ''}); // Reset current item
//   };

//   return (
//     <View style={{flex: 1, padding: 20}}>
//       <Button title="Start Recognizing" onPress={startRecognizing} />
//       <Text style={{color: 'black'}}>Recognized Text: {recognizedText}</Text>
//       <Button title="Next Step" onPress={handleNextStep} />
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <View style={{padding: 10, borderBottomWidth: 1}}>
//             <Text style={{color: 'black'}}>Title: {item.title}</Text>
//             <Text style={{color: 'black'}}>Date: {item.date}</Text>
//             <Text style={{color: 'black'}}>Amount: ${item.amount}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default NewComponent;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import Voice from '@react-native-voice/voice';


const NewComponent = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(0); // 0: Title, 1: Date, 2: Amount
  const [newItem, setNewItem] = useState({ title: '', date: '', amount: '' });

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0];
    setRecognizedText(text);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      setNewItem({ ...newItem, title: recognizedText });
    } else if (step === 1) {
      setNewItem({ ...newItem, date: recognizedText });
    } else if (step === 2) {
      setNewItem({ ...newItem, amount: recognizedText });
      addItem();
    }
    setRecognizedText('');
    setStep((prevStep) => (prevStep + 1) % 3); // Move to next step, reset to 0 after 2
  };

  const addItem = () => {
    const finalItem = {
      id: (items.length + 1).toString(),
      ...newItem,
      amount: parseFloat(newItem.amount.trim())
    };
    setItems([...items, finalItem]);
    setNewItem({ title: '', date: '', amount: '' }); // Reset the new item state
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Start Recognizing" onPress={startRecognizing} />
      <Text>Step: {step === 0 ? 'Title' : step === 1 ? 'Date' : 'Amount'}</Text>
      <Text>Recognized Text: {recognizedText}</Text>
      <Button title="Next" onPress={handleNextStep} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Title: {item.title}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Amount: ${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewComponent;

