import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const backendURL=import.meta.env.VITE_BACKEND_URL;//import.meta.env.VITE_BACKEND_LOCAL_URL
    const [image,setImage] = useState([]);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:[],
        description:"",
        category:"women",
        new_price:'',
        old_price: ''
    })
    const imageHandler = (e) => {
        const images = Array.from(e.target.files).slice(0,4);
        console.log(images)
        setImage(images);
    }

    const changeHandler= (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async() =>{
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        image.forEach((file) => {
            formData.append(`product`, file);
          });
        // formData.append('product',image);

        await fetch(`${backendURL}/Product/upload`,{
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((res)=>res.json()).then((data)=>{responseData=data})
        
        if(responseData.success){
            product.image = responseData.image_urls;
            console.log(JSON.stringify(product))
            await fetch(`${backendURL}/Product/addProduct`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product)
            }).then((res)=>res.json()).then((data)=>{
                data.success ? alert("Product Added"):alert('Failed')
            })
        }

    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Men Casual Shirt'/>
            <p>Description</p>
            <input value={productDetails.description} onChange={changeHandler} type='text' name='description' placeholder='White solid casual shirt'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-select'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
            {image[0] ? image.map((item) => (
            <img key={item.name} src={URL.createObjectURL(item)} alt="" />)) : 
            (<img src={upload_area} alt="" />)}

                 {/*  src={showImage ? URL.createObjectURL(showImage):upload_area} 
                 className='addproduct-thumnail-img' alt="" /> */}
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' accept=".jpg,.jpeg,.png" multiple hidden/>
        </div>
        <button onClick={()=>{Add_Product()}}className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
