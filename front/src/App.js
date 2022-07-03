import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from '../src/components/userSlice';


function App() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'user_name']);


  useEffect(() => {
    var temp = false;
    if (current_user_id == -1){
      if(cookies.user_id != "undefined" && cookies.user_id){
        dispatch(change_id(cookies.user_id));
        dispatch(change_type(cookies.user_type));
        dispatch(change_name(cookies.user_name));
        temp = true;
      }
    }
    if(temp == true){
      navigate('/');
    }
  }, []);

  function clicked(){
      navigate("/products", { state: { input: input } });
  }

  return (
    <div className="container">
      <Navbar />
      <div className="app_container">
        <img src="https://i.ibb.co/yp0yqzb/pic.png" alt="pic" border="0" className='image'></img>
        <input type="text" onInput={e => setInput(e.target.value)} className="in_class" placeholder='لطفا نام کالا را وارد کنید' 
              onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            this.setState({ message: e.target.value },
                            () => {
                                alert(this.state.message);
                            });
                        }
                    }}/>
        <button className='btn' onClick={clicked()}>
          <img src="https://i.ibb.co/Jyr40bb/314478-search-icon.png" alt="314478-search-icon" border="0" className='icon-search'/>
        </button>
      </div>
    </div>
  );
}

export default App;
