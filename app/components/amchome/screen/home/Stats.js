import PropTypes from "prop-types";
import LOGIN_TYPE from "@/app/constants/loginType";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import config from "@/app/config/config";

async function Stats({ role }) {
  let statsdata = [];

  try {
    const response = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_STATS}${role}`,
    );
    if (response.ok) {
      statsdata = await response.json();
    } else {
      console.error(`Error fetching stats: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

  return (
    <div>
      {statsdata.length > 0 ? (
        <div className="section top_companies">
          <div className="container">
            <div className="section-heading centred">
              <h3 className="section_head">
                {role === LOGIN_TYPE.CANDIDATE ? (
                  <>
                    Get the Best IT and Management
                    <br /> Jobs with AlignMyCareer
                  </>
                ) : (
                  <>
                    One-Stop Solution for <br />
                    Recruiters
                  </>
                )}
              </h3>
            </div>
            <div className="row" style={{ rowGap: 20 }}>
              {statsdata.map((stat, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
                  <div className="companies_card pink_card">
                    <h6>{stat.title}</h6>
                    <p>{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border_div" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

Stats.propTypes = {
  role: PropTypes.number,
};

Stats.defaultProps = {
  role: LOGIN_TYPE.CANDIDATE,
};

export default Stats;
