import './Login.scss';

const Login = () => {
  return (
    <div className='login'>
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
        <form>
          <h1>Sign In</h1>
          <input type='email' placeholder='Email or phone Number' />
          <input type='password' placeholder='Password' />
          <button className='loginButton'>Sign In</button>
          <span>
            New to Netflix? <b>Sign Up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you rea not a
            bot.<b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
