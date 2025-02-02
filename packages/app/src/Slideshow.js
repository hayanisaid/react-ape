import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from '../../react-ape/reactApeEntry';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  slideshow: {
    position: 'absolute',
    left: 280,
    top: 0,
    backgroundColor: '#080808',
    width: width,
    height: 250,
    overflow: 'hidden',
  },
});

const slides = [
  'slides/brave-fencer-musashi.png',
  'slides/suikoden-2.jpg',
  'slides/brave-fencer-musashi.png',
];

const delay = 2500;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(
    () => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex(
            prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)
          ),
        delay
      );

      return () => {
        resetTimeout();
      };
    },
    [index]
  );

  return (
    <View style={{...styles.slideshow}}>
      {slides.map((slide, index) => <Image src={slide} key={index} />)}
    </View>
  );
}

/*<View style={styles.slideshowDots}>
        {slides.map((_, index) => (
          <View 
            style={index === idx ? styles.slideshowDotActive : styles.slideshowDot }
          />
        ))}
      </View>*/

export default Slideshow;
