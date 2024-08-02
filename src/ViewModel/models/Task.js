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
class ListExpense extends Realm.Object {
  _id;
  title;
  date;
  amount;
  userId;

  static schema = {
    name: 'ListExpense',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      date: 'date',
      amount: 'int',
      userId: 'string',
    },
  };
}

const RealmContext = createRealmContext({
  schema: [ListExpense, Task, Expenselist],
});

export {ListExpense, Expenselist, Task, RealmContext};
