import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";
import config from "@/app/config/config";
import LOGIN_TYPE from "@/app/constants/loginType";

// Dynamically import the TestimonialsSlider component with SSR disabled.
const TestimonialsSlider = dynamic(() => import("./TestimonialsSlider"));

async function Testimonials({ role }) {
  let testimonialsdata = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_TESTIMONIAL}${role}`
    );
    if (res.ok) {
      testimonialsdata = await res.json();
    } else {
      console.error("Error fetching testimonials:", res.statusText);
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  if (testimonialsdata.length === 0) return null;

  // Slider settings (applies for both candidate and employer layouts).
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      {role === LOGIN_TYPE.CANDIDATE ? (
        <section className="full-body-tab">
          <div className="container">
            <div className="section success_story_section">
              <div className="section-heading centred">
                <h3 className="section_head">{UI.SOTRY_SLIDER}</h3>
              </div>
              <div className="story_slider">
                <TestimonialsSlider
                  testimonialsdata={testimonialsdata}
                  settings={settings}
                  role={role}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="full-body-tab section pt-8 testimonials_slide">
          <div className="container section success_story_section">
            <div className="section-heading centred">
              <h3 className="section_head mb-0">{UI.TESTIMONAL}</h3>
            </div>
            <div className="story_slider">
              <TestimonialsSlider
                testimonialsdata={testimonialsdata}
                settings={settings}
                role={role}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

Testimonials.propTypes = {
  role: PropTypes.number,
};

Testimonials.defaultProps = {
  role: 1,
};

export default Testimonials;
