import {AppProvider, UserProvider} from '@realm/react';
import React from 'react';
import RealmWrapper from './RealmWrapper';

function AppWrapper() {
  return (
    // IMPORTANT: ADD YOUR APP ID BELOW
    <AppProvider id={'expensecalculator-rtpvwcz'}>
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;