import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import ListScreen from '../../src/View/screen/ListScreen';

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
jest.mock('@tensorflow/tfjs-react-native', () => {
  return {
    ...jest.requireActual('@tensorflow/tfjs-react-native'),
    cameraWithTensors:() => ({
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
  it('it renders correctly listscreen', () => {
    const {getByText} = render(<ListScreen />);
    expect(getByText('Welcome to your')).toBeTruthy();
    expect(getByText('Add Title')).toBeTruthy();
  });
  it('triggering the AddTitle Button', async () => {
    const {getByTestId, getByText} = render(<ListScreen />);
    const button = getByTestId('addTitleButton');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(getByText('Voice Mode')).toBeTruthy();
    expect(getByText('Gesture Mode')).toBeTruthy();
  });
  it('triggering the Voice Mode Button', async () => {
    const navigate= jest.fn();
    const {getByTestId, getByText} = render(<ListScreen />);
    const button = getByTestId('addTitleButton');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(getByText('Voice Mode')).toBeTruthy();
    expect(getByText('Gesture Mode')).toBeTruthy();
    const Voicebutton = getByText('Voice Mode');
    fireEvent.press(Voicebutton);
  });
});
