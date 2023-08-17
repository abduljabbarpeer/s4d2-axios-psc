function AddRestaurants({ addNewRestaurant }) {
  const handleClick = () => {
    const restaurantObject = {
      name: "Some New Restuant",
      type: "cafe",
      rating: 4.5,
      number_of_votes: 909,
      price_starts_from: 500,
      image: "https://picsum.photos/200",
    };

    addNewRestaurant( restaurantObject );
  };

  return (
    <div>
      <button onClick={handleClick}>ADD A NEW RESTAURANT</button>
    </div>
  );
}

export default AddRestaurants