function RestaurantCard({
  id,
  name,
  image,
  type,
  rating,
  number_of_votes,
  price_starts_from,
  deleteRestaurant,
}) {
  return (
    <div
      className="restaurant-card"
      style={{ border: "1px solid black", margin: "20px", padding: "10px" }}
    >
      <img src={image} alt={name} width={200} />
      <p>Name : {name}</p>
      <p>Type : {type}</p>
      <p>Rating : {rating}</p>
      <p>Number of votes : {number_of_votes}</p>
      <p>Price starts from : {price_starts_from}</p>
      <button onClick={() => {
        deleteRestaurant(id)
      } }>DELETE</button>
    </div>
  );
}

export default RestaurantCard