import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {appId, baseUrl} from './atlasConfig.json';
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