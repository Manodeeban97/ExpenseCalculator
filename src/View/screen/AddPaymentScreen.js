import {
  FlatList,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import AddPaymentComponent from '../components/AddPaymentComponent';

const AddPaymentScreen = ({route}) => {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View>
      {isLandscape ? (
        <View>
          <FlatList
            data={[{key: 'AddPaymentComponent'}]} // Dummy data to render the component
            renderItem={() => <AddPaymentComponent route={route} />}
            contentContainerStyle={{height: 'auto', backgroundColor: 'red'}}
          />
        </View>
      ) : (
        <View style={{height: '100%'}}>
          <AddPaymentComponent route={route} />
        </View>
      )}
    </View>
  );
};

export default AddPaymentScreen;

