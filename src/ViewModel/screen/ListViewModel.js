import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RealmContext, Task} from '../models/Task';

const {useQuery, useRealm} = RealmContext;

const ListViewModel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [listData, setListData] = useState([]);
  const [explistData, setExpListData] = useState([]);
  const [matchId, setMatchId] = useState('');
  const listItemData = useSelector(state => state.listItem);

  const listData = useQuery(Task);

  // console.log(listData,"listdata")

  // console.log(listData,"mano")

  const navigation = useNavigation();

  const viewModal = () => {
    navigation.navigate('VoiceScreen');
  };
  const handleItemPress = item => {
    console.log(item._id, 'nffjfjjgjgj');
    setMatchId(item.id);
    navigation.navigate('AddPaymentScreen', {subID: item._id});
  };

  const handleUpdate = async id => {
    try {
      const listString = await AsyncStorage.getItem('list');
      const list = listString ? JSON.parse(listString) : [];
      const data = explistData
        ?.filter(item => item.id === id)
        .map(item => item.amount)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      const updatedList = list.map(item => {
        if (item.id === id) {
          return {...item, amount: data};
        }
        return item;
      });

      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
    } catch (error) {
      console.log('Error updating list in local storage: ', error);
    }
  };
  const fetchData = async () => {
    try {
      const listItemData = await AsyncStorage.getItem('list');
      const expData = await AsyncStorage.getItem('expenses');
      let list = JSON.parse(listItemData) || [];
      let explist = JSON.parse(expData) || [];
      // setListData(list);
      setExpListData(explist);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return {
    viewModal,
    handleItemPress,
    handleUpdate,
    fetchData,
    // setListData,
    modalVisible,
    listItemData,
    explistData,
    listData,
    matchId,
    setModalVisible,
  };
};

export default ListViewModel;
