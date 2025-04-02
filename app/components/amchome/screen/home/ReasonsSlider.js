"use client";
import React from "react";
import Slider from "react-slick";
import UI from "@/app/constants/ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import config from "@/app/config/config";

function ReasonsSlider({ reasondata, settings }) {
  return (
    <Slider {...settings}>
      {reasondata.map((reason, index) => (
        <div className="partner-slide slide-1" key={index}>
          <div className="slide__text">
            <Image
              src={`${config.ROUTE_BASE}${reason.image}`}
              alt={UI.ALT_BENEFITS_SLIDER_IMAGE}
              width={121}
              height={121}
              loading="lazy"
            />
            <h5>{reason.title}</h5>
            <p>{reason.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ReasonsSlider;
