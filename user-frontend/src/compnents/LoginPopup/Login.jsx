  import { useState } from 'react';
  import './Login.css';
  import { assets } from '../../assets/assets';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import {StoreContext} from '../../context/StoreContext';
  import { useContext } from 'react';

  const Login = ({ setShowLogin }) => {
    const {url, token, setToken} = useContext(StoreContext); 
    const [currState, setCurrState] = useState("Sign in");
    const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
    });

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setData(data => ({ ...data, [name]: value }));
    };


    const onSubmitHandler = async (e) => {
      e.preventDefault();

      const endpoint = currState === "Sign up"
        ? `${url}/api/users/register`
        : `${url}/api/users/login`;


      try {
        const res = await axios.post(endpoint, data);
        if(currState === "Sign up") {
          toast.success("Registration successful! Please log in."); // ✅ success toast
          setCurrState("Sign in");
        }
        else {
          toast.success("Login successful!"); // ✅ success toast
          setToken(res.data.token); // Save token in context
          localStorage.setItem("token", res.data.token); // Save token in local storage 
          setShowLogin(false); // Close login popup
        }
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong"); // ❌ error toast
      }
    };

    return (
      <div className="login">
        <form className="login-container" onSubmit={onSubmitHandler}>
          <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
          </div>
          <div className="login-inputs">
            {currState !== "Sign in" && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button type="submit" className="btn">{currState}</button>
          <div className="login-footer">
            <input type="checkbox" required />
            <p>
              By signing in, you agree to our <span>Terms & Conditions</span> and <span>Privacy Policy</span>
            </p>
          </div>
          {currState === "Sign in" ? (
            <p>New Here? <span onClick={() => setCurrState("Sign up")}>Click Here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Sign in")}>Log in Here</span></p>
          )}
        </form>
      </div>
    );
  };

  export default Login;
