import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {VoiceStyles} from '../StyleSheet/VoiceStyle';

const VoiceModal = ({item, index}) => {
  return (
    <View style={VoiceStyles.VoiceModalContainer}>
      <View style={VoiceStyles.FlatList}>
        <View style={{width: 300}}>
          <Text testID={`title${index}`} style={{color: 'black'}}>
            {item.data ? item.data : item.title}
            {/* {item.data} */}
          </Text>
        </View>
        <TouchableOpacity
          testID={`checkBtn${index}`}
          onPress={item.onPressCheck}
          style={[
            VoiceStyles.CheckButton,
            {backgroundColor: item.data === '' ? 'lightgray' : '#a2eab8'},
          ]}>
          <Icon name="check" type="feather" color="#517fa4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoiceModal;
