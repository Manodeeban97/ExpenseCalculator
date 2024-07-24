import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const SplitExpenseViewModel = () => {
  const [results, setResults] = useState([]);
  const [expenseId, setExpenseId] = useState('');
  const [expenseDataSource, setExpenseDataSource] = useState([]);
  const [expenses, setExpenses] = useState(expenseDataSource);

  //   console.log(expenseId,expenses,ExpenseData,"fjhfjf")

  const totalAmount = expenses
    .filter(item => item.id === expenseId)
    .map(item => item.amount)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  const splitAmount = (
    totalAmount / expenseDataSource.filter(item => item.id === expenseId).length
  ).toFixed(0);

  const fetchExpenses = async () => {
    const existingExpenses = await AsyncStorage.getItem('expenses');
    let expenses = JSON.parse(existingExpenses) || [];
    setExpenseDataSource(expenses);
    setExpenses(expenses);
  };

  const addNewRow = () => {
    setExpenseDataSource([
      ...expenseDataSource,
      {id: expenseId, amount: parseFloat(splitAmount), isNew: true},
    ]);
  };

  // Function to remove the last added row
  const removeNewRow = () => {
    setExpenseDataSource(
      expenseDataSource.filter(
        (expense, index) =>
          index !== expenseDataSource.length - 1 || !expense.isNew,
      ),
    );
  };

  const updateName = (index, name) => {
    const updatedExpenses = expenseDataSource
      .filter(item => item.id === expenseId)
      .map((expense, i) => {
        if (i === index && expense.isNew) {
          return {...expense, name};
        }
        return expense;
      });
    setExpenseDataSource(updatedExpenses);
  };

  // console.log(expenses, 'jdjjfjffhf');
  const expenseresults = expenseDataSource
    .filter(item => item.id === expenseId)
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

  const calculateResults = () => {
    const paidUser = expenseresults.filter(item => item.paid > 0);
    const unpaidUser = expenseresults.filter(item => item.paid === 0);
    const messages = [];

    if (paidUser.length === unpaidUser.length) {
      for (let i = 0; i < unpaidUser.length; i++) {
        messages.push(
          `${unpaidUser[i].name} has to pay ${unpaidUser[i].balance} to ${paidUser[i].name}`,
        );
      }
    } else if (unpaidUser.length % 2 !== 0) {
      if (unpaidUser.length > 1) {
        for (let i = 0; i < unpaidUser.length - 1; i++) {
          messages.push(
            `${unpaidUser[i].name} has to pay ${unpaidUser[i].balance} to ${
              paidUser[i % paidUser.length].name
            }`,
          );
        }
        let lastUser = unpaidUser[unpaidUser.length - 1];
        paidUser.forEach(paid => {
          messages.push(
            `${lastUser.name} has to pay ${
              lastUser.balance / paidUser.length
            } to ${paid.name}`,
          );
        });
      } else {
        let lastUser = unpaidUser[unpaidUser.length - 1];
        paidUser.forEach(paid => {
          messages.push(
            `${lastUser.name} has to pay ${
              lastUser.balance / paidUser.length
            } to ${paid.name}`,
          );
        });
      }
    } else {
      for (let i = 0; i < unpaidUser.length; i++) {
        messages.push(
          `${unpaidUser[i].name} has to pay ${unpaidUser[i].balance} to ${
            paidUser[i % paidUser.length].name
          }`,
        );
      }
    }

    setResults(messages);
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
        ${expenseresults
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
  return {
    addNewRow,
    removeNewRow,
    updateName,
    calculateResults,
    generatePDF,
    setExpenseId,
    fetchExpenses,
    expenseDataSource,
    totalAmount,
    splitAmount,
    expenses,
    results,
    expenseId,
  };
};

export default SplitExpenseViewModel;
