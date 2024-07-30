// ExpenseTracker.js
import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import CustomSelect from '../components/SelectComponent';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import {Icon} from 'react-native-elements';
import AttachComponent from '../components/AttachComponent';
import {FlatList} from 'react-native';
import PaidExpenseList from '../components/PaidExpenseList';
import Voice from '@react-native-voice/voice';
import AddPaymentViewModel from '../../ViewModel/screen/AddPaymentViewModel';
import {AddPaymentStyle} from '../StyleSheet/AddPaymentStyles';
import LottieView from 'lottie-react-native';

const AddPaymentComponent = ({route}) => {
  const AddPaymentModel = AddPaymentViewModel();
  const {subID} = route.params;

  useEffect(() => {
    AddPaymentModel.initialiseVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    AddPaymentModel.fetchExpenses();
    AddPaymentModel.setListID(subID);
  }, []);

  // console.log(AddPaymentModel.expenseData,"expenseData")


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
              AddPaymentModel.expenseData.filter(item => item.id === subID) < 1
            }>
            <Icon name="share" type="entypo" color="#5d5bd4" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={AddPaymentStyle.sectionTitle}>Paid Expense</Text>
      <View style={AddPaymentStyle.section}>
        {AddPaymentModel.expenseData.filter(item => item.id === subID).length !==
        0 ? (
          <FlatList
            style={{height: 500}}
            data={AddPaymentModel.expenseData}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({item}) =>
              item.id !== subID ? null : <PaidExpenseList item={item} />
            }
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <Icon name="archive" type="entypo" color="#5d5bd4" size={30} />
            <Text style={{color: 'black'}}>No data</Text>
          </View>
        )}
      </View>

      <Text style={AddPaymentStyle.addPaymentTitle}>Add New Payment</Text>

      <TextInput
        style={AddPaymentStyle.input}
        onChangeText={text => AddPaymentModel.setExpenseinfo(text)}
        value={AddPaymentModel.expenseinfo}
        placeholderTextColor={'black'}
        placeholder="Please Add the Expense Info"
      />
      <TextInput
        style={AddPaymentStyle.input}
        onChangeText={text => AddPaymentModel.setExpAmount(text)}
        value={AddPaymentModel.expAmount}
        placeholderTextColor={'black'}
        placeholder="Enter The Expense Amount"
      />
      <TextInput
        style={AddPaymentStyle.input}
        onChangeText={text => AddPaymentModel.setName(text)}
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
      </View>
      <View
        style={[
          AddPaymentStyle.fileInput,
          {width: '100%', padding: 10, justifyContent: 'space-between'},
        ]}>
        {AddPaymentModel.isrecording ? (
          <LottieView
            // ref={animationRef}
            resizeMode="cover"
            style={{width: 100, height: 50}}
            source={require('../../assets/Audio-animation.json')}
            autoPlay
            loop
          />
        ) : (
          <Text style={{width: 90, color: 'black', paddingLeft: 25}}>
            {AddPaymentModel.voiceData}
          </Text>
        )}
        <TouchableOpacity
          onPress={AddPaymentModel.onPressMic}
          style={[
            VoiceStyles.MicButton,
            {
              backgroundColor: AddPaymentModel.isrecording ? 'red' : '#5d5bd4',
            },
          ]}>
          <Icon name="mic" type="feather" color="white" />
        </TouchableOpacity>
      </View>
      <View style={AddPaymentStyle.buttonContainer}>
        <TouchableOpacity
          style={AddPaymentStyle.button}
          onPress={() =>
            AddPaymentModel.navigation.navigate('SplitExpenseScreen', {
              ExpenseId: subID,
              // expenseinfo: data?.title,
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

export default AddPaymentComponent;
