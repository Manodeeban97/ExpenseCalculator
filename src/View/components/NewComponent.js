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