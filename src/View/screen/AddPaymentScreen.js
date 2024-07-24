// ExpenseTracker.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomSelect from '../components/SelectComponent';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import {Icon} from 'react-native-elements';
import AttachComponent from '../components/AttachComponent';
import {FlatList} from 'react-native';
import PaidExpenseList from '../components/PaidExpenseList';
import Voice from '@react-native-voice/voice';
// import {useDispatch, useSelector} from 'react-redux';
// import {AddExpList, UpDateList} from '../../Redux/Action';
// import {useNavigation} from '@react-navigation/native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Share from 'react-native-share';
// import {generateHTMLContent} from '../../utils/PdfHelper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AddPaymentViewModel from '../../ViewModel/screen/AddPaymentViewModel';
import {AddPaymentStyle} from '../StyleSheet/AddPaymentStyles';

const AddPaymentScreen = ({route}) => {
  const AddPaymentModel = AddPaymentViewModel();
  // const [isrecording, setIsRecording] = useState(false);
  // const [voiceData, setVoiceData] = useState('');
  // const [expenseinfo, setExpenseinfo] = useState('');
  // const [expAmount, setExpAmount] = useState('');
  // const [name, setName] = useState('');
  // const [category, setCategory] = useState('');
  // const [attachment, setAttachment] = useState({});
  // const [step, setStep] = useState(0);
  // const dispatch = useDispatch();
  // const ExpData = useSelector(state => state.expData);
  // const [expenseData, setExpenseData] = useState([]);
  const {id, data} = route.params;
  // const navigation = useNavigation();

  // const initialiseVoice = () => {
  //   Voice.onSpeechStart = () => setIsRecording(true);
  //   Voice.onSpeechEnd = () => setIsRecording(false);
  //   Voice.onSpeechResults = event => setVoiceData(event.value[0]);
  // };

  useEffect(() => {
    AddPaymentModel.initialiseVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  // useEffect(() => {
  //   if (step === 1) {
  //     setExpenseinfo(voiceData);
  //   } else if (step === 2) {
  //     setExpAmount(voiceData);
  //   } else if (step === 3) {
  //     setName(voiceData);
  //   }
  //   setStep(prev => (prev + 1) % 4);
  //   // setVoiceData('');
  // }, [voiceData]);

  // useEffect(() => {
  //   VoiceModel.initialiseVoice();
  // }, []);
  // const onPressMic = async () => {
  //   if (isrecording) {
  //     try {
  //       Voice.stop();
  //       setIsRecording(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       await Voice.start('en-US');
  //       setIsRecording(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const handleUpdate = id => {
  //   const data = ExpData?.filter(item => item.id === id)
  //     .map(item => item.amount)
  //     .reduce((acc, curr) => {
  //       return acc + curr;
  //     }, 0);
  //   dispatch(UpDateList(id, data));
  // };

  // const handlePay = () => {
  //   if (expenseinfo && category && name && expAmount) {
  //     const amount = parseInt(expAmount);
  //     // console.log(attachment, 'uhuuuuuuuuft');
  //     dispatch(
  //       AddExpList({id: id, expenseinfo, category, name, amount, attachment}),
  //     );
  //     // handleUpdate(id);
  //     navigation.navigate('ListScreen');
  //     setExpenseinfo('');
  //     setCategory('');
  //     setAttachment({});
  //     setExpAmount('');
  //     setName('');
  //   }
  //   initialiseVoice();
  // };

  // const handlePay = async () => {
  //   if (expenseinfo && category && name && expAmount) {
  //     const amount = parseInt(expAmount);
  //     const newExpense = {
  //       id: id,
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

  //       // Add the new expense to the list
  //       expenses.push(newExpense);

  //       // Save the updated expenses list back to AsyncStorage
  //       await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

  //       // Navigate to the ListScreen
  //       navigation.navigate('ListScreen');

  //       // Reset form fields
  //       setExpenseinfo('');
  //       setCategory('');
  //       setAttachment({});
  //       setExpAmount('');
  //       setName('');
  //     } catch (error) {
  //       console.error('Error saving data', error);
  //     }
  //   }
  //   initialiseVoice();
  // };

  // const fetchExpenses = async () => {
  //   const existingExpenses = await AsyncStorage.getItem('expenses');
  //   let expenses = JSON.parse(existingExpenses) || [];
  //   setExpenseData(expenses);
  // };
  useEffect(() => {
    AddPaymentModel.fetchExpenses();
    AddPaymentModel.setListID(id);
  }, []);

  // console.log(ExpData, 'ufhfhfh');
  // const createAndSharePDF = async () => {
  //   try {
  //     const expenseData = ExpData.filter(item => item.id === id);
  //     const attachmentData = expenseData.map(item => item?.attachment);
  //     // console.log(attachmentData, 'attachmentData');
  //     const htmlContent = await generateHTMLContent(
  //       expenseData,
  //       attachmentData,
  //     );
  //     // console.log(expenseData, htmlContent, 'jfhfhjh');

  //     // Create the PDF
  //     const options = {
  //       html: htmlContent,
  //       fileName: 'ExpenseCalculator',
  //       directory: 'Documents',
  //     };

  //     const file = await RNHTMLtoPDF.convert(options);

  //     // Share the PDF
  //     const shareOptions = {
  //       title: 'Share PDF',
  //       url: `file://${file.filePath}`,
  //       type: 'application/pdf',
  //     };

  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to create and share PDF');
  //     console.error(error);
  //   }
  // };

  // console.log(data.title, 'dguhggh');

  return (
    <View style={AddPaymentStyle.container}>
      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={AddPaymentStyle.title}>demo</Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity>
            <Icon name="picture-as-pdf" type="materialicons" color="#5d5bd4" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={AddPaymentModel.createAndSharePDF}
            disabled={
              AddPaymentModel.expenseData.filter(item => item.id === id) < 1
            }>
            <Icon name="share" type="entypo" color="#5d5bd4" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={AddPaymentStyle.sectionTitle}>Paid Expense</Text>
      {AddPaymentModel.expenseData.length !== 0 && (
        <View style={AddPaymentStyle.section}>
          <FlatList
            style={{height: 500}}
            data={AddPaymentModel.expenseData}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({item}) =>
              item.id !== id ? null : <PaidExpenseList item={item} />
            }
          />
        </View>
      )}

      <Text style={AddPaymentStyle.addPaymentTitle}>Add New Payment</Text>

      <TextInput
        style={AddPaymentStyle.input}
        value={AddPaymentModel.expenseinfo}
        placeholderTextColor={'black'}
        placeholder="Please Add the Expense Info"
      />
      <TextInput
        style={AddPaymentStyle.input}
        value={AddPaymentModel.expAmount}
        placeholderTextColor={'black'}
        placeholder="Enter The Expense Amount"
      />
      <TextInput
        style={AddPaymentStyle.input}
        value={AddPaymentModel.name}
        placeholderTextColor={'black'}
        placeholder="Enter the Name"
      />

      <View style={AddPaymentStyle.input}>
        <CustomSelect
          onSelect={item => AddPaymentModel.setCategory(item.label)}
          data={AddPaymentModel.SelectData}
          defaultText={'Select Any Category'}
        />
      </View>

      <View style={AddPaymentStyle.fileInput}>
        <AttachComponent
          onPhotoPicked={photo => AddPaymentModel.setAttachment(photo, 'photo')}
        />
        {/* <Text style={AddPaymentStyle.fileInputText}>Attach the File</Text> */}
      </View>
      <View
        style={[
          AddPaymentStyle.fileInput,
          {gap: 180, width: '100%', padding: 10},
        ]}>
        <Text style={{width: 90, color: 'black'}}>
          {AddPaymentModel.isrecording
            ? 'listening'
            : AddPaymentModel.voiceData}
        </Text>
        <TouchableOpacity
          onPress={AddPaymentModel.onPressMic}
          style={[
            VoiceStyles.MicButton,
            // {backgroundColor: VoiceModel.isrecording ? 'red' : 'lightgray'},
          ]}>
          <Icon name="mic" type="feather" color="#517fa4" />
        </TouchableOpacity>
      </View>
      <View style={AddPaymentStyle.buttonContainer}>
        <TouchableOpacity
          style={AddPaymentStyle.button}
          onPress={() =>
            AddPaymentModel.navigation.navigate('SplitExpenseScreen', {
              ExpenseId: id,
              expenseinfo: data?.title,
              // expenseData: AddPaymentModel.expenseData,
            })
          }>
          <Text style={AddPaymentStyle.buttonText}>Split Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AddPaymentStyle.button}
          onPress={AddPaymentModel.handlePay}>
          <Text style={AddPaymentStyle.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const AddPaymentStyle = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     flex: 1,
//   },
//   title: {
//     color: 'black',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginLeft: 130,
//     marginBottom: 16,
//   },
//   section: {
//     backgroundColor: '#e6e6fa',
//     padding: 10,
//     height: '25%',
//     borderRadius: 8,
//   },
//   sectionTitle: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   expenseItem: {
//     backgroundColor: '#dcdcff',
//     padding: 16,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   expenseText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   categoryText: {
//     color: 'black',
//     fontSize: 14,
//     color: '#666',
//   },
//   expenseDetails: {
//     alignItems: 'flex-end',
//   },
//   amountText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   paidByText: {
//     fontSize: 14,
//     color: '#f00',
//   },
//   addPaymentTitle: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#e6e6fa',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//     fontSize: 16,
//     color: 'black',
//   },
//   fileInput: {
//     backgroundColor: '#e6e6fa',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   fileInputText: {
//     color: 'black',
//     fontSize: 16,
//     color: '#aaa',
//     marginLeft: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: '#4b7bec',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

export default AddPaymentScreen;
