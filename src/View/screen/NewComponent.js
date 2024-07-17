// ExpenseTracker.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const ExpenseTracker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paid Expense</Text>
        
        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseText}>ticket</Text>
            <Text style={styles.categoryText}>Miscellaneous</Text>
          </View>
          <View style={styles.expenseDetails}>
            <Text style={styles.amountText}>500</Text>
            <Text style={styles.paidByText}>Paid by Raja</Text>
          </View>
        </View>
        
        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseText}>snacks</Text>
            <Text style={styles.categoryText}>Food & Beverages</Text>
          </View>
          <View style={styles.expenseDetails}>
            <Text style={styles.amountText}>300</Text>
            <Text style={styles.paidByText}>Paid by Mano</Text>
          </View>
        </View>
      </View>

      <Text style={styles.addPaymentTitle}>Add New Payment</Text>
      
      <TextInput style={styles.input} placeholder="Please Add the Expense Info" />
      <TextInput style={styles.input} placeholder="Enter The Expense Amount" />
      <TextInput style={styles.input} placeholder="Enter the Name" />
      
      <View style={styles.input}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Miscellaneous', value: 'miscellaneous' },
            { label: 'Food & Beverages', value: 'food_and_beverages' },
            // Add more categories as needed
          ]}
          placeholder={{ label: "Select the Category", value: null }}
        />
      </View>

      <View style={styles.fileInput}>
        <Text style={styles.fileInputText}>Attach the File</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Split Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#e6e6fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  expenseDetails: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paidByText: {
    fontSize: 14,
    color: '#f00',
  },
  addPaymentTitle: {
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
  },
  fileInput: {
    backgroundColor: '#e6e6fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInputText: {
    fontSize: 16,
    color: '#aaa',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4b7bec',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExpenseTracker;
