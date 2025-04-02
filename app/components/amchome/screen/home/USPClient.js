"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import UspButton from "./UspButton";
import Image from "next/image";
import arrow from "@/app/assets/arrow.svg";
import config from "@/app/config/config";

// If you are using a Skeleton component for placeholders, make sure to import it:
// import Skeleton from 'your-skeleton-library';

const USPClient = ({ uspdata, initialSelectedUSP, role, showHeading }) => {
  const [selectedUSP, setSelectedUSP] = useState(initialSelectedUSP);

  const handleUSPClick = (usp) => {
    setSelectedUSP(usp);
  };

  return (
    <div>
      {uspdata.length > 0 ? (
        <section className="section full-body-tab">
          <div className="container">
            {showHeading && role === LOGIN_TYPE.CANDIDATE && (
              <div className="section-heading centred">
                <h2 className="section_head">
                  {UI.CANDIDATE_SKILL_SECTION_TITLE}
                </h2>
              </div>
            )}
            {showHeading && role === LOGIN_TYPE.EMPLOYER && (
              <div className="section-heading centred">
                <h2 className="section_head">
                  {UI.EMPLOYER_SKILL_SECTION_TITLE}
                </h2>
                <div />
              </div>
            )}
            <div className="employees_tab usp_block">
              <ul
                className="nav nav-pills usp_block_nav_wrapper"
                id="pills-tab"
                role="tablist"
              >
                {uspdata.map((usp, index) => (
                  <UspButton
                    key={index}
                    usp={usp}
                    index={index}
                    isActive={usp.id === selectedUSP?.id}
                    handleUSPClick={handleUSPClick}
                  />
                ))}
              </ul>

              <div className="tab-content usp-tab-content" id="pills-tabContent">
                {selectedUSP && (
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    tabIndex="0"
                  >
                    <div className="employee_tab w-100">
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="left_wrap">
                            <div className="section-heading">
                              <span className="section_head">
                                {selectedUSP.heading}
                              </span>
                              <div className="list_item mt-3">
                                <ul>
                                  {selectedUSP?.description?.map(
                                    (detail, detailItem) => (
                                      <li key={detailItem}>
                                        <Image
                                          src={arrow}
                                          alt={UI.ALT_SKILL_TAB_LEFT}
                                          width={24}
                                          height={24}
                                        />
                                        <p>{detail.detail}</p>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="right_wrap">
                            <Image
                              src={`${config.ROUTE_BASE}${selectedUSP?.image}`}
                              alt={UI.ALT_SKILL_TAB_RIGHT}
                              layout="intrinsic"
                              width={900}
                              height={1000}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section full-body-tab">
          <div className="container">
            <div className="section-heading centred">
              {/* Replace this with your actual Skeleton component */}
              <div style={{ width: 697, height: 90, background: "#ccc" }} />
            </div>
            <div className="employees_tab usp_block d-flex flex-column">
              <ul>
                <li style={{ display: "flex", marginBottom: 25 }}>
                  <div style={{ width: 184, height: 50, background: "#ccc", marginLeft: 16 }} />
                  <div style={{ width: 184, height: 50, background: "#ccc", marginLeft: 16 }} />
                  <div style={{ width: 184, height: 50, background: "#ccc", marginLeft: 16 }} />
                  <div style={{ width: 184, height: 50, background: "#ccc", marginLeft: 16 }} />
                </li>
              </ul>
              <div className="tab-content usp-tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  role="tabpanel"
                  tabIndex="0"
                >
                  <div className="employee_tab w-100">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="left_wrap">
                          <div className="section-heading">
                            <div style={{ width: 260, height: 32, background: "#ccc" }} />
                            <div className="list_item mt-3">
                              <ul>
                                <li>
                                  <div style={{ width: 493, height: 131, background: "#ccc" }} />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div>
                          <div style={{ width: 312, height: 328, background: "#ccc" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

USPClient.propTypes = {
  uspdata: PropTypes.array.isRequired,
  initialSelectedUSP: PropTypes.object,
  role: PropTypes.number,
  showHeading: PropTypes.bool,
};

export default USPClient;
