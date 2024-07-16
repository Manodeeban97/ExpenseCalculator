import {StyleSheet} from 'react-native';

export const VoiceStyles = StyleSheet.create({
  AddButton: {
    padding: 20,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: '#5d5bd4',
    marginBottom: 10,
  },
  MicButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  CheckButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 25,
  },
  VoiceFooter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100,
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
  VoiceModalContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  }
});
