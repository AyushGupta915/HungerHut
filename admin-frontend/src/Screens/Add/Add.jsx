import { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'none', // corrected to lowercase
        price: '',
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', Number(data.price));


        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            toast(response.data.message)
            setData({
                name: '',
                description: '',
                category: 'none',
                price: '',
            });
            setImage(false);
        } catch (error) {
            toast.error("Error adding product:", error);
        }
    };

    return (
        <div className="screen">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input value={data.name} onChange={onChangeHandler} type="text" name="name" placeholder="Type Here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea name="description" value={data.description} onChange={onChangeHandler} rows="6" placeholder="Write Description Here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select name="category" value={data.category} onChange={onChangeHandler}>
                            <option value="none">Select Category</option>
                            <option value="salad">Salad</option>
                            <option value="rolls">Rolls</option>
                            <option value="dessert">Desserts</option> {/* fixed typo */}
                            <option value="sandwich">Sandwiches</option> {/* fixed typo */}
                            <option value="cake">Cake</option>
                            <option value="pureveg">Pure Veg</option>
                            <option value="pasta">Pasta</option>
                            <option value="noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={onChangeHandler}
                            placeholder="₹0"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
                <button type="submit" className="add">Add</button>
            </form>
        </div>
    );
};

export default Add;
