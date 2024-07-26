import {StyleSheet} from 'react-native';

export const SplitExpenseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  splitContainer: {
    backgroundColor: '#d4d4ff',
    borderRadius: 10,
    height: 600,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 5,
    color: 'black',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#898ef9',
    width: '100%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  splitButton: {
    padding: 15,
    backgroundColor: '#5d5bd4',
    borderRadius: 25,
    width: 100,
    alignItems: 'center',
    marginLeft: 10,
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  splitrequest: {
    padding: 15,
    backgroundColor: '#5d5bd4',
    borderRadius: 25,
  },
  addremovecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  splitAmountcontainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});
