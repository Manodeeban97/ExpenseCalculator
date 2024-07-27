import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';

const CustomSelect = ({data, onSelect, defaultText}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = item => {
    setSelectedItem(item);
    setModalVisible(false);
    onSelect(item);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {selectedItem ? selectedItem.label : defaultText}
        </Text>
        <Icon name="chevron-small-down" type="entypo" size={20} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <FlatList
              style={{height: 150}}
              data={data}
              keyExtractor={item => item.value.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectButtonText: {
    color: 'black',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    padding: 15,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default CustomSelect;
