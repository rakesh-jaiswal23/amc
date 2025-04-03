"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import { getRequest } from "../services";
import img6 from "@/app/assets/img-6.webp";
import { MAINPAGE_API_URL } from "../constants/apiUrls";
import UI from "../constants/ui";
import Image from "next/image";

function WhyAMC(props) {
  const { role } = props;

  const [whyamcdata, setWhyamcdata] = useState([]);
  const [activeIndex, setActiveIndex] = useState("0");

  useEffect(() => {
    if (!role) return;
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_WHY_AMC}${role}`).then((data) => {
      setWhyamcdata(data);
    });
  }, [role]);

  const handleAccordionToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      {whyamcdata.length > 0 ? (
        <section className="align_my_career_section">
          <div className="container">
            <div className="section-heading centred">
              <h2 className="section_head">{UI.WHY_ALIGN_MY_CAREER}</h2>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="left-wrapp">
                  <Image
                    width={577}
                    height={376}
                    layout="intrinsic"
                    src={img6.src}
                    alt={UI.ALT_MYCAREER_IMAGE}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-wrapp">
                  <Accordion activeKey={activeIndex}>
                    {whyamcdata.map((item, index) => (
                      <Accordion.Item
                        eventKey={index.toString()}
                        key={index}
                        onClick={() => handleAccordionToggle(index.toString())}
                      >
                        <Accordion.Header className="btn_one">
                          {item.title}
                          <i className="fa fa-caret-down" />
                        </Accordion.Header>
                        <Accordion.Body className="open_one show">
                          <p>{item.description}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

WhyAMC.propTypes = {
  role: PropTypes.number,
};
WhyAMC.defaultProps = {
  role: 1,
};

export default WhyAMC;
