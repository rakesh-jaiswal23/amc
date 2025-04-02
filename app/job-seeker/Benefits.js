import React from "react";
import UI from "@/app/constants/ui";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import config from "@/app/config/config";
import Image from "next/image";

async function Benefits() {
  let benefitdata = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_BENEFITS}${LOGIN_TYPE.CANDIDATE}`
    );
    if (res.ok) {
      benefitdata = await res.json();
    } else {
      console.error("Error fetching benefits:", res.statusText);
    }
  } catch (error) {
    console.error("Error fetching benefits:", error);
  }

  if (!benefitdata || benefitdata.length === 0) return null;

  return (
    <div>
      <div className="skills_intelligence">
        <section className="skills_intelligence">
          <div className="container">
            <div className="section-heading centred mb-3">
              <h3 className="section_head">{UI.JOB_SEEKER_CARD_LIST_TITLE}</h3>
            </div>
            <div className="row justify-content-center">
              {benefitdata.map((benefit, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                  <div className="Intelligence_card">
                    <div className="Intelligence_img">
                      <Image
                        src={`${config.ROUTE_BASE}${benefit.iconimage}`}
                        alt={UI.ALT_JOB_SEEKER_CARD_IMAGE}
                        width={50}
                        height={50}
                        loading="lazy"
                      />
                    </div>
                    <h6>{benefit.title}</h6>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Benefits;
