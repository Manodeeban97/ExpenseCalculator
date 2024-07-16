import { Add_LIST, Add_VOICE } from "../Redux/Action";

const initialstate = {
  listItem: [
    {title: 'Tomorrow meeting', date: 'july 10 2024', amount: '100'},
    {title: 'Today meeting', date: 'july 11 2024', amount: '200'},
  ],
  VoiceData: '',
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case Add_LIST:
      return {...state, listItem: [...state.listItem, action.payload]};
    case Add_VOICE:
      return {...state, listItem: [...state.listItem, action.payload]};

    default:
      return state;
  }
};

export default reducer;
