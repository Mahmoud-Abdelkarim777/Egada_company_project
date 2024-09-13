import axios from "axios";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import StarRating from './StarRating'; // Import the StarRating component

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://669fd2c4b132e2c136ff474c.mockapi.io/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonial" id="TESTIMONIALS">
      <div className="container main">
        <h1 className="d-flex justify-content-center pt-5" id="Clients-Testimonial">
          Clients Testimonial
        </h1>
        
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={2}
          // navigation={true}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            }
          }}
        >
          {testimonials.map(({ id, title, body, rating, image, name, jobTitle }) => {
            return (
              <SwiperSlide key={id}>
                <div className="user1 bg-white p-4 d-flex flex-column align-items-center">
                  <h4>{title}</h4>
                  <p>{body}</p>
                  <span><StarRating rating={rating} /></span>
                </div>
                <div className="icon d-flex align-items-end">
                  <div className="img">
                    <img src={image} alt="photo" style={{ borderRadius: "50%", width: "60px", height: "60px" }} />
                  </div>
                  <div className="info">
                    <h4>{name}</h4>
                    <p>{jobTitle}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>
    </div>
  );
}

export default Testimonial;
