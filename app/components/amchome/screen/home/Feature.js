import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";
import URL from "@/app/constants/urls";
import config from "@/app/config/config";
import Image from "next/image";

async function Feature({ role }) {
  let featureone = {};
  let featuretwo = {};

  // Fetch Feature One data
  try {
    const resOne = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_FEATURE_1}${role}`
    );
    if (resOne.ok) {
      featureone = await resOne.json();
    } else {
      console.error(`Error fetching feature one: ${resOne.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching feature one:", error);
  }

  // Fetch Feature Two data
  try {
    const resTwo = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_FEATURE_2}${role}`
    );
    if (resTwo.ok) {
      featuretwo = await resTwo.json();
    } else {
      console.error(`Error fetching feature two: ${resTwo.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching feature two:", error);
  }

  return (
    <div className="full-body-tab">
      <div className="section card_section">
        <div className="container">
          <div className="section-heading centred">
            <h2 className="section_head">
              Assess, Prepare, Upskill and Apply for Jobs on
              <br /> One Platform
            </h2>
          </div>
          <div className="card_wrap">
            <div className="row">
              <div className="col-lg-6">
                <div className="card card_one">
                  {featureone.title && (
                    <h3 className="section_head">{featureone.title}</h3>
                  )}
                  <p>{featureone.description}</p>
                  <Link
                    href={`${config.ROUTE_BASE}${URL.ASSESSMENT}`}
                    rel="noopener noreferrer"
                    className="white-btn"
                  >
                    {UI.EXPLORE_ASSESSMENTS}
                    <span /> <span /> <span /> <span />
                  </Link>
                  <div className="card_img mt-2">
                    <Image
                      src={`${config.ROUTE_BASE}${featureone.image}`}
                      alt={UI.ALT_FEATURE_IMAGE_LEFT}
                      width={1000}
                      height={300}
                      layout="intrinsic"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card card_two">
                  <div className="card_img">
                    <Image
                      src={`${config.ROUTE_BASE}${featuretwo.image}`}
                      alt={UI.ALT_FEATURE_IMAGE_RIGHT}
                      width={1000}
                      height={300}
                      layout="intrinsic"
                      loading="lazy"
                    />
                  </div>
                  {featuretwo.title && (
                    <h3 className="section_head">{featuretwo.title}</h3>
                  )}
                  <p>{featuretwo.description}</p>
                  <Link
                    href={`${config.ROUTE_BASE}${URL.MOCK_INTERVIEW}`}
                    rel="noopener noreferrer"
                    className="white-btn"
                  >
                    {UI.EXPLORE_MOCK_INTERVIEW}
                    <span /> <span /> <span /> <span />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Feature.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Feature;
