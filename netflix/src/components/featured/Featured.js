import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import React from 'react';
import './Featured.scss';

const Featured = ({ type }) => {
  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span>{type === 'Movies' ? 'Movies' : 'Series'}</span>
          <select name='genre' id='genre'>
            <option>Genre</option>
            <option value='Adventure'>Adventure</option>
            <option value='Crime'>Crime</option>
            <option value='Thriller'>Thriller</option>
            <option value='Comedy'>Comedy</option>
            <option value='Adventure'>Adventure</option>
            <option value='Action'>Action</option>
            <option value='Horror'>Horror</option>
            <option value='Comedy'>Comedy</option>
            <option value='Sci-fi'>Sci-fi</option>
            <option value='Drama'>Drama</option>
            <option value='Documentary'>Documentary</option>
            <option value='Animation'>Animation</option>
            <option value='Fantasy'>Fantasy</option>
            <option value='Western'>Western</option>
          </select>
        </div>
      )}
      <img
        width={'100%'}
        src='data:image/jpeg;base64,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'
        alt='featured'
      />

      <div className='info'>
        <img
          width={'100%'}
          src='https://wallpaperaccess.com/full/1695677.jpg'
          alt='featured'
        />

        <span className='desc'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
          reiciendis, error cum maxime vel suscipit asperiores ducimus, beatae
          amet nostrum eveniet sit nesciunt blanditiis eos unde non nobis
          deleniti veritatis!
        </span>
        <div className='buttons'>
          <div className='play'>
            <button>
              <PlayArrow />
              <span>Play</span>
            </button>
          </div>
          <div className='more'>
            <button>
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
