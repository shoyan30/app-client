export const floorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FLOORS':
      return { ...state, floors: action.payload, isLoading: false };
    case 'ADD_FLOOR':
      return { ...state, floors: [action.payload, ...state.floors] };
    case 'UPDATE_FLOOR':
      return {
        ...state,
        floors: state.floors.map(floor => 
          floor.ID === action.payload.ID ? action.payload : floor
        )
      };
    case 'DELETE_FLOOR':
      return {
        ...state,
        floors: state.floors.filter(floor => floor.ID !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const initialState = {
  floors: [],
  isLoading: false,
  error: null
};
