import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import RestaurantCard from './RestaurantCard';

const initState = {
  loading: false,
  error: false,
  data: []
}

const reducer = ( state, action ) => {
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
        data: []
      };
    }
    default: {
      throw new Error(`Invalid action type ${action.type}`);
    }
  }
}

const getRestaurants = ( params = {  } ) => {
  return axios
      .get(`http://localhost:8080/restaurants`, {
        params: {
          _page: params.page,
          _limit: params.limit
        }
      })
}

function RestaurantsListing() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [page, setPage] = useState(1);
  const limit = 4;

  const fetchAndUpdateData = (page,limit) => {
    dispatch({ type: "FETCH_LOADING" });
    getRestaurants( { page:page,limit:limit } )
     .then((res) => {
       dispatch({ type: "FETCH_SUCCESS", payload: res.data });
     })
     .catch(() => {
       dispatch({ type: "FETCH_ERROR" });
     });    
  }


  useEffect(() => {
    fetchAndUpdateData(page,limit)
  }, [page,limit]);

  const handlePageChange = (val) => {
    const updatePageVal = page + val;
    setPage(updatePageVal);
  }

  if (state.loading) {
    return <LoadingIndicator />;
  }

  if (state.error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <h1>Restaurants Listing</h1>
      <div className="pagination-section">
        <button onClick={() => handlePageChange(-1)}>PREVIOUS</button>
        <button disabled>{page}</button>
        <button onClick={() => handlePageChange(1)}>NEXT</button>
      </div>

      {state?.data &&
        state?.data?.length > 0 &&
        state?.data?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
    </div>
  );
}

export default RestaurantsListing;