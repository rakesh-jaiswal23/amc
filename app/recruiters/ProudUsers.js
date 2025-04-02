import React from "react";

import { MAINPAGE_API_URL } from "../constants/apiUrls";

import UI from "../constants/ui";
import config from "../config/config";
import Image from "next/image";

async function ProudUsers() {
  // const [prouduserdata, setProuduserdata] = useState([]);

  let prouduserdata = [];

  try {
    const response = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_PROUD_USERS}`
    );
    if (response.ok) {
      prouduserdata = await response.json();
    } else {
      console.error(`Error fetching prouduser stats: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching prouduser data:", error);
  }

  return (
    <div>
      {prouduserdata?.length > 0 ? (
        <div className="section recruitment-software-sec">
          <div className="container">
            <div className="section-heading centred">
              <h3 className="section_head">Proud Users of our Platform</h3>
            </div>
            <div className="row justify-content-center">
              {prouduserdata.map((prouduser, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                  <div className="inner_card">
                    <Image
                      width={100}
                      height={100}
                      src={prouduser.companylogo}
                      alt={UI.ALT_PROUDUSERS_LOGO}
                    />
                    <p>{prouduser.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProudUsers;
