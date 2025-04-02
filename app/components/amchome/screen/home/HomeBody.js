import React, { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/styles/header.css";
import "@/app/styles/home-body.css";
import config from "@/app/config/config";

import Reasons from "./Reasons";
import Demo from "./Demo";
import Feature from "./Feature";
import Companies from "@/app/job-seeker/Companies";
import Stats from "./Stats";
import USP from "./USP";
import Testimonials from "@/app/job-seeker/Testimonials";
import Videos from "@/app/job-seeker/Videos";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import AboutAMC from "@/app/job-seeker/AboutAMC";
import Benefits from "@/app/job-seeker/Benefits";
import BlogPage from "@/app/pages/Blog/BlogPage";
import Loader from "@/app/loader";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import Image from "next/image";

export default async function HomeBody() {
  let skillsData = [];
  try {
    const response = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_SKILLS}`
    );
    if (response.ok) {
      skillsData = await response.json();
    } else {
      console.error(`Error fetching demo data: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching demo data:", error);
  }

  // Pass the fetched data to a client component or render accordingly
  return <HomeBodyClient skillsdata={skillsData} />;
}

const HomeBodyClient = ({ skillsdata }) => {
  return (
    <section className="header-css section full-body-tab">
      <div className="container">
        <div className="tab-section">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-employees"
              role="tabpanel"
              aria-labelledby="nav-employees-tab"
              tabIndex="0"
            >
              <AboutAMC role={LOGIN_TYPE.CANDIDATE} />
              <USP role={LOGIN_TYPE.CANDIDATE} showHeading />
              <Stats role={LOGIN_TYPE.CANDIDATE} />
              <Demo role={LOGIN_TYPE.CANDIDATE} />
              <Feature role={LOGIN_TYPE.CANDIDATE} />
              {skillsdata && skillsdata.length > 0 && (
                <div className="client_section">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="left_wrapper">
                        <p>{UI.EMPLOYER_SKILLS_SECTION_TITLE}</p>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="logos_sec">
                        <ul>
                          {skillsdata.map((skill, index) => (
                            <li key={index}>
                              <Image
                                src={`${config.ROUTE_BASE}${skill.image}`}
                                alt={UI.ALT_SKILLSET_IMAGE}
                                width={0}
                                height={0}
                                sizes="260vw"
                                style={{ width: "79%", height: "100%" }}
                                loading="lazy"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Reasons role={LOGIN_TYPE.CANDIDATE} />
              <Benefits />
              <Companies role={LOGIN_TYPE.CANDIDATE} />
              <Testimonials role={LOGIN_TYPE.CANDIDATE} />
              <Videos role={LOGIN_TYPE.CANDIDATE} />
              <Suspense fallback={<Loader />}>
                <BlogPage role={LOGIN_TYPE.CANDIDATE} />
              </Suspense>
              {/* <CaseStudies role={LOGIN_TYPE.CANDIDATE} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
