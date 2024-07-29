import {StyleSheet} from 'react-native';

export const AddPaymentStyle = StyleSheet.create({
  container: {
    marginTop:20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 130,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#e6e6fa',
    padding: 10,
    height: '23%',
    borderRadius: 8,
    justifyContent:"center"
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
    // justifyContent:"space-between",
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
    // padding:10
    paddingTop:10
  },
  button: {
    backgroundColor: '#5d5bd4',
    padding: 16,
    alignItems: 'center',
    borderRadius:25,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
