import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodCart from '../FoodCart/FoodCart';
import './display.css';

const Display = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  if (!Array.isArray(food_list)) {
    return <p>Loading food items...</p>;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className='food-list'>
        {
          food_list.map((item) => {
            if (
              category === "All" ||
              item.category?.toLowerCase().trim() === category.toLowerCase().trim()
            ) {
              return (
                <FoodCart
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
};


export default Display;
