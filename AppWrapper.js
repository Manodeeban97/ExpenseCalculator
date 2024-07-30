import React from 'react';
import {ExpenseSchema} from './realmConfig';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import {appId, baseUrl} from './atlasConfig.json';
import App from './App';
import {ActivityIndicator, View} from 'react-native';
import RealmWrapper from './RealmWrapper';

function AppWrapper() {

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;

{
  /* <AppProvider id={'expensecalculator-tjedhlr'}>
<UserProvider fallback={<RealmWrapper />}>
  <RealmWrapper />
</UserProvider>
</AppProvider> */
}
