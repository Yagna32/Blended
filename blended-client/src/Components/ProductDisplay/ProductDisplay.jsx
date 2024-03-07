import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'


const ProductDisplay = (props) => {
    const {product} = props;
    const [mainImage,setMainImage] = useState(product.image[0])
    const {addToCart} = useContext(ShopContext);
    function changeImageHandler(e) {
        setMainImage(e.target.src);
    }
  return (
    <>
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                {product.image.map((item)=><img key={item} onClick={changeImageHandler} src={item} alt='product images'/>)}
                {/* <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" /> */}
            </div>
            <div className="productdisplay-img">
                <img src={mainImage} alt="" className="productdisplay-main-img" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>{product.ratings}</p>
            </div>
            <div className="product-display-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <button onClick={()=>{addToCart(product.id,product.new_price)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>MEN, T-shirt, Shirts</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Mordern, Latest</p>
            </div>
        </div>
        </div>
        <div className='descriptionbox'>
        <div className="descriptionbox-nav">
            <div className="descriptionbox-nav-box fade">
                Reviews ({product.totalReviews})
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Eum quis assumenda laboriosam ratione, molestias obcaecati, 
                laborum commodi molestiae iure inventore corporis. 
                Architecto, perspiciatis ullam harum quo maxime et facere iusto?
            </p>
        </div>
    </div>
    
    </>
  )
}

export default ProductDisplay