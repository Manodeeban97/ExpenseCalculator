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
  inputText: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 16,
    color: 'black',
  },
  expenseBg: {flex: 1, resizeMode: 'cover'},
  expenseHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginBottom: 50,
  },
  expenseMainContainer: {height: '100%', padding: 30, gap: 80},
});
