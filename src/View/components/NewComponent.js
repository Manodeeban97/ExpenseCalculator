// const handleAdd = async () => {
//     if (title && date) {
//       const newItem = { title, date, amount: 0 };

//       try {
//         // Get the existing list from AsyncStorage
//         const existingList = await AsyncStorage.getItem('list');
//         let list = JSON.parse(existingList) || [];

//         // Add the new item to the list
//         list.push(newItem);

//         // Save the updated list back to AsyncStorage
//         await AsyncStorage.setItem('list', JSON.stringify(list));

//         // Navigate to the ListScreen
//         navigation.navigate('ListScreen');
//       } catch (error) {
//         console.error('Error saving data', error);
//       }
//     }
//   };




//   const handlePay = async () => {
//     if (expenseinfo && category && name && expAmount) {
//       const amount = parseInt(expAmount);
//       const newExpense = { id: Date.now().toString(), expenseinfo, category, name, amount, attachment };

//       try {
//         // Get the existing expenses from AsyncStorage
//         const existingExpenses = await AsyncStorage.getItem('expenses');
//         let expenses = JSON.parse(existingExpenses) || [];

//         // Add the new expense to the list
//         expenses.push(newExpense);

//         // Save the updated expenses list back to AsyncStorage
//         await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

//         // Navigate to the ListScreen
//         navigation.navigate('ListScreen');

//         // Reset form fields
//         setExpenseinfo('');
//         setCategory('');
//         setAttachment({});
//         setExpAmount('');
//         setName('');
//       } catch (error) {
//         console.error('Error saving data', error);
//       }
//     }
//     initialiseVoice();
//   };


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, FlatList, Image } from 'react-native';

// const expenses = [
//   {
//     amount: 200,
//     attachment: {
//       fileName: "1000109280.jpg",
//       fileSize: 90196,
//       height: 2208,
//       originalPath: "/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000109280.jpg",
//       type: "image/jpeg",
//       uri: "file:///data/user/0/com.task1/cache/rn_image_picker_lib_temp_c1588597-fded-49cc-bc1c-217b3785bac6.jpg",
//       width: 1080
//     },
//     category: "Miscellaneous",
//     expenseinfo: "movie time",
//     id: 0.5567422026544598,
//     name: "Raja"
//   },
//   {
//     amount: 300,
//     attachment: {
//       fileName: "1000109280.jpg",
//       fileSize: 90196,
//       height: 2208,
//       originalPath: "/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000109280.jpg",
//       type: "image/jpeg",
//       uri: "file:///data/user/0/com.task1/cache/rn_image_picker_lib_temp_386d849a-5f39-4060-ace3-a7d247df515a.jpg",
//       width: 1080
//     },
//     category: "Food & Beverages",
//     expenseinfo: "snacks",
//     id: 0.5567422026544598,
//     name: "Rahul"
//   }
// ];

// const ExpenseSplitter = () => {
//   const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const splitAmount = (totalAmount / expenses.length).toFixed(2);

//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       <TextInput style={styles.input} value={item.name} editable={false} />
//       <TextInput style={styles.input} value={item.amount.toString()} editable={false} />
//       <Image source={{ uri: item.attachment.uri }} style={styles.image} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Split the Expenses</Text>
//       <FlatList
//         data={expenses}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.splitContainer}
//       />
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>Total: {totalAmount}</Text>
//         <Button title="Split Request" onPress={() => {}} />
//       </View>
//       <Button title="Split" onPress={() => {}} style={styles.splitButton} />
//       <Text style={styles.resultText}>
//         Balaji has to give Rs.166.67 to Raja
//       </Text>
//       <Text style={styles.resultText}>
//         Balaji has to give Rs.166.66 to Mano
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0ff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   splitContainer: {
//     backgroundColor: '#d4d4ff',
//     padding: 10,
//     borderRadius: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   splitButton: {
//     marginVertical: 10,
//   },
//   resultText: {
//     fontSize: 16,
//     marginTop: 10,
//   },
// });

// export default ExpenseSplitter;



// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import {Icon} from 'react-native-elements';

// const SplitExpenseScreen = ({route}) => {
//   const {expenseinfo, expenseData} = route.params;
  
//   // Initialize state with the passed expenseData
//   const [expenses, setExpenses] = useState(expenseData);

//   const totalAmount = expenses
//     .map(item => item.amount)
//     .reduce((acc, curr) => {
//       return acc + curr;
//     }, 0);

//   const splitAmount = (totalAmount / expenses.length).toFixed(2);

//   const addNewExpense = () => {
//     setExpenses([
//       ...expenses,
//       { id: Math.random(), name: '', amount: parseFloat(splitAmount) }
//     ]);
//   };

//   const handleNameChange = (index, name) => {
//     const updatedExpenses = [...expenses];
//     updatedExpenses[index].name = name;
//     setExpenses(updatedExpenses);
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={styles.row}>
//       <TextInput
//         style={styles.input}
//         value={item.name}
//         onChangeText={(text) => handleNameChange(index, text)}
//       />
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
//             data={expenses}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             contentContainerStyle={{height: '100%', padding: 10}}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             padding: 10,
//           }}>
//           <TouchableOpacity onPress={addNewExpense}>
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
//           <Text style={styles.resultText}>
//             Balaji has to give Rs.166.67 to Raja
//           </Text>
//           <Text style={styles.resultText}>
//             Balaji has to give Rs.166.66 to Mano
//           </Text>
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
//   splitButton: {
//     marginVertical: 10,
//   },
//   resultText: {
//     fontSize: 16,
//     marginTop: 10,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default SplitExpenseScreen;
