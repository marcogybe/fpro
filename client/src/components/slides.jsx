import Carousel from 'react-bootstrap/Carousel';
import  { useState } from 'react';
import "./slides.css"


const Slides = () => {
const slidesArr = [
  {
    image: "https://res.cloudinary.com/wageihascloud/image/upload/v1691961101/voucher-cards/Leder_Berensen_umeebu.png",
    title: "Leder Berensen",
    subTitle: "A shop for leather products",
    interval: 3000
  },
  
  {
    image: "https://res.cloudinary.com/wageihascloud/image/upload/v1691961104/voucher-cards/L_Osteria_zmxfr9.png",
    title: "L'Osteria",
    subTitle: "Restaurant",
    interval: 3000
  },
  {
    image: "https://res.cloudinary.com/wageihascloud/image/upload/v1691966666/voucher-cards/Blumen_Dornroeschen_bhpodb.png",
    title: "Blumen Dornröschen",
    subTitle: "A flower shop",
    interval: 3000
  },
] 

   /*  const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      console.log('selected index: ', selectedIndex)
      setIndex(selectedIndex);
    }; */
  
    return (
      <Carousel /* activeIndex={index}
                onSelect={handleSelect}
                nextIcon={<span aria-hidden="true" className="carousel-control-next-icon changed" />} */
       className='slide-carousel'>
        {slidesArr.map((slide, index) => (
          <Carousel.Item key={index} interval={slide.interval}>
            <img
              /* className="d-block w-100" */
              src={slide.image}
              alt={slide.title}
            />
            {/* <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.subTitle}</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  
  export default Slides;
