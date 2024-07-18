// // import React from 'react';
// // import { View, Button, Image, Text } from 'react-native';
// // import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// // const PhotoPicker = () => {
// //   const [photo, setPhoto] = React.useState(null);

// //   const pickImage = () => {
// //     const options = {
// //       mediaType: 'photo',
// //     };

// //     launchImageLibrary(options, (response) => {
// //       if (response.didCancel) {
// //         console.log('User cancelled image picker');
// //       } else if (response.errorCode) {
// //         console.log('ImagePicker Error: ', response.errorMessage);
// //       } else {
// //         setPhoto(response.assets[0]);
// //       }
// //     });
// //   };

// //   return (
// //     <View>
// //       <Button title="Pick a Photo" onPress={pickImage} />
// //       {photo && (
// //         <>
// //           <Image
// //             source={{ uri: photo.uri }}
// //             style={{ width: 100, height: 100 }}
// //           />
// //           <Text>{photo.fileName}</Text>
// //         </>
// //       )}
// //     </View>
// //   );
// // };

// // export default PhotoPicker;

// import React, {useState} from 'react';
// import {
//   View,
//   Button,
//   Image,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {Icon} from 'react-native-elements';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const AttachComponent = ({
//   buttonTitle = 'Pick a Photo',
//   imageStyle = {},
//   textStyle = {},
//   onPhotoPicked,
// }) => {
//   const [photo, setPhoto] = useState(null);

//   const pickImage = () => {
//     const options = {
//       mediaType: 'photo',
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         const selectedPhoto = response.assets[0];
//         setPhoto(selectedPhoto);
//         if (onPhotoPicked) {
//           onPhotoPicked(selectedPhoto);
//         }
//       }
//     });
//     launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         const selectedPhoto = response.assets[0];
//         setPhoto(selectedPhoto);
//         if (onPhotoPicked) {
//           onPhotoPicked(selectedPhoto);
//         }
//       }
//     });
//   };

//   return (
//     <View>
//       <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
//         <Text style={[styles.text, {color: 'black'}]}>Attach file</Text>
//         <Icon name="attach-file" type="materialIcons" size={20} />
//       </TouchableOpacity>
//       {/* <Button title={buttonTitle} onPress={pickImage} /> */}
//       {photo && (
//         <>
//           {/* <Image
//             source={{ uri: photo.uri }}
//             style={[styles.image, imageStyle]}
//           /> */}
//           <Text style={[styles.text, textStyle]}>{photo.fileName}</Text>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 100,
//     height: 100,
//     marginVertical: 10,
//   },
//   text: {
//     textAlign: 'center',
//   },
//   attachButton:{
//     flexDirection:"row",
//     gap:200
//   }
// });

// export default AttachComponent;

import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
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
      <TouchableOpacity style={styles.attachButton} onPress={showPickerOptions}>
        <Text style={[styles.text, {color: 'black'}]}>
          {photo?.fileName ? (
            <CustomTextWithTooltip text={photo?.fileName} maxWords={1} />
          ) : (
            'Attach file'
          )}
        </Text>
        <Icon name="attach-file" type="materialIcons" size={20} />
      </TouchableOpacity>
      {/* <Button title={buttonTitle} onPress={showPickerOptions} /> */}
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
    gap: 200,
  },
});

export default PhotoPicker;
