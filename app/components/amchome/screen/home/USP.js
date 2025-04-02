import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import PropTypes from "prop-types";
import LOGIN_TYPE from "@/app/constants/loginType";
import config from "@/app/config/config";
import USPClient from "./USPClient";

async function USP(props) {
  const { role, showHeading } = props;

  let uspdata = [];
  let selectedUSP = null;

  try {
    const response = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_USP}${role}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching skills: ${response.statusText}`);
    }
    uspdata = await response.json();
    selectedUSP = uspdata[0];
  } catch (error) {
    console.error("Failed to fetch skills:", error);
  }

  return (
    <USPClient
      uspdata={uspdata}
      initialSelectedUSP={selectedUSP}
      role={role}
      showHeading={showHeading}
    />
  );
}

USP.propTypes = {
  role: PropTypes.number,
  showHeading: PropTypes.bool,
};

USP.defaultProps = {
  role: 1,
  showHeading: true,
};

export default USP;
