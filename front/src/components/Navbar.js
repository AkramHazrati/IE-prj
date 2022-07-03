import './Navbar.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { change_id } from './userSlice';
import { useNavigate } from "react-router-dom";






function Navbar() {
let dispatch = useDispatch();
let navigate = useNavigate();
let current_user_id = useSelector((state) => state.user.user_id);
let current_user_type = useSelector((state) => state.user.user_type);
let current_user_name = useSelector((state) => state.user.user_name);
const [cookies, removeCookie] = useCookies(['user_id', 'user_type']);
function logout(){
  removeCookie('user_type');
  removeCookie('user_id');
  
  dispatch(change_id(-1));
  navigate("/");
}
  const categories = [];
categories.push('mobile');
categories.push('laptop');
  let user_id = useSelector((state) => state.user.user_id);
  let user_name = useSelector((state) => state.user.user_name);

  return (
    <div className="navbar">
       { user_id == -1 
        ?
        <button className='btn-login'>
          <Link to="/login">ورود</Link>  
        </button>
        : 
        <div className='log-c'>
          <input type={'text'} value={user_name} readOnly="readoly" className='box'/>
          <button onClick={logout} className='btn-logout'>خروج</button>
        </div>
        }
       
       <ul className="nav">
					<li>
						<Link to="/">
							صفحه اصلی
						</Link>
					</li>
					<li>
						<Link to="/mobiles">
							گوشی همراه
						</Link>
					</li>
					<li>
						<Link to="/laptops">
							لپ تاپ 
						</Link>
					</li>
				
				</ul>
      
    </div>
  );
}

export default Navbar;
