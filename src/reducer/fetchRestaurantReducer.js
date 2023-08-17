const fetchRestaurantReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LOADING": {
      return {
        loading: true,
        error: false,
        data: [],
      };
    }
    case "FETCH_SUCCESS": {
      return {
        loading: false,
        error: false,
        data: action.payload,
      };
    }
    case "FETCH_ERROR": {
      return {
        loading: false,
        error: true,
        data: [],
      };
    }
    default: {
      throw new Error(`Invalid action type ${action.type}`);
    }
  }
};


export { fetchRestaurantReducer };