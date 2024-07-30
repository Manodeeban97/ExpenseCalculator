// import {App} from 'realm';
// import {Realm} from 'realm';

import { createRealmContext } from "@realm/react";

// // Initialize Realm app
// const app = new App({id: 'expensecalculator-dyyfxee'}); // Replace with your Realm app ID
// console.log(app, 'realm');

// const TaskSchema = {
//   name: 'expenselist',
//   properties: {
//     _id: 'objectId',
//     title: 'string',
//     date: 'string',
//     amount: 'int',
//   },
//   primaryKey: '_id',
// };

// const realmConfig = {
//   schema: [TaskSchema],
//   sync: {
//     user: app.currentUser || app.logIn(Realm.Credentials.anonymous()),
//     partitionValue:Math.random(100).toFixed(0)
//   },
// };

// export {app, realmConfig};

// import { App } from 'realm';
// import { Realm } from 'realm';

// // Initialize Realm app
// const app = new App({ id: 'expensecalculator-dyyfxee' }); // Replace with your Realm app ID
// console.log(app, 'realm');

// const TaskSchema = {
//   name: 'expenselist',
//   properties: {
//     _id: 'objectId',
//     title: 'string',
//     date: 'string',
//     amount: 'int?',
//   },
//   primaryKey: '_id',
// };

// const realmConfig = {
//   schema: [TaskSchema],
//   sync: {
//     user: app.currentUser || await app.logIn(Realm.Credentials.anonymous()),
//     // flexible: true, // Enable flexible sync
//     // query: (realm) => realm.objects('expenselist') // Adjust the query as needed
//   },
// };

// export { app, realmConfig };

export const ExpenseSchema = {
  name: 'expenselist',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    title: 'string',
    date: 'string',
    amount:"int?"
  },
};

// Create the Realm context
export const RealmContext = createRealmContext({
  schema: [ExpenseSchema],
});
