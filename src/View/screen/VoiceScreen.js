import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {Icon} from 'react-native-elements';
import Voice from '@react-native-voice/voice';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import VoiceViewModel from '../../ViewModel/screen/VoiceViewModel';
import {TextInput} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {handleVoice} from '../../Redux/Action';
import LottieView from 'lottie-react-native';

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
      style={VoiceStyles.expenseBg}>
      <View style={VoiceStyles.expenseMainContainer}>
        <View>
          <View style={VoiceStyles.expenseHeader}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '800'}}>
              Create New Expenses
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Enter Expence Type
            </Text>
            <TextInput
              style={VoiceStyles.inputText}
              value={VoiceModel.title}
              onChangeText={text => VoiceModel.setTitle(text)}
              placeholderTextColor={'black'}
              placeholder="Enter Expence Type"
            />
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Date
            </Text>
            <View
              style={[
                VoiceStyles.inputText,
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 5,
                  paddingRight: 15,
                  paddingLeft: 13,
                  justifyContent: 'space-between',
                },
              ]}>
              <TextInput
                style={{color: 'black', fontSize: 16}}
                value={VoiceModel.date}
                onChangeText={text => VoiceModel.setDate(text)}
                placeholderTextColor={'black'}
                placeholder="Enter The Date"
              />
              <TouchableOpacity
                onPress={() => VoiceModel.setOpenCalendar(true)}>
                <Icon
                  name="calendar-today"
                  type="materialicons"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {VoiceModel.openCalendar && (
              <RNDateTimePicker
                mode="date"
                value={new Date()}
                onChange={VoiceModel.handleDate}
              />
            )}
            {/* <TextInput
              style={VoiceStyles.inputText}
              value={VoiceModel.date}
              onChangeText={text => VoiceModel.setDate(text)}
              placeholderTextColor={'black'}
              placeholder="Enter The Date"
            /> */}
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
        <View
          style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {VoiceModel.isrecording && (
            <LottieView
              // ref={animationRef}
              resizeMode="cover"
              style={{width: 100, height: 100, margin: 0, padding: 0}}
              source={require('../../assets/Audio-animation.json')}
              autoPlay
              loop
            />
          )}
        </View>
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
