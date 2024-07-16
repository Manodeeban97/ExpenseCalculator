import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import ListViewModel from '../../ViewModel/screen/ListViewModel';
import {ListStyle} from '../StyleSheet/ListStyles';

const ListScreen = () => {
  const ListModel = ListViewModel();

  return (
    <View style={ListStyle.container} data-testid="listscreen">
      <View style={{height: '20%', width: '100%',padding:10}}>
        <Text style={{color: 'black'}}>Welcome to your</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{color: '#c4cfff', fontSize: 30}}>Dash</Text>
          <Text style={{color: 'lightgray',fontSize: 30}}>Board</Text>
        </View>
      </View>
      <FlatList
        style={{width: '100%', height: '80%'}}
        data={ListModel.listItemData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={ListStyle.listView}>
            <Text style={{color: 'black'}}>Title: {item.title}</Text>
            <Text style={{color: 'black'}}>Date: {item.date}</Text>
            <Text style={{color: 'black'}}>Amount: {item.amount}</Text>
          </View>
        )}
      />

      <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          accessibilityLabel="Add Title Button"
          accessible={true}
          onPress={() => ListModel.setModalVisible(!ListModel.modalVisible)}
          testID="addTitleButton"
          style={ListStyle.addTitleBtn}>
          <Icon name="squared-plus" type="entypo" color="white" />
          <Text style={{padding: 10, color: 'white'}}>Add Title</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ListModel.modalVisible}>
        <View style={ListStyle.centeredView}>
          <View style={ListStyle.modalView}>
            <Text style={ListStyle.modalText}>Choose your Mode</Text>
            <TouchableOpacity
              style={[
                ListStyle.button,
                ListStyle.buttonClose,
                {marginBottom: 5},
              ]}
              onPress={() => ListModel.viewModal('voice')}>
              <Text style={ListStyle.textStyle}>Voice Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ListStyle.button, ListStyle.buttonClose]}
              onPress={() => ListModel.viewModal('gesture')}>
              <Text style={ListStyle.textStyle}>Gesture Mode</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListScreen;

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     height: '100%',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   actionContainer: {},
//   listView: {
//     padding: 10,
//     width: '100%',
//     borderRadius: 15,
//     marginBottom: 10,
//     backgroundColor: '#c4cfff',
//     color: 'black',
//   },
//   ButtomCtn: {
//     padding: 10,
//     borderRadius: 25,
//   },
//   navigationContainer: {
//     backgroundColor: 'red',
//   },
//   paragraph: {
//     padding: 16,
//     fontSize: 15,
//     textAlign: 'center',
//   },
//   drawcontainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     width: 150,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#5d5bd4',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     fontSize: 20,
//     // fontWeight: 10,
//     textAlign: 'center',
//     color: 'black',
//   },
// });
