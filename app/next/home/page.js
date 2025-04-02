import React from "react";

import BannerSlide from "@/app/components/amchome/screen/home/BannerSlide";
import LOGIN_TYPE from "@/app/constants/loginType";
import HomeBody from "../../components/amchome/screen/home/HomeBody";
import Header from "../../components/header";

function Home() {
  return (
    <div className="header-css">
      <Header />
      <BannerSlide role={LOGIN_TYPE.CANDIDATE} />
      <HomeBody />
    </div>
  );
}

export default Home;
