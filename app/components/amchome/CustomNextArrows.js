import React from "react";
import PropTypes from "prop-types";
import nextarrow from "@/app/assets/right.webp";
import UI from "@/app/constants/ui";
import Image from "next/image";

function CustomNextArrows({ currentSlide, slideCount, isNotGray, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`slide-arrow next-arrow ${isNotGray ? "" : "gray_arrow"} `}
    >
      <div className="arrows next">
        <Image
          src={nextarrow}
          alt={UI.ALT_CUSTOM_NEXT_ARROW}
          className="next"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
}

CustomNextArrows.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
  isNotGray: PropTypes.bool,
};

CustomNextArrows.defaultProps = {
  currentSlide: 0,
  slideCount: 1,
  isNotGray: false,
};
export default CustomNextArrows;
