import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import SplitExpenseViewModel from '../../ViewModel/screen/SplitExpenseViewModel';
import {SplitExpenseStyles} from '../StyleSheet/SplitExpenseStyles';

const SplitExpenseScreen = ({route}) => {
  const {ExpenseId, expenseinfo} = route.params;
  const SplitEXpenseModel = SplitExpenseViewModel();

  useEffect(() => {
    SplitEXpenseModel.setExpenseId(ExpenseId);
    SplitEXpenseModel.fetchExpenses();
  }, []);

  const renderItem = ({item, index}) => (
    <View style={SplitExpenseStyles.row}>
      <TextInput
        style={SplitExpenseStyles.input}
        value={item.name}
        onChangeText={text => SplitEXpenseModel.updateName(index, text)}
        editable={item.isNew}
      />
      <TextInput
        style={SplitExpenseStyles.input}
        value={
          item.isNew
            ? SplitEXpenseModel.splitAmount
            : `-${item.amount - SplitEXpenseModel.splitAmount}`
        }
        editable={false}
      />
      <TextInput
        style={SplitExpenseStyles.input}
        value={item.isNew ? '0' : item.amount.toString()}
        editable={false}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-300}>
      <View style={SplitExpenseStyles.container}>
        <Text style={SplitExpenseStyles.header}>Split the Expenses</Text>
        <View style={SplitExpenseStyles.splitContainer}>
          <View style={SplitExpenseStyles.splitAmountcontainer}>
            <Text style={{color: 'black'}}>{expenseinfo}</Text>
            <Text style={{color: 'black'}}>
              Split Amount: {SplitEXpenseModel.splitAmount}
            </Text>
          </View>
          <View style={{height: '30%'}}>
            <FlatList
              data={SplitEXpenseModel.expenseDataSource.filter(
                item => item.id === ExpenseId,
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{padding: 10}}
            />
          </View>
          <View style={SplitExpenseStyles.addremovecontainer}>
            <TouchableOpacity onPress={SplitEXpenseModel.removeNewRow}>
              <Icon name="minuscircle" type="antdesign" color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={SplitEXpenseModel.addNewRow}>
              <Icon name="pluscircle" type="antdesign" color="black" />
            </TouchableOpacity>
          </View>
          <View style={SplitExpenseStyles.totalContainer}>
            <Text style={SplitExpenseStyles.totalText}>
              Total: {SplitEXpenseModel.totalAmount}
            </Text>
            <TouchableOpacity
              onPress={SplitEXpenseModel.generatePDF}
              style={SplitExpenseStyles.splitrequest}>
              <Text style={{color: 'white'}}>Split Request</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={SplitEXpenseModel.calculateResults}
            style={SplitExpenseStyles.splitButton}>
            <Text style={{color: 'white'}}>Split</Text>
          </TouchableOpacity>

          <View style={{padding: 10}}>
            {SplitEXpenseModel.results.map((message, index) => (
              <Text style={{color: 'black'}} key={index}>
                {message}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SplitExpenseScreen;
