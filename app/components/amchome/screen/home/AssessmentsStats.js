import React from "react";
import PropTypes from "prop-types";
import { getRequest } from "@/app/services";

import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import config from "@/app/config/config";

async function AssessmentsStats({ role }) {
  console.log(role);
  // const [assessmentsStatsData, setAssessmentsStatsData] = useState([]);
  let assessmentsStatsData = [];

  if (role === LOGIN_TYPE.EMPLOYER) {
    try {
      const response = await fetch(
        `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_ASSESSMENT_STATS}${role}`
      );
      if (response.ok) {
        assessmentsStatsData = await response.json();
        console.log(assessmentsStatsData);
      } else {
        console.error(`Error fetching assessments stats: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching assessments data:", error);
    }
  }


  return (
    <div>
      {assessmentsStatsData.length > 0 ? (
        <div className="section top_companies">
          <div className="container">
            <div className="section-heading centred">
              <h3 className="section_head">
                {role === LOGIN_TYPE.EMPLOYER && (
                  <>Complete Assessment Solution</>
                )}
              </h3>
            </div>

            <div className="row" style={{ rowGap: 20 }}>
              {assessmentsStatsData.map((stat, index) => (
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

AssessmentsStats.propTypes = {
  role: PropTypes.number,
};

AssessmentsStats.defaultProps = {
  role: LOGIN_TYPE.CANDIDATE,
};

export default AssessmentsStats;
