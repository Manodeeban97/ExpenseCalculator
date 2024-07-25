import {StyleSheet} from 'react-native';

export const VoiceStyles = StyleSheet.create({
  AddButton: {
    padding: 20,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#5d5bd4',
  },
  MicButton: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  CheckButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 25,
  },
  VoiceFooter: {
    padding: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#c4cfff',
    color: 'black',
  },
  VoiceModalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
});
