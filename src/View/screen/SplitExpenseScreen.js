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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

// import { generateHTMLContent } from '../../utils/PdfHelper';

const SplitExpenseScreen = ({route}) => {
  const {ExpenseId, expenseinfo, expenseData} = route.params;
  const [expenses, setExpenses] = useState(expenseData);
  const [results, setResults] = useState([]);

  const totalAmount = expenseData
    .filter(item => item.id === ExpenseId)
    .map(item => item.amount)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  const splitAmount = (
    totalAmount / expenses.filter(item => item.id === ExpenseId).length
  ).toFixed(0);

  const addNewRow = () => {
    setExpenses([
      ...expenses,
      {id: ExpenseId, amount: parseFloat(splitAmount), isNew: true},
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

  const updateName = (index, name) => {
    const updatedExpenses = expenses
      .filter(item => item.id === ExpenseId)
      .map((expense, i) => {
        if (i === index && expense.isNew) {
          return {...expense, name};
        }
        return expense;
      });
    setExpenses(updatedExpenses);
  };

  // console.log(expenses, 'jdjjfjffhf');

  const calculateResults = () => {
    const results = expenses
      .filter(item => item.id === ExpenseId)
      .map(item => {
        const balance = item.isNew
          ? splitAmount
          : (item.amount - splitAmount).toFixed(0);
        return {
          name: item.name || 'Unnamed',
          paid: item.isNew ? 0 : item.amount,
          balance: parseFloat(balance),
        };
      });
    setResults(results);
  };

  const generatePDF = async () => {
    const htmlContent = `
      <h1>Movie Expense Calculator</h1>
      <p>Total: ${totalAmount}</p>
      <table border="1">
        <tr>
          <th>Name</th>
          <th>Paid</th>
          <th>Remaining</th>
        </tr>
        ${results
          .map(
            expense => `
          <tr>
            <td>${expense.name}</td>
            <td>${expense.paid}</td>
            <td>${expense.balance}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
      <h2>Split Amount:</h2>
      ${results.map(result => `<p>${result}</p>`).join('')}
    `;

    const options = {
      html: htmlContent,
      fileName: 'ExpenseReport',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      await Share.open({url: `file://${file.filePath}`});
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={item.name}
        onChangeText={text => updateName(index, text)}
        editable={item.isNew}
      />
      <TextInput
        style={styles.input}
        value={item.isNew ? splitAmount : `-${item.amount - splitAmount}`}
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={item.isNew ? '0' : item.amount.toString()}
        editable={false}
      />
    </View>
  );

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
            data={expenses.filter(item => item.id === ExpenseId)}
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
            onPress={generatePDF}
            style={{padding: 15, backgroundColor: '#5d5bd4', borderRadius: 25}}>
            <Text style={{color: 'white'}}>Split Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={calculateResults}
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
          {results
            .filter(item => item.paid === 0)
            .map((result, index) => (
              <Text key={index} style={{color: 'black'}}>
                {result.name} has to give Rs.{result.balance} to others
              </Text>
            ))}
        </View>

        {/* <View style={{padding: 10}}>
          <Text style={styles.resultText}>
            Balaji has to give Rs.166.67 to Raja
          </Text>
          <Text style={styles.resultText}>
            Balaji has to give Rs.166.66 to Mano
          </Text>
        </View> */}
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
