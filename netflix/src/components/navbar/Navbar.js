import { useState } from 'react';
import { Search, Notifications, ArrowDropDown } from '@material-ui/icons';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FugoYJrgSorYtynAnD51b9i91BjL0gK5X8YoFEUYSMJctSRx9Zs9-KxJ9NVArUa86kw&usqp=CAU'
            alt='netflix'
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies </span>
          <span>New And Popular</span>
          <span>My List</span>
        </div>
        <div className='right'>
          <Search className='icon' />
          <span>KID</span>
          <Notifications className='icon' />
          <img src='' alt='profile' />

          <div className='profile'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
