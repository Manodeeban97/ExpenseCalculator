import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import ListViewModel from '../../ViewModel/screen/ListViewModel';
import {ListStyle} from '../StyleSheet/ListStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = () => {
  const ListModel = ListViewModel();
  useEffect(() => {
    if (ListModel.explistData) {
      ListModel.handleUpdate(ListModel.matchId);
    }
  }, [ListModel.explistData.length]);

  useEffect(() => {
    ListModel.fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (ListModel.listData) {
          ListModel.fetchData();
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ListModel.listData]);

  return (
    <View style={ListStyle.container} data-testid="listscreen">
      <View
        style={{
          width: '100%',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: 'black'}}>Welcome to your</Text>
          <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: '#c4cfff', fontSize: 30}}>Dash</Text>
              <Text style={{color: 'lightgray', fontSize: 30}}>Board</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/coinGIF.gif')}
          style={{
            resizeMode: 'cover',
            width: 200,
            height: 140,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          padding: 20,
          marginBottom: 20,
          paddingLeft: 0,
          width: '100%',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
          Current Expenses
        </Text>
      </View>
      <FlatList
        style={{width: '100%', height: '80%'}}
        data={ListModel.listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={ListStyle.listView}
            onPress={() => ListModel.handleItemPress(item)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                paddingLeft:3,
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/coin.png')}
                    style={{
                      resizeMode: 'cover',
                      width: 30,
                      height: 30,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#5d5bd4'}}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                {item.amount}
              </Text>
            </View>
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
            {/* <TouchableOpacity
              style={[ListStyle.button, ListStyle.buttonClose]}
              onPress={() => ListModel.viewModal('gesture')}>
              <Text style={ListStyle.textStyle}>Gesture Mode</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListScreen;
