import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import Voice from '@react-native-voice/voice';
import VoiceModal from '../components/VoiceModal';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';
import VoiceViewModel from '../../ViewModel/screen/VoiceViewModel';


const VoiceScreen = () => {
  const VoiceModel = VoiceViewModel();



  useEffect(() => {
    VoiceModel.initialiseVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  // useEffect(() => {
  //   VoiceModel.initialiseVoice();
  // }, [VoiceModel.listItemData]);

  // useEffect(() => {
  //   if (step === 1) {
  //     setTitle(VoiceModel.voiceData);
  //   } else if (step === 2) {
  //     setDate(VoiceModel.voiceData);
  //   } else if (step === 3) {
  //     setAmount(VoiceModel.voiceData);
  //   }
  //   setStep(prev => (prev + 1) % 4);
  // }, [VoiceModel.voiceData]);

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <Text
        testID="status"
        style={{color: 'black', padding: 20, fontSize: 20, fontWeight: 300}}>
        {VoiceModel.isrecording ? 'lisenting...' : VoiceModel.voiceData}
      </Text>
      <FlatList
        data={VoiceModel.VoiceList}
        // data={VoiceList}
        key={(item, index) => index.toString()}
        renderItem={({item, index}) => <VoiceModal item={item} index={index} />}
        // renderItem={({item, index}) => (
        //   <Text style={{color: 'black'}}>
        //     {item.data ? item.data : item.title}
        //   </Text>
        // )}
      />
      <View style={VoiceStyles.VoiceFooter}>
        <TouchableOpacity
          testID="MicButton"
          onPress={VoiceModel.onPressMic}
          style={[
            VoiceStyles.MicButton,
            {backgroundColor: VoiceModel.isrecording ? 'red' : 'lightgray'},
          ]}>
          <Icon name="mic" type="feather" color="#517fa4" />
        </TouchableOpacity>
        <TouchableOpacity
          style={VoiceStyles.AddButton}
          onPress={VoiceModel.handleAdd}>
          <Text>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoiceScreen;
