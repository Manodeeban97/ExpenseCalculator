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


  return (
    <View style={ListStyle.container} data-testid="listscreen">
      <View style={ListStyle.listheader}>
        <View>
          <Text style={{color: 'black'}}>Welcome to your</Text>
          <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
            <View style={ListStyle.dashboardtext}>
              <Text style={{color: '#c4cfff', fontSize: 30}}>Dash</Text>
              <Text style={{color: 'lightgray', fontSize: 30}}>Board</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40}}>
          <Image
            source={require('../../assets/coinGIF.gif')}
            style={ListStyle.listheadergif}
          />
        </View>
      </View>
      <View style={ListStyle.currentexpensetext}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
          Current Expenses
        </Text>
      </View>
      <FlatList
        testID="listscreen"
        style={ListStyle.flatlistcontainer}
        data={ListModel.listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={ListStyle.listView}
            onPress={() => ListModel.handleItemPress(item)}>
            <View style={ListStyle.flatlistView}>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/coin.png')}
                    style={ListStyle.flatlistViewImg}
                  />
                  <View>
                    <Text style={ListStyle.flatlistViewText}>{item.title}</Text>
                    <Text style={{color: '#5d5bd4'}}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <Text style={ListStyle.flatlistViewText}>{item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          accessibilityLabel="Add Title Button"
          accessible={true}
          onPress={ListModel.viewModal}
          testID="addTitleButton"
          style={ListStyle.addTitleBtn}>
          <Icon name="squared-plus" type="entypo" color="white" />
          <Text style={{padding: 10, color: 'white'}}>Add Title</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default ListScreen;
