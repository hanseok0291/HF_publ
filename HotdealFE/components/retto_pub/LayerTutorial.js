import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleTutorial from '../../styles/retto_pub/Tutorial.module.css';
import Button from './common/Button';
import LayerTutorialMypage from './LayerTutorialMypage';
import LayerTutorialStamp from './LayerTutorialStamp';

const LayerTutorial = ({type}) => {

  return (
    <>
      { type === "mypage" ? 
        <LayerTutorialMypage /> :
        <LayerTutorialStamp />
      }
    </>
  )
}

export default LayerTutorial;
