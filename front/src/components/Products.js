import Navbar from './Navbar';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Products.css';

import {Link} from 'react';

function Products(Props) {

    let navigate = useNavigate();
    let [input, setInput] = useState('');


    return (
        <div className="products_container">
        <Navbar/>
        <div className='cards'>
        <div className='card'>
        <img className="items_image" src='https://imgur.com/a/uDa90Sw' />
        <div className="items_title">محصول۱</div>
        <img  className = 'icon' src="https://img.icons8.com/ios/50/000000/like--v2.png"/>
        
        </div>
        <div className='card'>
        <img className="items_image" src='https://imgur.com/a/uDa90Sw' />
        <div className="items_title">محصول۲</div>
        <img  className = 'icon' src="https://img.icons8.com/ios/50/000000/like--v2.png"/>
        
        </div>
        <div className='card'>
        <img className="items_image" src='https://imgur.com/a/uDa90Sw' />
        <div className="items_title">محصول۳</div>
        <img  className = 'icon' src="https://img.icons8.com/ios/50/000000/like--v2.png"/>
        
        </div>
        <div className='card'>
        <img className="items_image" src='https://imgur.com/a/uDa90Sw' />
        <div className="items_title">محصول۴</div>
        <img  className = 'icon' src="https://img.icons8.com/ios/50/000000/like--v2.png"/>
        
        </div>
        </div>
    </div>
    );
}

export default Products;
