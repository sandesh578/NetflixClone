import { useState, useRef } from 'react';
import './Register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleStart = () => {
    // setEmail(emailRef);
  };

  const handleFinish = () => {
    // setPassword(passwordRef);
  };

  return (
    <div className='register'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FugoYJrgSorYtynAnD51b9i91BjL0gK5X8YoFEUYSMJctSRx9Zs9-KxJ9NVArUa86kw&usqp=CAU'
            alt=''
          />
          <button className='loginButton'>Sign In</button>
        </div>
      </div>
      <div className='container'>
        <h1>Unlimited movies,shows and many more.</h1>
        <h2>Watch Anywhere anytime. Cancel Any time.</h2>
        <p>
          Ready to watch?   Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className='input'>
            <input type='email' placeholder='Email Address' ref={emailRef} />
            <button className='registerButton' onClick={handleStart()}>
              Get Started
            </button>
          </div>
        ) : (
          <form className='input'>
            <input type='password' placeholder='Password' ref={passwordRef} />
            <button className='registerButton' onClick={handleFinish()}>
              Start Membership
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
