import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AddPaymentComponent from '../../src/View/components/AddPaymentComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('react-native-elements', () => {
  return {
    Icon: () => 'Mocked Icon',
  };
});
jest.mock('react-redux', () => {
  return {
    useSelector: () => jest.fn(),
  };
});
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  };
});

jest.mock('react-native-fs', () => {
  return {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
jest.mock('@react-native-voice/voice', () => {
  return {
    onSpeechStart: jest.fn(),
    onSpeechRecognized: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechResults: jest.fn(),
    onSpeechPartialResults: jest.fn(),
    onSpeechVolumeChanged: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    destroy: jest.fn(),
  };
});
jest.mock('react-native-share', () => {
  return {
    open: jest.fn(),
    shareSingle: jest.fn(),
    isPackageInstalled: jest.fn(),
    Social: {
      FACEBOOK: 'facebook',
      TWITTER: 'twitter',
      WHATSAPP: 'whatsapp',
      INSTAGRAM: 'instagram',
      GOOGLEPLUS: 'googleplus',
      EMAIL: 'email',
      PINTEREST: 'pinterest',
      LINKEDIN: 'linkedin',
      SMS: 'sms',
    },
  };
});

describe('AddPaymentComponent', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });
  const mockRoute = {
    params: {
      id: '1223',
      data: 'some-data',
    },
  };
  it('it renders correctly AddPaymentComponent', () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
    const {getByText, getByPlaceholderText} = render(
      <AddPaymentComponent route={mockRoute} />,
    );
    expect(getByText('demo')).toBeTruthy();
    expect(getByText('Paid Expense')).toBeTruthy();
    expect(getByText('Add New Payment')).toBeTruthy();
    expect(getByPlaceholderText('Please Add the Expense Info')).toBeTruthy();
    expect(getByPlaceholderText('Enter The Expense Amount')).toBeTruthy();
    expect(getByPlaceholderText('Enter the Name')).toBeTruthy();
    expect(getByText('Select Any Category')).toBeTruthy();
    expect(getByText('Attach file')).toBeTruthy();
    expect(getByText('Split Expense')).toBeTruthy();
    expect(getByText('Pay Now')).toBeTruthy();
  });
  it('Add new Expenses', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
    const {getByText, getByPlaceholderText} = render(
      <AddPaymentComponent route={mockRoute} />,
    );

    const ExpenseInput = getByPlaceholderText('Please Add the Expense Info');
    expect(ExpenseInput).toBeTruthy();
    const AmountInput = getByPlaceholderText('Enter The Expense Amount');
    expect(AmountInput).toBeTruthy();
    const NameInput = getByPlaceholderText('Enter the Name');
    expect(NameInput).toBeTruthy();
    const Select = getByText('Select Any Category');
    expect(Select).toBeTruthy();
    expect(getByText('Attach file')).toBeTruthy();
    const SplitExpenseBtn = getByText('Split Expense');
    expect(SplitExpenseBtn).toBeTruthy();
    const PaynowBtn = getByText('Pay Now');
    expect(PaynowBtn).toBeTruthy();
    fireEvent.changeText(ExpenseInput, 'Test Expense Info');
    fireEvent.changeText(AmountInput, '123.45');
    fireEvent.changeText(NameInput, 'Test Name');
    fireEvent.press(Select);
    const Miscellaneous = getByText('Miscellaneous');
    expect(Miscellaneous).toBeTruthy();
    expect(ExpenseInput.props.value).toBe('Test Expense Info');
    expect(AmountInput.props.value).toBe('123.45');
    expect(NameInput.props.value).toBe('Test Name');
    fireEvent.press(Miscellaneous);
    expect(Select.props.children).toBe('Miscellaneous');
    await waitFor(() => {
      fireEvent.press(PaynowBtn);
    });
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{id: 'some-id', status: 'paid'}]),
    );

    // Simulate the time interval needed for the state update
    jest.advanceTimersByTime(5000); // Adjust the time interval as needed

    // Use waitFor to ensure the assertion happens after the state update
    await waitFor(() => {
      expect(getByText('paid by')).toBeTruthy();
    });

    jest.useRealTimers();
  });
});
