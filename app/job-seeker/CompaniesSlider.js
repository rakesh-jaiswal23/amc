"use client";
import React from "react";
import Slider from "react-slick";
import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";
import UI from "@/app/constants/ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import config from "@/app/config/config";

function CompaniesSlider({ companiesdata, settings }) {
  const mergedSettings = {
    ...settings,
    arrows: true,
    prevArrow: <CustomPrevArrows />,
    nextArrow: <CustomNextArrows />,
  };

  return (
    <Slider {...mergedSettings}>
      {companiesdata.map((company, index) => (
        <div className="slide" key={index}>
          <div className="slide_div row">
            <Image
              src={`${config.ROUTE_BASE}${company?.image}`}
              alt={UI.ALT_FEATURED_COMPANIES_IMAGE}
              width={150}
              height={200}
              layout="responsive"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CompaniesSlider;
