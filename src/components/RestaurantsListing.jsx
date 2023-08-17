import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import RestaurantCard from './RestaurantCard';
import { fetchRestaurantReducer } from '../reducer/fetchRestaurantReducer';
import { getRestaurants, postRestaurant, deleteExistingRestaurant } from "../api/index.js"
import AddRestaurants from './AddRestaurants';

const initState = {
  loading: false,
  error: false,
  data: []
}
function RestaurantsListing() {
  const [state, dispatch] = useReducer(fetchRestaurantReducer, initState);
  const [page, setPage] = useState(1);
  const limit = 4;
  const sortCriteria = 'rating';
  const [sortOrder, setSortOrder] = useState('asc')

  const fetchAndUpdateData = (page,limit, sortCriteria, sortOrder) => {
    dispatch({ type: "FETCH_LOADING" });
    getRestaurants({
      page: page,
      limit: limit,
      sortCriteria: sortCriteria,
      sortOrder: sortOrder
    })
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_ERROR" });
      });    
  }


  useEffect(() => {
    fetchAndUpdateData(page,limit,sortCriteria, sortOrder)
  }, [page,limit, sortCriteria, sortOrder]);

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

  const addNewRestaurant = (restaurantDetails) => {
    postRestaurant(restaurantDetails)
      .then(() => {
        fetchAndUpdateData(page, limit, sortCriteria, sortOrder);
      })
  }

  
  const deleteRestaurant = (id) => {
    deleteExistingRestaurant(id).then(()=>fetchAndUpdateData(page, limit, sortCriteria, sortOrder)); //
  }

  return (
    <div>
      {/* Add a new restaurant */}
      <AddRestaurants addNewRestaurant={addNewRestaurant} />

      <hr />
      <h1>Restaurants Listing</h1>
      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">ASCENDING</option>
          <option value="desc">DECENDING</option>
        </select>
      </div>
      <div className="pagination-section">
        <button onClick={() => handlePageChange(-1)}>PREVIOUS</button>
        <button disabled>{page}</button>
        <button onClick={() => handlePageChange(1)}>NEXT</button>
      </div>

      {state?.data &&
        state?.data?.length > 0 &&
        state?.data?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            deleteRestaurant={deleteRestaurant}
          />
        ))}
    </div>
  );
}

export default RestaurantsListing;