// CustomTextWithTooltip.js
import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

// Utility function to shorten the text
const shortenText = (text, maxWords) => {
  const words = text.split('');
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(' ') + '...';
};

const CustomTextWithTooltip = ({text, maxWords}) => {
  const [visible, setVisible] = useState(false);
  const shortText = shortenText(text, maxWords);


  return (
    <View>
      <TouchableOpacity
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}>
        <Text style={styles.shortText}>{shortText}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.tooltip}>
            <Text style={{color: 'black'}}>{text}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  shortText: {
    width: 300, // Adjust the width as needed
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
});

export default CustomTextWithTooltip;