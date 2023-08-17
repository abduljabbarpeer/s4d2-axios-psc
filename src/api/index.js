import axios from 'axios'

// export const getRestaurants = (params = {}) => {
//   return axios.get(`http://localhost:8080/restaurants`, {
//     params: {
//       _page: params.page,
//       _limit: params.limit,
//       _sort: params.sortCriteria,
//       _order: params.sortOrder
//     },
//   });
// };
export const getRestaurants = (params = {}) => {

  return axios({
    url: `http://localhost:8080/restaurants`,
    method: 'get',
    params: {
       _page: params.page,
      _limit: params.limit,
       _sort: params.sortCriteria,
      _order: params.sortOrder
    },
  });
};


// export const postRestaurant = ( restaurantDetails ) => {
//   return axios.post(`http://localhost:8080/restaurants`, {
//     name: restaurantDetails.name,
//     type: restaurantDetails.type,
//     rating: restaurantDetails.rating,
//     number_of_votes: restaurantDetails.number_of_votes,
//     price_starts_from: restaurantDetails.price_starts_from,
//     image: restaurantDetails.image
//   });
// }
export const postRestaurant = ( restaurantDetails ) => {
  return axios({
    url: `http://localhost:8080/restaurants`,
    method: "post",
    data: {
      name: restaurantDetails.name,
      type: restaurantDetails.type,
      rating: restaurantDetails.rating,
      number_of_votes: restaurantDetails.number_of_votes,
      price_starts_from: restaurantDetails.price_starts_from,
      image: restaurantDetails.image,
    },
  });
}


export const deleteExistingRestaurant = (restaurantId) => {
  return axios({
    url: `http://localhost:8080/restaurants/${restaurantId}`,
    method:'delete'
  });
}


export const editExistingRestaurant = ( updatedRestaurantDetails, restaurantId) => {
  return axios({
    url: `http://localhost:8080/restaurants/${restaurantId}`,
    method: "put",
    data: updatedRestaurantDetails,
  });
};