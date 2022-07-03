import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useCookies } from 'react-cookie';
import './Login.css';

function Login() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [message, setMessage] = useState('');
  let [up_password, setInput_up_password] = useState('');
  let [up_email, setInput_up_email] = useState('');
  let [up_name, setInput_up_name] = useState('');
  let [up_mobile, setInput_up_mobile] = useState('');
  let [username, setInput_username] = useState('');
  let [password, setInput_password] = useState('');
  let [up_username, setInput_up_username] = useState('');
  let [up_type, setInput_up_type] = useState('user');
  let c_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'user_name']);

  useEffect(() => {
    if (c_id != -1) {
      navigate("/user");
    }
  }, []);


  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }


  function login() {
    fetch('http://localhost:3030/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error.message);
        }
        else {
          setCookie('user_id', data.user._id, { path: '/', expires: addMonths(new Date(), 1) });
          setCookie('user_name', data.user.name, { path: '/', expires: addMonths(new Date(), 1) });
          setCookie('user_type', data.type, { path: '/', expires: addMonths(new Date(), 1) });
          navigate("/");
        }
      });
  }

  function signup() {
    if (up_type == 'user') {
      fetch('http://localhost:3030/api/signup_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: up_username,
          password: up_password,
          email: up_email,
          name: up_name,
          mobile: up_mobile
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error.message);
          }
          else {
            setMessage(data.message);
          }
        });
    }
    else {
      fetch('http://localhost:3030/api/signup_seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: up_username,
          password: up_password,
          email: up_email,
          name: up_name,
          mobile: up_mobile
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error.message);
          }
          else {
            setMessage(data.message);
          }
        });
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className='log_container'>
        <div className="login_container">
             <h2> ورود به حساب کاربری</h2>
             <p>username</p>
             <input type="text" onInput={e => setInput_username(e.target.value)} />
              <p>password</p>
              <input type="text" onInput={e => setInput_password(e.target.value)} /><br /><br />
             <button className='btn-lg' onClick={login}>ورود</button>
             <br /><br />
        </div>
        <div className='signup_container'>
             <h2>:ثبت نام</h2>
             <p>username</p>
             <input type="text" onInput={e => setInput_up_username(e.target.value)} />
             <p>password</p>
             <input type="password" onInput={e => setInput_up_password(e.target.value)} />
            <p>ایمیل </p>
            <input type="text" onInput={e => setInput_up_email(e.target.value)} />
           <p>نام کاربر</p>
           <input type="text" onInput={e => setInput_up_name(e.target.value)} />
           <p>شماره تلفن همراه</p>
            <input type="text" onInput={e => setInput_up_mobile(e.target.value)} /><br></br>
            <input type="radio" value="user" name="up_type" checked={up_type == 'user'} onClick={() => setInput_up_type('user')} /> کاربر
           <input type="radio" value="seller" name="up_type" checked={up_type == 'seller'} onClick={() => setInput_up_type('seller')} /> فروشنده
            <br /><br />
            <button onClick={signup} className='btn-lg'>ثبت نام</button>
            <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
