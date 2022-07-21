import { ArrowBackIosOutlined } from '@material-ui/icons';
import React from 'react';
import './Watch.scss';

const Watch = () => {
  return (
    <div className='watch'>
      <div className='back'>
        <ArrowBackIosOutlined />
        Home
      </div>
      <video
        className='video'
        autoPlay
        progress
        controls
        src='https://www.youtube.com/embed/tgbNymZ7vqY'
      />
    </div>
  );
};

export default Watch;
