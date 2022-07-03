import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import { change_id } from './userSlice';
import { useNavigate } from "react-router-dom";
import './User.css';

function User() {


  return (
    <div className="usr">
      <Navbar />
      <div className="user_c">
       
        <div className='fav-box'>
          <ul className='links'>
            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>            <li>
              محبوب
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
