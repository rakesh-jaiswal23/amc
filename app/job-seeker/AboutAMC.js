import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import URL from "@/app/constants/urls";
import Image from "next/image";
import config from "@/app/config/config";

async function AboutAMC({ role }) {

  let aboutdata = null;
  
  try {
    const response = await fetch(`${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_ABOUT}${role}`);
    if (!response.ok) {
      throw new Error(`Error fetching skills: ${response.statusText}`);
    }
    aboutdata = await response.json();
  } catch (error) {
    console.error('Failed to fetch skills:', error);
  }

  return (
    <section
      className={`section time-consuming-sec ${role === LOGIN_TYPE.EMPLOYER && "recruiters_heading pb-0"
        }`}
    >
      <div className="container">
        {aboutdata ? (
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="section-heading">
                <h1 className="section_head">{aboutdata.title}</h1>
                <Image
                  src={`${config.ROUTE_BASE}${aboutdata?.image}`}
                  alt={UI.ALT_CANDIDATEPAGE_IMAGE}
                  layout="intrinsic"
                  width={1000}
                  height={1000}               
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="right-para">
                <p>{aboutdata.description}</p>
                <Link
                  href={`${config.ROUTE_BASE}${URL.LOGIN}`}
                  rel="noopener noreferrer"
                  className="white-btn"
                >
                  {UI.CREATE_YOUR_ACCOUNT}
                  <span /> <span /> <span /> <span />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="skeleton-view">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="section-heading">
                  <Skeleton
                    variant="text"
                    width={450}
                    height={90}
                    className="section_head"
                  />
                  <Skeleton variant="rectangular" width={460} height={248} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="right-para">
                  <Skeleton variant="rectangular" width={430} height={400} />
                  <Skeleton
                    variant="rounded"
                    width={203}
                    height={42}
                    style={{ marginTop: 20 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

AboutAMC.propTypes = {
  role: PropTypes.number.isRequired,
};

export default AboutAMC;
