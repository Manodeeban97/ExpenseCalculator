import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import ListScreen from '../../src/View/screen/ListScreen';
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

describe('ListScreen', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });
  it('it renders correctly listscreen', () => {
    const {getByText} = render(<ListScreen />);
    expect(getByText('Welcome to your')).toBeTruthy();
    expect(getByText('Add Title')).toBeTruthy();
  });
  it('triggering the AddTitle Button', async () => {
    const {getByTestId, getByText} = render(<ListScreen />);
    const button = getByTestId('addTitleButton');
    expect(button).toBeTruthy();
  });
});
