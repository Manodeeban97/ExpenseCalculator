import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import ListViewModel from '../../ViewModel/screen/ListViewModel';
import {ListStyle} from '../StyleSheet/ListStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {UpDateList} from '../../Redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = () => {
  const ListModel = ListViewModel();
  const navigation = useNavigation();
  const ExpData = useSelector(state => state.expData);
  const [listData, setListData] = useState([]);
  const [explistData, setExpListData] = useState([]);
  const [matchId, setMatchId] = useState('');
  const dispatch = useDispatch();

  const handleItemPress = item => {
    // console.log(item, 'insideState');
    setMatchId(item.id);
    navigation.navigate('AddPaymentScreen', {id: item.id, data: item});
  };

  // const handleUpdate = () => {
  //   const data = explistData
  //     ?.filter(item => item.id === matchId)
  //     .map(item => item.amount)
  //     .reduce((acc, curr) => {
  //       return acc + curr;
  //     }, 0);
  //   console.log(data, 'newdata');
  //   dispatch(UpDateList(matchId, data));
  // };
  const handleUpdate = async id => {
    try {
      // Fetch the existing list from local storage
      const listString = await AsyncStorage.getItem('list');
      const list = listString ? JSON.parse(listString) : [];

      // Calculate the new data
      const data = explistData
        ?.filter(item => item.id === id)
        .map(item => item.amount)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      // Update the item with the matching matchId in the list
      const updatedList = list.map(item => {
        if (item.id === id) {
          return {...item, amount: data};
        }
        return item;
      });

      // Save the updated list back to local storage
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));

      // Dispatch the update (assuming UpDateList is your action creator)
      // dispatch(UpDateList(matchId, data));
    } catch (error) {
      console.log('Error updating list in local storage: ', error);
    }
  };

  // const handleUpdate = id => {
  //   const data = ExpData?.filter(item => item.id === id)
  //     .map(item => item.amount)
  //     .reduce((acc, curr) => {
  //       return acc + curr;
  //     }, 0);
  //   dispatch(UpDateList(id, data));
  // };
  useEffect(() => {
    if (explistData) {
      handleUpdate(matchId);
    }
  }, [explistData]);

  // const fetchData = async () => {
  //   const listItemData = await AsyncStorage.getItem('list');
  //   const expData = await AsyncStorage.getItem('expenses');
  //   let list = JSON.parse(listItemData) || [];
  //   let explist = JSON.parse(expData) || [];
  //   setListData(list);
  //   setExpListData(explist);
  //   // console.log(expData, 'mano');
  // };
  const fetchData = async () => {
    try {
      const listItemData = await AsyncStorage.getItem('list');
      const expData = await AsyncStorage.getItem('expenses');
      let list = JSON.parse(listItemData) || [];
      let explist = JSON.parse(expData) || [];
      setListData(list);
      setExpListData(explist);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // console.log(
  //   explistData.map(item => item.id),
  //   listData,
  //   'explistData',
  // );

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (listData.length > 1) {
      fetchData();
    }
  }, [listData]);

  return (
    <View style={ListStyle.container} data-testid="listscreen">
      <View style={{height: '20%', width: '100%', padding: 10}}>
        <Text style={{color: 'black'}}>Welcome to your</Text>
        <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: '#c4cfff', fontSize: 30}}>Dash</Text>
            <Text style={{color: 'lightgray', fontSize: 30}}>Board</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{width: '100%', height: '80%'}}
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={ListStyle.listView}
            onPress={() => handleItemPress(item)}>
            <Text style={{color: 'black'}}>Title: {item.title}</Text>
            <Text style={{color: 'black'}}>Date: {item.date}</Text>
            <Text style={{color: 'black'}}>Amount: {item.amount}</Text>
          </TouchableOpacity>
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
        onRequestClose={() =>
          ListModel.setModalVisible(!ListModel.modalVisible)
        }
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
