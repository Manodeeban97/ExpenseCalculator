import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SplitExpenseScreen from '../../src/View/screen/SplitExpenseScreen';
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

jest.mock('@tensorflow/tfjs-react-native', () => {
  return {
    ...jest.requireActual('@tensorflow/tfjs-react-native'),
    cameraWithTensors: () => ({
      TensorCamera: jest.fn(),
    }),
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

const mockRoute = {
    params: {
      id: '1223',
      data: 'some-data',
    },
  };

describe('ListScreen', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });
  it('it renders correctly listscreen', () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
    const {getByText} = render(<SplitExpenseScreen route={mockRoute}/>);
    expect(getByText('Split the Expenses')).toBeTruthy();
    expect(getByText('Split Request')).toBeTruthy();
    expect(getByText('Split')).toBeTruthy();
  });
});
