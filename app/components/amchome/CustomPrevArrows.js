import React from "react";
import PropTypes from "prop-types";
import prevarrow from "@/app/assets/left.webp";
import UI from "@/app/constants/ui";
import Image from "next/image";

function CustomPrevArrows({ currentSlide, slideCount, isNotGray, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`slide-arrow prev-arrow ${isNotGray ? "" : "gray_arrow"} `}
    >
      <div className="arrows prev">
        <Image
          src={prevarrow}
          alt={UI.ALT_CUSTOM_PREVIOUS_ARROW}
          className="prev"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
}

CustomPrevArrows.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
  isNotGray: PropTypes.bool,
};

CustomPrevArrows.defaultProps = {
  currentSlide: 0,
  slideCount: 1,
  isNotGray: false,
};

export default CustomPrevArrows;
