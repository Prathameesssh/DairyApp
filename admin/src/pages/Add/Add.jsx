import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Yoghurt"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Yoghurt"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    const handleImageResize = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const targetWidth = 300;  // Fixed width
        const targetHeight = 300; // Fixed height
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");
    
            // Calculate scaling factor to cover entire area (zoom effect)
            const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
    
            // Calculate position to center the image
            const x = (targetWidth - img.width * scale) / 2;
            const y = (targetHeight - img.height * scale) / 2;
    
            // Draw the image onto the canvas with zoom and crop
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    
            // Convert canvas to a File object
            canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, { type: file.type });
                setImage(resizedFile);
            }, file.type);
        };
    };
    
    
    
    
    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={handleImageResize} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Curd">Curd</option>
                            <option value="ButterMilk">Buttermilk</option>
                            <option value="Cheese">Cheese</option>
                            <option value="Ghee">Ghee</option>
                            <option value="Lassi">Lassi</option>
                            <option value="Yoghurt">Yoghart</option>
                            <option value="Milk">Milk</option>
                            <option value="Butter">Butter</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹20' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add