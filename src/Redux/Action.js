export const Add_LIST = 'ADD_LIST';
export const Add_VOICE = 'ADD_VOICE';

export const Addlist = listItem => {
  return {type: Add_LIST, payload: listItem};
};
export const handleVoice = data => {
  return {type: Add_VOICE, payload: data};
};
