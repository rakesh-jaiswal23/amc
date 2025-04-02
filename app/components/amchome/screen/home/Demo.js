import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import "@/app/styles/job-seeker-page.css";
import mobile from "@/app/assets/mobile.webp";
import approach from "@/app/assets/approach.webp";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import URL from "@/app/constants/urls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import Image from "next/image";
import config from "@/app/config/config"; // Ensure this provides your API_BASE

async function Demo({ role }) {
  let demodata = {};

  // Only fetch demo data if role is candidate
  if (role === LOGIN_TYPE.CANDIDATE) {
    try {
      const response = await fetch(
        `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_DEMO}${role}`
      );
      if (response.ok) {
        demodata = await response.json();
      } else {
        console.error(`Error fetching demo data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching demo data:", error);
    }
  }

  return (
    <>
      {role === LOGIN_TYPE.CANDIDATE && (
        <section className="job_opportunitie">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="left_wrapper">
                  <img
                    src={mobile.src}
                    alt={UI.ALT_APPROACH_SECTION_HOME_IMAGE}
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="right_wrapper">
                  <div className="section-heading">
                    <h3 className="section_head">{demodata?.title}</h3>
                    <p>{demodata?.description}</p>
                    <Link
                      href={URL.REGISTER}
                      rel="noopener noreferrer"
                      className="white-btn"
                    >
                      {UI.REGISTER}
                      <span /> <span /> <span /> <span />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {role === LOGIN_TYPE.EMPLOYER && (
        <div className="full-body-tab recruiters_approach">
          <div className="section approach_section">
            <div className="container">
              <div className="row left_inner_one_row">
                <div className="col-lg-6">
                  <div className="left_inner">
                    <p>{UI.EMPLOYER_APPROACH_SECTION_TITLE}</p>
                    <Link
                      href={URL.LOGIN}
                      rel="noopener noreferrer"
                      className="white-btn"
                    >
                      {UI.START_HIRING}
                      <span /> <span /> <span /> <span />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    src={approach.src}
                    alt={UI.ALT_APPROACH_SECTION_HOME_IMAGE}
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Demo.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Demo;
