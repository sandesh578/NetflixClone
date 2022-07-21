import {
  PlayArrow,
  Add,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined
} from '@material-ui/icons';
import React, { useState } from 'react';
import './ListItem.scss';

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);
  //const trailer = 'https://www.youtube.com/watch?v=wpjXJN_6dOs';
  return (
    <div
      className='listItem'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img
        src='https://images.unsplash.com/photo-1639433506517-4a703cb18525?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
        alt=''
      />
      {isHovered && (
        <>
          <video
            src='https://www.youtube.com/embed/tgbNymZ7vqY'
            autoPlay
            controls
            loop
          ></video>
          <div className='itemInfo'>
            <div className='icons'>
              <PlayArrow className='icon' />
              <Add className='icon' />
              <ThumbUpAltOutlined className='icon' />
              <ThumbDownAltOutlined className='icon' />
            </div>
            <div className='itemInfoTop'>
              <span>1 hour 14 mins</span>
              <span className='limit'>+16</span>
              <span>1999</span>
            </div>
            <div className='desc'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              maxime quos, doloremque quis numquam eaque suscipit vitae.
            </div>
            <div className='genre'>Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
