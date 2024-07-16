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
const mockStop = jest.fn();
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
    expect(getByText('Add Title')).toBeTruthy();
    expect(getByText('Add Date')).toBeTruthy();
    expect(getByText('Add Location')).toBeTruthy();
  });
  it('it renders render MicButton action', async () => {
    const {getByText, getByTestId} = render(<VoiceScreen />);
    expect(getByText('Add Title')).toBeTruthy();
    expect(getByText('Add Date')).toBeTruthy();
    expect(getByText('Add Location')).toBeTruthy();
    const MicButton = getByTestId('MicButton');
    expect(MicButton).toBeTruthy();
    const status = getByTestId('status');
    const title = getByTestId('title0');
    expect(status.props.children).toBe('');
    expect(title.props.children).toBe('Add Title');
    fireEvent.press(MicButton);
    await waitFor(() => {
      expect(status.props.children).toBe('lisenting...');
    });
    mockOnSpeechResults.mockImplementationOnce((event) => {
      event.value = ['test speech input'];
    });
    
    // mockOnSpeechResults.mockImplementationOnce(({value}) => {
    //   value(['test speech input']);
    // });
    const checkButton = getByTestId('checkBtn0');
    expect(checkButton).toBeTruthy();
    fireEvent.press(checkButton);
    // await waitFor(() => {
    //   expect(title.props.children).toBe('lisenting...');
    //   // expect(getByText('test speech input')).toBeTruthy();
    // });
  });
});
