import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Icon} from 'react-native-elements';
import Voice from '@react-native-voice/voice';
import VoiceModal from '../components/VoiceModal';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import VoiceViewModel from '../../ViewModel/screen/VoiceViewModel';
import {SplitExpenseStyles} from '../StyleSheet/SplitExpenseStyles';
import {TextInput} from 'react-native';
import {AddPaymentStyle} from '../StyleSheet/AddPaymentStyles';

const VoiceScreen = () => {
  const VoiceModel = VoiceViewModel();

  useEffect(() => {
    VoiceModel.initialiseVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/bg_blue.png')}
      style={{flex: 1, resizeMode: 'cover'}}>
      <View style={{height: '100%', padding: 30, gap: 80}}>
        <View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 50,
              marginBottom: 50,
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '800'}}>
              Create New Expenses
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Enter Expence Type
            </Text>
            <TextInput
              style={{
                marginTop: 10,
                backgroundColor: '#f1f1f1',
                padding: 16,
                borderRadius: 8,
                marginBottom: 8,
                fontSize: 16,
                color: 'black',
              }}
              value={VoiceModel.title}
              placeholderTextColor={'black'}
              placeholder="Enter Expence Type"
            />
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Date
            </Text>
            <TextInput
              style={{
                marginTop: 10,
                backgroundColor: '#f1f1f1',
                padding: 16,
                borderRadius: 8,
                marginBottom: 8,
                fontSize: 16,
                color: 'black',
              }}
              value={VoiceModel.date}
              placeholderTextColor={'black'}
              placeholder="Enter The Date"
            />
          </View>
        </View>
        {/* <Text
        testID="status"
        style={{color: 'black', padding: 20, fontSize: 20, fontWeight: 300}}>
        {VoiceModel.isrecording ? 'lisenting...' : VoiceModel.voiceData}
      </Text>
      <FlatList
        data={VoiceModel.VoiceList}
        key={(item, index) => index.toString()}
        renderItem={({item, index}) => <VoiceModal item={item} index={index} />}
      /> */}
        <View style={VoiceStyles.VoiceFooter}>
          <TouchableOpacity
            style={VoiceStyles.AddButton}
            onPress={VoiceModel.handleAdd}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
              Add Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="MicButton"
            onPress={VoiceModel.onPressMic}
            style={[
              VoiceStyles.MicButton,
              {backgroundColor: VoiceModel.isrecording ? 'red' : '#5d5bd4'},
            ]}>
            <Icon name="mic" type="feather" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default VoiceScreen;
