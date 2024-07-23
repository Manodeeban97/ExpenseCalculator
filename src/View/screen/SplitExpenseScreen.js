import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';

const SplitExpenseScreen = ({route}) => {
  const {ExpenseId, expenseinfo, expenseData} = route.params;
  const [expenses, setExpenses] = useState(expenseData);
  const totalAmount = expenseData
    .map(item => item.amount)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  const splitAmount = (totalAmount / expenses.length).toFixed(2);
  // const newSplitAmount = (splitAmount / expenses.length).toFixed(2);
  console.log(expenses.length,"njfnjjnjngjn")
  //   const addNewExpense = () => {
  //     setExpenses([
  //       ...expense,
  //       {id: Math.random(), name: '', amount: parseFloat(splitAmount)},
  //     ]);
  //   };
  //   const handleNameChange = (index, name) => {
  //     const updatedExpenses = [...expense];
  //     updatedExpenses[index].name = name;
  //     setExpenses(updatedExpenses);
  //   };
  const addNewRow = () => {
    setExpenses([
      ...expenses,
      {name: '', amount: parseFloat(splitAmount), isNew: true},
    ]);
  };

  // Function to remove the last added row
  const removeNewRow = () => {
    setExpenses(
      expenses.filter(
        (expense, index) => index !== expenses.length - 1 || !expense.isNew,
      ),
    );
  };

  // Function to update the name of a new row
  const updateName = (index, name) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? {...expense, name} : expense,
    );
    setExpenses(updatedExpenses);
  };

  //   console.log(expenses, 'jdjjfjffhf');

  const renderItem = ({item, index}) => (
  
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={item.name}
        onChangeText={text => updateName(index, text)}
      />
      <TextInput
        style={styles.input}
        value={item.isNew ? splitAmount : `-${item.amount-splitAmount}`}
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={item.isNew ? '0' : item.amount.toString()}
        editable={false}
      />
    </View>
  );

  //   const renderItem = ({item}) => (
  //     <View style={styles.row}>
  //       <TextInput style={styles.input} value={item.name} editable={false} />
  //       <TextInput
  //         style={styles.input}
  //         value={splitAmount.toString()}
  //         editable={false}
  //       />
  //       <TextInput
  //         style={styles.input}
  //         value={item.amount.toString()}
  //         editable={false}
  //       />
  //     </View>
  //   );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Split the Expenses</Text>
      <View style={styles.splitContainer}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black'}}>{expenseinfo}</Text>
          <Text style={{color: 'black'}}>Split Amount: {splitAmount}</Text>
        </View>
        <View style={{height: '30%'}}>
          <FlatList
            data={expenses}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{padding: 10}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <TouchableOpacity onPress={removeNewRow}>
            <Icon name="minuscircle" type="antdesign" color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addNewRow}>
            <Icon name="pluscircle" type="antdesign" color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: {totalAmount}</Text>
          <TouchableOpacity
            style={{padding: 15, backgroundColor: '#5d5bd4', borderRadius: 25}}>
            <Text style={{color: 'white'}}>Split Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: '#5d5bd4',
            borderRadius: 25,
            width: 100,
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text style={{color: 'white'}}>Split</Text>
        </TouchableOpacity>

        <View style={{padding: 10}}>
          <Text style={styles.resultText}>
            Balaji has to give Rs.166.67 to Raja
          </Text>
          <Text style={styles.resultText}>
            Balaji has to give Rs.166.66 to Mano
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // padding: 10,
    borderRadius: 10,
    height: '70%',
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
    marginVertical: 10,
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplitExpenseScreen;
