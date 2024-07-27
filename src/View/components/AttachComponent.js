import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomTextWithTooltip from './CustomTextWithTooltip';

const PhotoPicker = ({
  buttonTitle = 'Pick a Photo',
  imageStyle = {},
  textStyle = {},
  onPhotoPicked,
}) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoPicked = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const selectedPhoto = response.assets[0];
      setPhoto(selectedPhoto);
      if (onPhotoPicked) {
        onPhotoPicked(selectedPhoto);
      }
    }
  };

  const pickImage = () => {
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, handlePhotoPicked);
  };

  const takePhoto = () => {
    const options = {mediaType: 'photo'};
    launchCamera(options, handlePhotoPicked);
  };

  const showPickerOptions = () => {
    Alert.alert(
      'Select an Option',
      'Choose to either take a photo or pick one from your library',
      [
        {text: 'Take Photo', onPress: takePhoto},
        {text: 'Pick from Library', onPress: pickImage},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.attachButton}>
        <Text style={[styles.text, {color: 'black'}]}>
          {photo?.fileName ? (
            <CustomTextWithTooltip text={photo?.fileName} maxWords={9} />
          ) : (
            'Attach file'
          )}
        </Text>
        <Icon
          name="attach-file"
          type="materialIcons"
          size={20}
          onPress={showPickerOptions}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
  attachButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:"100%"
  },
});

export default PhotoPicker;
