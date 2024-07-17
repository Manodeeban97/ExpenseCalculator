export const Add_LIST = 'ADD_LIST';
export const Add_VOICE = 'ADD_VOICE';
export const UPDATE_LIST = 'UPDATE_LIST';
export const Add_EXPLIST = 'Add_EXPLIST';

export const Addlist = listItem => {
  return {type: Add_LIST, payload: listItem};
};
export const AddExpList = expData => {
  return {type: Add_EXPLIST, payload: expData};
};
export const handleVoice = data => {
  return {type: Add_VOICE, payload: data};
};
export const UpDateList = (id, newData) => {
  return {type: UPDATE_LIST, payload: {id, newData}};
};
