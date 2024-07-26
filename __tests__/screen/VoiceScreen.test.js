import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
// import GestureModal from '../../src/View/components/GestureModal';
import VoiceScreen from '../../src/View/screen/VoiceScreen';

jest.mock('react-native-elements', () => {
  return {
    Icon: () => 'Mocked Icon',
  };
});
jest.mock('react-redux', () => {
  return {
    useDispatch: () => jest.fn(),
    useSelector: () => jest.fn(),
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

const mockStart = jest.fn();
const onSpeechRecognized = jest.fn();
const mockOnSpeechResults = jest.fn();
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
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    AsyncStorage: () => jest.fn(),
  };
});

jest.mock('react-native-vision-camera', () => ({
  Camera: jest.fn(),
  useCameraPermission: jest.fn(() => ({
    hasPermission: true,
  })),
  getCameraDevice: jest.fn(),
  useCameraDevice: jest.fn(() => ({
    devices: {
      back: {id: 'back', name: 'Back Camera'},
      front: {id: 'front', name: 'Front Camera'},
    },
    selected: 'back',
  })),
}));

describe('VoiceScreen', () => {
  it('it renders correctly VoiceScreen', () => {
    const {getByText} = render(<VoiceScreen />);
    expect(getByText('Create New Expenses')).toBeTruthy();
    expect(getByText('Enter Expence Type')).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();
    expect(getByText('Add Expense')).toBeTruthy();
  });
  it('it renders render MicButton action', async () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <VoiceScreen />,
    );
    const input = getByPlaceholderText('Enter Expence Type');
    expect(input).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();
    const AddEXpenseButton = getByText('Add Expense');
    expect(AddEXpenseButton).toBeTruthy();
    const MicButton = getByTestId('MicButton');
    expect(MicButton).toBeTruthy();
    // const status = getByTestId('status');
    // const title = getByTestId('title0');
    // expect(status.props.children).toBe('');
    // expect(title.props.children).toBe('Add Title');
    // fireEvent.press(MicButton);
    // await waitFor(() => {
    //   expect(status.props.children).toBe('lisenting...');
    // });
    // onSpeechRecognized.mockImplementationOnce(({value}) => {
    //   value(['test speech input']);
    // });
    // await waitFor(() => {
    //   expect(input.props.value).toBe('mano');
    // });

    // mockOnSpeechResults.mockImplementationOnce(({value}) => {
    //   value(['test speech input']);
    // });
    // const checkButton = getByTestId('checkBtn0');
    // expect(checkButton).toBeTruthy();
    // fireEvent.press(checkButton);
    // await waitFor(() => {
    //   expect(title.props.children).toBe('lisenting...');
    //   // expect(getByText('test speech input')).toBeTruthy();
    // });
  });
});
