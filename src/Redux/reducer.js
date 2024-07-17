import {Add_EXPLIST, Add_LIST, Add_VOICE, UPDATE_LIST} from '../Redux/Action';

const initialstate = {
  listItem: [
    {
      id: 1,
      title: 'Tomorrow meeting',
      date: 'july 10 2024',
      amount: 0,
    },
    {
      id: 2,
      title: 'Today meeting',
      date: 'july 11 2024',
      amount: 0,
    },
  ],
  VoiceData: '',
  expData: [],
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case Add_LIST:
      return {...state, listItem: [...state.listItem, action.payload]};
    case Add_EXPLIST:
      return {...state, expData: [...state.expData, action.payload]};
    case UPDATE_LIST:
      return {
        ...state,
        listItem: state.listItem.map(item =>
          item.id === action.payload.id
            ? {...item, amount: action.payload.newData}
            : item,
        ),
      };

    default:
      return state;
  }
};

export default reducer;
