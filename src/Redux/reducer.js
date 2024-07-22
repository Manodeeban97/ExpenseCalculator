import {Add_EXPLIST, Add_LIST, Add_VOICE, UPDATE_LIST} from '../Redux/Action';

const initialstate = {
  listItem: [],
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
