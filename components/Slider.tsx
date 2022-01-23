import { Curcuit } from "@api/types";
import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";

interface SliderProps {
  currentDisplayedItemIndex: number | undefined;
  onSlideChange: (currentSlide: number, previousSlide: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  onSlideChange,
  currentDisplayedItemIndex,
  children,
}) => {
  return (
    <Carousel
      index={currentDisplayedItemIndex ? currentDisplayedItemIndex : 0}
      className="h-3/4"
      animation="slide"
      navButtonsAlwaysVisible
      // changeOnFirstRender={false}
      fullHeightHover={false}
      autoPlay={false}
      onChange={(currentSlide, previousSlide) =>
        onSlideChange(currentSlide!, previousSlide!)
      }
    >
      {children}
    </Carousel>
  );
};

export default Slider;
