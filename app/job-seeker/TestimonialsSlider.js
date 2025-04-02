"use client";
import React from "react";
import Slider from "react-slick";
import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";
import LOGIN_TYPE from "@/app/constants/loginType";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import config from "../config/config";

function TestimonialsSlider({ testimonialsdata, settings, role }) {
  // Merge the slider settings with your custom arrow buttons.
  const mergedSettings = {
    ...settings,
    arrows: true,
    prevArrow: <CustomPrevArrows />,
    nextArrow: <CustomNextArrows />,
  };

  return (
    <Slider {...mergedSettings}>
      {role === LOGIN_TYPE.CANDIDATE
        ? testimonialsdata.map((testimonial, index) => (
            <div className="slide" key={index}>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="slide-img">
                    {/* <img
                      src={testimonial.image}
                      alt={UI.ALT_STORIES_IMAGE}
                      className="slide_img"
                    /> */}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="slide-content">
                    <h6>{testimonial.name}</h6>
                    <span>{testimonial.designation}</span>
                    <p>{testimonial.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : role === LOGIN_TYPE.EMPLOYER
        ? testimonialsdata.map((testimonial, index) => (
            <div className="slide" key={index}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="slide-content p-3">
                    <Image
                      src={`${config.ROUTE_BASE}${testimonial.companylogo}`}
                      alt="Employer Logo"
                      width={100}
                      height={100}
                       layout="intrinsic"
                    />
                    <p>{testimonial.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </Slider>
  );
}

export default TestimonialsSlider;
