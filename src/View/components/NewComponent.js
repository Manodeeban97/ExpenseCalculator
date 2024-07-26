// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import {Icon} from 'react-native-elements';

// const SplitExpenseScreen = ({route}) => {
//   const {ExpenseId, expenseinfo, expenseData} = route.params;
//   const [expenses, setExpenses] = useState(expenseData);
//   const [splitExpenses, setSplitExpenses] = useState([]);
//   const [items, setItems] = useState([]);
//   const [results, setResults] = useState([]);

//   const totalAmount = expenseData
//     .filter(item => item.id === ExpenseId)
//     .map(item => item.amount)
//     .reduce((acc, curr) => {
//       return acc + curr;
//     }, 0);

//   const splitAmount = (
//     totalAmount / expenses.filter(item => item.id === ExpenseId).length
//   ).toFixed(0);

//   const addNewRow = () => {
//     setExpenses([
//       ...expenses,
//       {id: ExpenseId, amount: parseFloat(splitAmount), isNew: true},
//     ]);
//   };

//   const removeNewRow = () => {
//     setExpenses(
//       expenses.filter(
//         (expense, index) => index !== expenses.length - 1 || !expense.isNew,
//       ),
//     );
//   };

//   // const updateName = (index, name, balance) => {
//   //   const updatedExpenses = expenses.map((expense, i) =>
//   //     i === index ? {name, paid: expense.amount, remaining: balance} : expense,
//   //   );
//   //   setSplitExpenses(updatedExpenses);
//   // };
//   // console.log(splitExpenses, 'bal');

//   const calculateResults = () => {
//     const payers = [];
//     const receivers = [];
//     expenses
//       .filter(item => item.id === ExpenseId)
//       .forEach(expense => {
//         const balance = splitAmount - expense.amount;
//         if (balance > 0) {
//           receivers.push({name: expense.name, amount: balance});
//         } else if (balance < 0) {
//           payers.push({name: expense.name, amount: -balance});
//         }
//       });

//     const result = [];
//     payers.forEach(payer => {
//       receivers.forEach(receiver => {
//         if (payer.amount > 0 && receiver.amount > 0) {
//           const amount = Math.min(payer.amount, receiver.amount);
//           result.push(
//             `${payer.name} has to give Rs.${amount.toFixed(2)} to ${
//               receiver.name
//             }`,
//           );
//           payer.amount -= amount;
//           receiver.amount -= amount;
//         }
//       });
//     });

//     setResults(result);
//   };

//   useEffect(() => {
//     calculateResults();
//   }, [expenses]);
//   console.log(items, 'hjgjngnnngjg');
//   //   console.log(
//   //     expenses.filter(item => item.id === ExpenseId),
//   //     'mano',
//   //   );

//   const updateName = (index, text) => {
//     const newItems = [...expenses];
//     newItems[index].name = text;
//     setItems(newItems);
//   };
//   const getdata = (name, text, balance) => {
//     // const namedata = expenses
//     //   .filter(item => item.id === ExpenseId)
//     //   .map(item => item.name);
//     console.log({name: name ? name : text, balance}, 'mano');
//   };

//   const renderItem = ({item, index}) => (
//     <View style={styles.row}>
//       <TextInput
//         style={styles.input}
//         value={item.name}
//         onChangeText={text =>
//           // updateName(index, text, splitAmount - item.amount)
//           getdata(item.name, text, splitAmount)
//         }
//         placeholder="Enter name"
//         editable={item.isNew}
//       />
//       <TextInput
//         style={styles.input}
//         value={
//           item.isNew ? splitAmount : (splitAmount - item.amount).toString()
//         }
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         value={item.isNew ? '0' : item.amount.toString()}
//         editable={false}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Split the Expenses</Text>
//       <View style={styles.splitContainer}>
//         <View
//           style={{
//             flexDirection: 'row',
//             padding: 10,
//             justifyContent: 'space-between',
//           }}>
//           <Text style={{color: 'black'}}>{expenseinfo}</Text>
//           <Text style={{color: 'black'}}>Split Amount: {splitAmount}</Text>
//         </View>
//         <View style={{height: '30%'}}>
//           <FlatList
//             data={expenses.filter(item => item.id === ExpenseId)}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             contentContainerStyle={{padding: 10}}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             padding: 10,
//           }}>
//           <TouchableOpacity onPress={removeNewRow}>
//             <Icon name="minuscircle" type="antdesign" color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={addNewRow}>
//             <Icon name="pluscircle" type="antdesign" color="black" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.totalContainer}>
//           <Text style={styles.totalText}>Total: {totalAmount}</Text>
//           <TouchableOpacity
//             style={{padding: 15, backgroundColor: '#5d5bd4', borderRadius: 25}}>
//             <Text style={{color: 'white'}}>Split Request</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           onPress={calculateResults}
//           style={{
//             padding: 15,
//             backgroundColor: '#5d5bd4',
//             borderRadius: 25,
//             width: 100,
//             alignItems: 'center',
//             marginLeft: 10,
//           }}>
//           <Text style={{color: 'white'}}>Split</Text>
//         </TouchableOpacity>

//         <View style={{padding: 10}}>
//           {results.map((result, index) => (
//             <Text key={index} style={styles.resultText}>
//               {result}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black',
//   },
//   splitContainer: {
//     backgroundColor: '#d4d4ff',
//     borderRadius: 10,
//     height: '70%',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'white',
//     marginRight: 10,
//     borderRadius: 5,
//     color: 'black',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 20,
//     padding: 20,
//     backgroundColor: '#898ef9',
//     width: '100%',
//     borderBottomEndRadius: 20,
//     borderBottomStartRadius: 20,
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 16,
//     marginTop: 10,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default SplitExpenseScreen;


// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   StyleSheet,
// // } from 'react-native';
// // import {Icon} from 'react-native-elements';

// // const SplitExpenseScreen = ({route}) => {
// //   const {ExpenseId, expenseinfo, expenseData} = route.params;
// //   const [expenses, setExpenses] = useState(expenseData);
// //   const [results, setResults] = useState([]);

// //   const totalAmount = expenseData
// //     .filter(item => item.id === ExpenseId)
// //     .map(item => item.amount)
// //     .reduce((acc, curr) => {
// //       return acc + curr;
// //     }, 0);

// //   const splitAmount = (
// //     totalAmount / expenses.filter(item => item.id === ExpenseId).length
// //   ).toFixed(0);

// //   const addNewRow = () => {
// //     setExpenses([
// //       ...expenses,
// //       {id: ExpenseId, amount: parseFloat(splitAmount), isNew: true, name: ''},
// //     ]);
// //   };

// //   const removeNewRow = () => {
// //     setExpenses(
// //       expenses.filter(
// //         (expense, index) => index !== expenses.length - 1 || !expense.isNew,
// //       ),
// //     );
// //   };

// //   const updateName = (index, name) => {
// //     const updatedExpenses = expenses.map((expense, i) => {
// //       if (i === index && expense.isNew) {
// //         return {...expense, name};
// //       }
// //       return expense;
// //     });
// //     setExpenses(updatedExpenses);
// //   };

// //   const calculateResults = () => {
// //     const results = expenses
// //       .filter(item => item.id === ExpenseId)
// //       .map(item => {
// //         const balance = item.isNew
// //           ? 0
// //           : (item.amount - splitAmount).toFixed(0);
// //         return {
// //           name: item.name || 'Unnamed',
// //           paid: item.amount,
// //           balance: parseFloat(balance),
// //         };
// //       });
// //     setResults(results);
// //   };

// //   const renderItem = ({item, index}) => (
// //     <View style={styles.row}>
// //       <TextInput
// //         style={styles.input}
// //         value={item.name}
// //         onChangeText={text => updateName(index, text)}
// //         editable={item.isNew}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={item.isNew ? splitAmount : `-${(item.amount - splitAmount).toFixed(0)}`}
// //         editable={false}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={item.amount.toString()}
// //         editable={false}
// //       />
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Split the Expenses</Text>
// //       <View style={styles.splitContainer}>
// //         <View style={styles.headerRow}>
// //           <Text style={{color: 'black'}}>{expenseinfo}</Text>
// //           <Text style={{color: 'black'}}>Split Amount: {splitAmount}</Text>
// //         </View>
// //         <View style={{height: '30%'}}>
// //           <FlatList
// //             data={expenses.filter(item => item.id === ExpenseId)}
// //             renderItem={renderItem}
// //             keyExtractor={(item, index) => index.toString()}
// //             contentContainerStyle={{padding: 10}}
// //           />
// //         </View>
// //         <View style={styles.addButtonRow}>
// //           <TouchableOpacity onPress={removeNewRow}>
// //             <Icon name="minuscircle" type="antdesign" color="black" />
// //           </TouchableOpacity>
// //           <TouchableOpacity onPress={addNewRow}>
// //             <Icon name="pluscircle" type="antdesign" color="black" />
// //           </TouchableOpacity>
// //         </View>
// //         <View style={styles.totalContainer}>
// //           <Text style={styles.totalText}>Total: {totalAmount}</Text>
// //           <TouchableOpacity
// //             style={styles.splitRequestButton}>
// //             <Text style={{color: 'white'}}>Split Request</Text>
// //           </TouchableOpacity>
// //         </View>
// //         <TouchableOpacity
// //           onPress={calculateResults}
// //           style={styles.splitButton}>
// //           <Text style={{color: 'white'}}>Split</Text>
// //         </TouchableOpacity>
// //         <View style={{padding: 10}}>
// //           {results.map((result, index) => (
// //             <Text key={index} style={styles.resultText}>
// //               {result.name} has to give Rs.{result.balance} to others
// //             </Text>
// //           ))}
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#f0f0ff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: '100%',
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //     color: 'black',
// //   },
// //   splitContainer: {
// //     backgroundColor: '#d4d4ff',
// //     borderRadius: 10,
// //     height: '70%',
// //   },
// //   headerRow: {
// //     flexDirection: 'row',
// //     padding: 10,
// //     justifyContent: 'space-between',
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   input: {
// //     flex: 1,
// //     padding: 10,
// //     backgroundColor: 'white',
// //     marginRight: 10,
// //     borderRadius: 5,
// //     color: 'black',
// //   },
// //   addButtonRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     padding: 10,
// //   },
// //   totalContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginVertical: 20,
// //     padding: 20,
// //     backgroundColor: '#898ef9',
// //     width: '100%',
// //     borderBottomEndRadius: 20,
// //     borderBottomStartRadius: 20,
// //   },
// //   totalText: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   splitRequestButton: {
// //     padding: 15,
// //     backgroundColor: '#5d5bd4',
// //     borderRadius: 25,
// //   },
// //   splitButton: {
// //     padding: 15,
// //     backgroundColor: '#5d5bd4',
// //     borderRadius: 25,
// //     width: 100,
// //     alignItems: 'center',
// //     marginLeft: 10,
// //   },
// //   resultText: {
// //     fontSize: 16,
// //     marginTop: 10,
// //     fontWeight: 'bold',
// //     color: 'black',
// //   },
// // });

// // export default SplitExpenseScreen;

{/* <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() =>
          ListModel.setModalVisible(!ListModel.modalVisible)
        }
        visible={ListModel.modalVisible}>
        <View style={ListStyle.centeredView}>
          <View style={ListStyle.modalView}>
            <Text style={ListStyle.modalText}>Choose your Mode</Text>
            <TouchableOpacity
              style={[
                ListStyle.button,
                ListStyle.buttonClose,
                {marginBottom: 5},
              ]}
              onPress={() => ListModel.viewModal('voice')}>
              <Text style={ListStyle.textStyle}>Voice Mode</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[ListStyle.button, ListStyle.buttonClose]}
              onPress={() => ListModel.viewModal('gesture')}>
              <Text style={ListStyle.textStyle}>Gesture Mode</Text>
            </TouchableOpacity> */}
    //       </View>
    //     </View>
    //   </Modal> */}