import { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("List fetched successfully:", response.data);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

    const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/${id}`);
      toast(response.data.message)
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className='list'>
      <h2>All Food Items</h2>
      <div className="list-wrapper">
        {list.map((item) => (
          <div className="list-item" key={item._id}>
            <button className="delete-btn" onClick={() => deleteItem(item._id)}>x</button>
            <img src={item.image} alt={item.name} />
            <div className="list-details">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
