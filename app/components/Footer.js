"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "@/app/styles/header.css";
import "@/app/styles/footer.css";
// import { Link } from "react-router-dom";
import logo from "@/app/assets/logo.webp";
import {
  footerCopyWriteText,
  footerElement,
  footerTabsTitle,
  footerTitle,
} from "@/app/constants/footerItems";
import FeedbackForm from "@/app/components/feedbackForm/NewFeedbackForm";
import { EMPTY_ARRAY } from "../../app/constants";
import { getLoginDetailFromSession } from "@/app/helper/sessionDetails";
import LOGIN_TYPE from "../../app/constants/loginType";
import UI from "../../app/constants/ui";
import URL from "../../app/constants/urls";
import STORAGE_KEY from "../../app/constants/storageKey";
import COMMON_STYLE from "@/app/constants/commonStyle";
import EmployerCompayReviewInputField from "@/app/pages/jobs/employer/EmployerCompayReviewInputField";
import useWindowSize from "../../app/hooks/useWindowSize";
import { MOBILE_SCREEN_WIDTH } from "../../app/constants/screenSize";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Footer() {
  const checkContactUs = (searchParam) => {
    const urlParams = new URLSearchParams(searchParam);
    const contactUs = urlParams.get("contact_us");
    if (contactUs) return true;
    return false;
  };
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

useEffect(() => {
  setIsFeedbackVisible(checkContactUs(window?.location.search) || false);
}, []);
  const [loggedInUserRole, setLoggedInUserRole] = useState(
    getLoginDetailFromSession()?.role
  );
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState(-1);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedInUserRole(getLoginDetailFromSession()?.role);
    };
    if(typeof window !== "undefined"){
    window?.addEventListener("storage", handleStorageChange); 
    }
    return () => {
      if (typeof window !== "undefined"){

        window?.removeEventListener("storage", handleStorageChange);
      }
    };
  }, EMPTY_ARRAY);

  const onClickOnCandidateFooterURL = (value) => {
    if(typeof window !== "undefined"){
    const companyNameAndIdFromLocal = localStorage.getItem(
      STORAGE_KEY.LAST_REVIEW_SEARCH
    );
  }
    if (!companyNameAndIdFromLocal && value.url === URL.EMPLOYER_DETAILS) {
      setShouldShowDialog(true);
    } else if (
      companyNameAndIdFromLocal &&
      value.url === URL.EMPLOYER_DETAILS
    ) {
      const parsedCompanyNameAndId = JSON.parse(companyNameAndIdFromLocal);
      router.push(
        `${URL.EMPLOYER_DETAILS}?companyId=${parsedCompanyNameAndId?.id}`,
        {
          state: { isFooterLink: true },
        }
      );
    } else {
      router.push(value.url);
    }
  };

  const onClickOnSearch = () => {
    router.push(`${URL.EMPLOYER_DETAILS}?companyId=${companyId}`, {
      state: { isFooterLink: true },
    });
    setShouldShowDialog(false);
  };
  const renderDialog = () => (
    <Dialog
      open={shouldShowDialog}
      onClose={() => setShouldShowDialog(false)}
      aria-labelledby="forms"
      maxWidth="md"
    >
      <div style={{ width: windowWidth > MOBILE_SCREEN_WIDTH && 625 }}>
        <DialogTitle id="alert-dialog-title">
          <Typography component="span" sx={{ fontSize: "1.25rem" }}>
            {UI.COMPANY_REVIEWS}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setShouldShowDialog(false)}
            sx={COMMON_STYLE.DIALOG_HEADING}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers component="div" sx={{ padding: "30px 36px" }}>
          <div
            className={`d-flex ${
              windowWidth < MOBILE_SCREEN_WIDTH ? "flex-column" : "flex-row"
            } justify-content-center`}
          >
            <div className="me-1 d-flex align-items-center">
              {UI.SEARCH_COPANY_REVIEWS}:&nbsp;
            </div>
            <EmployerCompayReviewInputField
              company={company}
              companyId={companyId}
              onClickOnSearch={onClickOnSearch}
              setCompany={setCompany}
              setCompanyId={setCompanyId}
            />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
  return (
    <footer className="header-css footer footerMainContainer">
      <div className="container custom-container">
        <div className="footerContainer">
          <div className="col-lg-4 col-md-12 ">
            <div className="footer_logo_wrap footer_mobile_wrap">
              <div className="top-wrap">
                <img
                  src={logo.src}
                  alt={UI.ALT_ALIGNMYCAREER}
                  width="52%"
                  height="30%"
                  loading="lazy"
                  title={UI.ALT_ALIGNMYCAREER}
                />
                <p>{footerTitle}</p>
              </div>
              <div className="bottom-wrap desktop-view">
                <ul className="social-link">
                  <li>
                    <a
                      href="https://www.facebook.com/Alignmycareerofficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="facebook"
                    >
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/alignmycareerdotcom/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="instagram"
                    >
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/alignmycareer_"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="twitter"
                    >
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/alignmycareer-by-jobihood/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="linkedin"
                    >
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footerItemContainer">
            <div className=" col-md-3 col-sm-6 col-6 ">
              <div className="footer-page-link">
                <h6>{footerTabsTitle.company}</h6>
                <ul>
                  {footerElement.map((eachElement, index) =>
                    eachElement.id === "about" ||
                    eachElement.id === "privacy" ||
                    eachElement.id === "cookie" ||
                    eachElement.id === "affiliateProgram" ? (
                      <li key={index}>
                        <a
                          href={`${URL.INFORMATION}/${eachElement.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {eachElement.label}
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
            {!loggedInUserRole || loggedInUserRole === LOGIN_TYPE.CANDIDATE ? (
              <div className=" col-md-3 col-sm-6 col-6 ">
                <div className="footer-page-link">
                  <h6>{footerTabsTitle.jobSeeker}</h6>
                  <ul>
                    {footerElement.map((eachElement, index) =>
                      (eachElement.id === "register" &&
                        loggedInUserRole !== LOGIN_TYPE.CANDIDATE) ||
                      eachElement.id === "findJob" ||
                      eachElement.id === "assessments" ||
                      eachElement.id === "companyReviews" ||
                      eachElement.id === "mockInterviews" ? (
                        <li key={index} style={{ lineHeight: "37px" }}>
                          <span
                            style={{
                              fontSize: "17px",
                              fontWeight: 500,

                              transition: "all 0.5s ease",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            className="footer-link"
                            onClick={() =>
                              onClickOnCandidateFooterURL(eachElement)
                            }
                          >
                            {eachElement.label}
                          </span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
            {!loggedInUserRole || loggedInUserRole === LOGIN_TYPE.EMPLOYER ? (
              <div className=" col-md-3 col-sm-6 col-6 ">
                <div className="footer-page-link">
                  <h6>{footerTabsTitle.employer}</h6>
                  <ul>
                    {footerElement.map((eachElement, index) =>
                      (eachElement.id === "register" &&
                        loggedInUserRole !== LOGIN_TYPE.EMPLOYER) ||
                      eachElement.id === "findTalent" ||
                      eachElement.id === "employerAssessments" ||
                      eachElement.id === "aiInterviews" ? (
                        <li key={index}>
                          <Link href={eachElement.url}>
                            {eachElement.label}
                          </Link>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
            <div className=" col-md-3 col-sm-6 col-6">
              <div className="footer-page-link">
                <h6>{footerTabsTitle.policy}</h6>
                <ul>
                  {footerElement.map((eachElement, index) =>
                    eachElement.id === "terms" ? (
                      <li key={index}>
                        <a
                          href={`${URL.INFORMATION}/${eachElement.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {eachElement.label}
                        </a>
                      </li>
                    ) : eachElement.id === "feedback" ? (
                      <li key={index}>
                        <span
                          onClick={() => {
                            setIsFeedbackVisible(true);
                          }}
                        >
                          <a href={eachElement.url}>{eachElement.label}</a>
                        </span>
                      </li>
                    ) : eachElement.id === "pricing" ? (
                      <li key={index}>
                        <Link
                          href={
                            !loggedInUserRole
                              ? URL.PRICING_DASHBOARD
                              : loggedInUserRole === LOGIN_TYPE.EMPLOYER
                              ? URL.PRICING_DASHBOARD
                              : `${URL.INFORMATION}/${eachElement.id}`
                          }
                          target={
                            loggedInUserRole === LOGIN_TYPE.CANDIDATE
                              ? "_blank"
                              : ""
                          }
                        >
                          {eachElement.label}
                        </Link>
                      </li>
                    ) : eachElement.id === "faq" ? (
                      <li key={index}>
                        <Link href={eachElement.url}>{eachElement.label}</Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer_logo_wrap footer_mobile_wrap mobile-view col-md-12">
            <div className="bottom-wrap">
              <ul className="social-link">
                <li>
                  <a
                    href="https://www.facebook.com/Alignmycareerofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/alignmycareerdotcom/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/alignmycareer_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/alignmycareer-by-jobihood/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <FeedbackForm
          isOpen={isFeedbackVisible}
          onClose={() => setIsFeedbackVisible(false)}
        />
        {shouldShowDialog && renderDialog()}
      </div>
      <div className="footer-bottom">
        <p> {footerCopyWriteText}</p>
      </div>
    </footer>
  );
}

export default Footer;
