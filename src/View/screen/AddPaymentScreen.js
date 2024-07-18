// ExpenseTracker.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomSelect from '../components/SelectComponent';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import {Icon} from 'react-native-elements';
import AttachComponent from '../components/AttachComponent';
import {FlatList} from 'react-native';
import PaidExpenseList from '../components/PaidExpenseList';
import Voice from '@react-native-voice/voice';
import {useDispatch, useSelector} from 'react-redux';
import {
  Add_EXPLIST,
  AddExpList,
  Addlist,
  UPDATE_LIST,
  UpDateList,
} from '../../Redux/Action';

const AddPaymentScreen = ({route}) => {
  const [isrecording, setIsRecording] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [expenseinfo, setExpenseinfo] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [attachment, setAttachment] = useState({});
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const ExpData = useSelector(state => state.expData);
  const {id} = route.params;

  // const data = listItemData.filter(item => item.id === id).map(item => item);

  console.log(ExpData, 'jfjfjf');
  // const data = [
  //   {
  //     expenseinfo: expenseinfo,
  //     category: 'snacks',
  //     expAmount: 500,
  //     name: 'mano',
  //   },
  //   {
  //     expenseinfo: 'ticket',
  //     category: 'spend',
  //     expAmount: 600,
  //     name: 'deeban',
  //   },
  // ];

  const initialiseVoice = () => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = event => setVoiceData(event.value[0]);
  };

  useEffect(() => {
    initialiseVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  useEffect(() => {
    if (step === 1) {
      setExpenseinfo(voiceData);
    } else if (step === 2) {
      setExpAmount(voiceData);
    } else if (step === 3) {
      setName(voiceData);
    }
    setStep(prev => (prev + 1) % 4);
    // setVoiceData('');
  }, [voiceData]);

  // useEffect(() => {
  //   VoiceModel.initialiseVoice();
  // }, []);
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
  const handlePay = () => {
    if (expenseinfo && category && name && expAmount) {
      const amount = parseInt(expAmount);
      // dispatch({
      //   type: UPDATE_LIST,
      //   payload: {id, data},
      // });
      // dispatch(UpDateList(id, data));
      dispatch(AddExpList({id: id, expenseinfo, category, name, amount}));
      const data = ExpData.map(item => item.amount).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      dispatch(UpDateList(id, data));
      setExpenseinfo('');
      setCategory('');
      setAttachment({});
      setExpAmount('');
      setName('');
    }
    initialiseVoice();
  };

  // useEffect(() => {
  //   if (ExpData) {
  //     console.log("trigger")
  //     const data = ExpData.map(item => item.amount).reduce((acc, curr) => {
  //       return acc + curr;
  //     }, 0);
  //     dispatch(UpDateList(id, data));
  //   }
  // }, [ExpData]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>demo</Text>

      <Text style={styles.sectionTitle}>Paid Expense</Text>
      {ExpData.length !== 0 && (
        <View style={styles.section}>
          <FlatList
            style={{height: 500}}
            data={ExpData}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({item}) =>
              item.id !== id ? null : <PaidExpenseList item={item} />
            }
          />
        </View>
      )}

      <Text style={styles.addPaymentTitle}>Add New Payment</Text>

      <TextInput
        style={styles.input}
        value={expenseinfo}
        placeholderTextColor={'black'}
        placeholder="Please Add the Expense Info"
      />
      <TextInput
        style={styles.input}
        value={expAmount}
        placeholderTextColor={'black'}
        placeholder="Enter The Expense Amount"
      />
      <TextInput
        style={styles.input}
        value={name}
        placeholderTextColor={'black'}
        placeholder="Enter the Name"
      />

      <View style={styles.input}>
        <CustomSelect
          onSelect={item => setCategory(item.label)}
          data={[
            {label: 'Miscellaneous', value: 'miscellaneous'},
            {label: 'Food & Beverages', value: 'food_and_beverages'},
            {label: 'select1', value: 'select1'},
            {label: 'select2', value: 'select2'},
            {label: 'select3', value: 'select3'},
            // Add more categories as needed
          ]}
          defaultText={'Select Any Category'}
        />
      </View>

      <View style={styles.fileInput}>
        <AttachComponent
          onPhotoPicked={photo => setAttachment(photo, 'photo')}
        />
        {/* <Text style={styles.fileInputText}>Attach the File</Text> */}
      </View>
      <View style={[styles.fileInput, {gap: 180, width: '100%'}]}>
        <Text style={{width: 90, color: 'black'}}>
          {isrecording ? 'listening' : voiceData}
        </Text>
        <TouchableOpacity
          testID="MicButton"
          onPress={onPressMic}
          style={[
            VoiceStyles.MicButton,
            // {backgroundColor: VoiceModel.isrecording ? 'red' : 'lightgray'},
          ]}>
          <Icon name="mic" type="feather" color="#517fa4" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Split Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePay}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#e6e6fa',
    padding: 10,
    height: '25%',
    borderRadius: 8,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expenseItem: {
    backgroundColor: '#dcdcff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expenseText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryText: {
    color: 'black',
    fontSize: 14,
    color: '#666',
  },
  expenseDetails: {
    alignItems: 'flex-end',
  },
  amountText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paidByText: {
    fontSize: 14,
    color: '#f00',
  },
  addPaymentTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#e6e6fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 16,
    color: 'black',
  },
  fileInput: {
    backgroundColor: '#e6e6fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInputText: {
    color: 'black',
    fontSize: 16,
    color: '#aaa',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4b7bec',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddPaymentScreen;
