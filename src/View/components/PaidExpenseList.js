import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PaidExpenseList = ({item}) => {
  return (
    <View style={styles.expenseItem}>
      <View>
        <Text style={styles.expenseText}>{item.expenseinfo}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.expenseDetails}>
        <Text style={styles.amountText}>{item.amount}</Text>
        <Text style={styles.paidByText}>{`Paid by ${item.name}`}</Text>
      </View>
    </View>
  );
};

export default PaidExpenseList;

const styles = StyleSheet.create({
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
});
