import React, { Suspense } from "react";

import Header from "../components/header";
import Demo from "../components/amchome/screen/home/Demo";

import WhyAMC from "./WhyAMC";
import USP from "../components/amchome/screen/home/USP";
import Testimonials from "../job-seeker/Testimonials";
import AboutAMC from "../job-seeker/AboutAMC";
import Videos from "../job-seeker/Videos";
import ProudUsers from "./ProudUsers";
import LOGIN_TYPE from "../constants/loginType";
import Companies from "../job-seeker/Companies";
import CaseStudies from "../components/amchome/screen/home/CaseStudies";
import Stats from "../components/amchome/screen/home/Stats";
import "@/app/styles/header.css";
import "@/app/styles/home-body.css";
import "./recruiters.css";
import Reasons from "../components/amchome/screen/home/Reasons";
import AssessmentsStats from "../components/amchome/screen/home/AssessmentsStats";
import BannerSlide from "../components/amchome/screen/home/BannerSlide";
import BlogPage from "../pages/Blog/BlogPage";
import Benefits from "./Benefits";

import Loader from "../loader";

export default function HomeBody() {
  return <HomeBodyClient />;
}

// Client-side component
const HomeBodyClient = () => {
  return (
    <div className="header-css">
      <Header />

      <BannerSlide role={LOGIN_TYPE.EMPLOYER} />
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
                <AboutAMC role={LOGIN_TYPE.EMPLOYER} />
                <USP role={LOGIN_TYPE.EMPLOYER} showHeading />
                <AssessmentsStats role={LOGIN_TYPE.EMPLOYER} />
                <WhyAMC role={LOGIN_TYPE.EMPLOYER} />
                <Stats role={LOGIN_TYPE.EMPLOYER} />
                <Demo role={LOGIN_TYPE.EMPLOYER} />
                <Reasons role={LOGIN_TYPE.EMPLOYER} />
                <Benefits />
                <Companies role={LOGIN_TYPE.EMPLOYER} />
                <ProudUsers />
                <Testimonials role={LOGIN_TYPE.EMPLOYER} />
                <Videos role={LOGIN_TYPE.EMPLOYER} />
                {/* <Blogs role={LOGIN_TYPE.EMPLOYER} /> */}

                <CaseStudies role={LOGIN_TYPE.EMPLOYER} />
                <Suspense fallback={<Loader />}>
                  <BlogPage role={LOGIN_TYPE.EMPLOYER} />
                </Suspense>
                {/* <CaseStudies role={LOGIN_TYPE.CANDIDATE} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
