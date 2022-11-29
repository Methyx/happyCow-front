// carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// style
import "../style/CarouselPageRestaurant.css";

const CarouselPageRestaurant = ({ restaurant }) => {
  const carouselResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
      responsive={carouselResponsive}
      containerClass="carousel-container"
      swipeable
    >
      {restaurant.pictures.map((item, index) => {
        return (
          <img
            className="carousel-image"
            key={index}
            src={item}
            alt="restaurant's food"
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselPageRestaurant;
