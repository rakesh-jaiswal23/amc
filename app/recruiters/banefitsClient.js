"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";
import UI from "@/app/constants/ui";
import PropTypes from "prop-types";
import config from "../config/config";
import Image from "next/image";

function BenefitsClient({ initialData }) {
  const [benefitData] = useState(initialData || []);

  const slidesToShow = benefitData.length >= 3 ? 3 : benefitData.length;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    autoplay: false,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrows />,
    nextArrow: <CustomNextArrows />,
    responsive: [
      {
        breakpoint: 991,
        settings: { dots: true, arrows: false, slidesToShow: 2 },
      },
      {
        breakpoint: 575,
        settings: { dots: true, arrows: false, slidesToShow: 1 },
      },
    ],
  };

  return (
    <div>
      {benefitData.length > 0 ? (
        <div className="skills_intelligence achieve-skills">
          <section className="skills_intelligence">
            <div className="container">
              <div className="section-heading centred mb-3">
                <h3 className="section_head">
                  Additional Advantages of
                  <br /> AlignMyCareer
                </h3>
              </div>
              <div className="row">
                <Slider {...settings}>
                  {benefitData.map((benefit, index) => (
                    <div className="col-lg-12 " key={index}>
                      <div className="Intelligence_card">
                        <div className="Intelligence_img">
                          {/* <img
                            src={`${config.ROUTE_BASE}${benefit.iconimage}`}
                            alt={UI.ALT_ACHEIVESKILLS_IMAGE}
                            width="50%"
                            height="50%"
                          /> */}
                          <Image
                            src={`${config.ROUTE_BASE}${benefit.iconimage}`}
                            alt={UI.ALT_ACHEIVESKILLS_IMAGE}
                            width={50}
                            height={50}
                            loading="lazy"
                          />
                        </div>
                        <h6>{benefit.title}</h6>
                        <p>{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

BenefitsClient.propTypes = {
  initialData: PropTypes.array,
};

BenefitsClient.defaultProps = {
  initialData: [],
};

export default BenefitsClient;
