// import Slider from 'infinite-react-carousel';


// const Slide = ({children, slidesToShow, arrowsScroll, src}) => {
//   return (
//     <div className="slide">
//         <div className="container">
//             {/* <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}> */}
//                 {children}
//             {/* </Slider> */}
//         </div>
//     </div>
//   )
// }



import { Children } from "react";
import { cloneElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Slide.scss"


const Slide = ({ numToShow, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Move the slider every 6 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex =>
        currentIndex + numToShow >= Children.count(children)
          ? 0
          : currentIndex + numToShow
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [numToShow, children]);

  const handleClickLeft = () => {
    setCurrentIndex(currentIndex =>
      currentIndex - numToShow < 0
        ? Children.count(children) - numToShow
        : currentIndex - numToShow
    );
  };

  const handleClickRight = () => {
    setCurrentIndex(currentIndex =>
      currentIndex + numToShow >= Children.count(children)
        ? 0
        : currentIndex + numToShow
    );
  };

  const containerStyle = {
    "--num-to-show": numToShow,
    transition: 'all 1.5s ease 1s',
    
  };


  return (
    <div className="slide" style={containerStyle}>
      <div className="slide-container" style={containerStyle}>
            {Children.toArray(children)
              .slice(currentIndex, currentIndex + numToShow)
              .map((child, index) => cloneElement(child, { key: index , style: containerStyle}))}
        </div>
      <button onClick={handleClickLeft}>{"<"}</button>
      <button onClick={handleClickRight}>{">"}</button>
    </div>
  );
};


export default Slide