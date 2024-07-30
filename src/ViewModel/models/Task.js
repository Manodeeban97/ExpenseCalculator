import {Realm, createRealmContext} from '@realm/react';

class Expenselist extends Realm.Object {
  _id;
  subID;
  expenseinfo;
  category;
  name;
  amount;

  static schema = {
    name: 'ExpenseList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      subID: 'objectId',
      expenseinfo: 'string',
      category: 'string',
      name: 'string',
      amount: 'int',
    },
  };
}

class Task extends Realm.Object {
  _id;
  title;
  date;
  amount;

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      date: 'string',
      amount: 'int',
    },
  };
}

const RealmContext = createRealmContext({
  schema: [Task, Expenselist],
});

export {Expenselist, Task, RealmContext};
