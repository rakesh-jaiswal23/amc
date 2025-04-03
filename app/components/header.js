"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/styles/globals.css";  // Ensure global styles are loaded

import "@/app/styles/responsive.css";
import "@/app/styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import URL from "@/app/constants/urls";
import logo from "@/app/assets/logo.webp";
import UI from "@/app/constants/ui";
import NewTag from "@/app/components/newTag/NewTag";
import Image from "next/image";
import config from "../config/config";

export default function Header() {
  const [show, setShow] = useState(false);
  const [forEmployers, setForEmployers] = useState(false);
  const pathname = usePathname();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLinkClick = () => {
    setForEmployers(!forEmployers);
  };

  const renderTheNavItemNames = () => {
    if (pathname === URL.JOB_SEEKER || pathname === "/next/home") {
      return UI.FOR_RECRUITERS;
    }
    return UI.FOR_JOB_SEEKERS;
  };

  const renderTheNavItemlink = () => {
    if (
      pathname === URL.JOB_SEEKER ||
      pathname === URL.HOME ||
      pathname === "/next/home"
    ) {
      return URL.RECRUITERS;
    }
    return URL.JOB_SEEKER;
  };

  // Provide fallbacks for other environment variables as well
  const blogLink = `${config.ROUTE_BASE}/blog`;
  const loginLink = `${config.ROUTE_BASE}/login`;
  const registerLink = `${config.ROUTE_BASE}/register`;

  return (
    <>
      <header
        className="theme_header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 1px 2px rgba(0,0,0,.12)",
        }}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link href="/" legacyBehavior>
              <a>
                <Image
                  src={logo.src}
                  alt={UI.ALT_ALIGNMYCAREER}
                  width={190}
                  height={40}
                  // style={{objectFit:"contain"}}
                  // layout="intrinsic"
                  loading="lazy"
                  title={UI.ALT_ALIGNMYCAREER}
                />
              </a>
            </Link>
            <Button
              variant="primary"
              onClick={handleShow}
              className="nav_toggler"
              style={{
                border: "none",
                borderRadius: "0",
                backgroundColor: "transparent",
                // padding: "8px",
              }}
            >
              <span
                className="navbar-toggler-icon"
                style={{ height: "25.6px", width: "40px" }}
              />
            </Button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form className="d-flex" role="search">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {pathname !== URL.BLOG_PAGE && (
                    <li
                      className="nav-item"
                      style={{ width: "7rem", position: "relative" }}
                    >
                      <Link href={blogLink} legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                          {UI.BLOG_PAGE}
                        </a>
                      </Link>
                      <span
                        style={{
                          marginLeft: "4px",
                          position: "absolute",
                          top: "-5px",
                        }}
                      >
                        <NewTag />
                      </span>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link href={renderTheNavItemlink()} legacyBehavior>
                      <a onClick={handleLinkClick}>{renderTheNavItemNames()}</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href={loginLink} legacyBehavior>
                      <a className="transparent-btn" rel="noopener noreferrer">
                        {UI.LOGIN_HOME_PAGE}
                        <span /> <span /> <span /> <span />
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={registerLink} legacyBehavior>
                      <a className="white-btn" rel="noopener noreferrer">
                        {UI.SIGNUP}
                        <span /> <span /> <span /> <span />
                      </a>
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>

        <Offcanvas show={show} onHide={handleClose} className="header-css">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link href="/" legacyBehavior>
                <a className="navbar-brand">
                  <Image
                    src={logo}
                    alt={UI.ALT_ALIGNMYCAREER}
                    // sizes="100vw"
                    // Make the image display full width
                    // style={{
                    //   width: '100%',
                    //   height: '100%',
                    // }}
                    loading="lazy"
                    title={UI.ALT_ALIGNMYCAREER}
                  />
                </a>
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <nav className="navbar navbar-expand-lg mobile_menu">
              <div className="container w-100">
                <form className="d-flex w-100" role="search">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                    <li className="nav-item list">
                      <Link href={renderTheNavItemlink()} legacyBehavior>
                        <a
                          onClick={handleLinkClick}
                          className="nav-link navigation"
                          aria-current="page"
                        >
                          {renderTheNavItemNames()}
                        </a>
                      </Link>
                      {pathname !== URL.BLOG_PAGE && (
                        <li
                          className="nav-item"
                          style={{ width: "7rem", position: "relative" }}
                        >
                          <Link href={blogLink} legacyBehavior>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              {UI.BLOG_PAGE}
                            </a>
                          </Link>
                          <span
                            style={{ marginLeft: "4px", position: "absolute" }}
                          >
                            <NewTag />
                          </span>
                        </li>
                      )}
                    </li>

                    <div className="d-flex mobile-button">
                      <li className="nav-item">
                        <Link href={loginLink} legacyBehavior>
                          <a
                            className="transparent-btn"
                            rel="noopener noreferrer"
                          >
                            {UI.LOGIN_HOME_PAGE}
                            <span /> <span /> <span /> <span />
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href={registerLink} legacyBehavior>
                          <a className="white-btn" rel="noopener noreferrer">
                            {UI.SIGNUP}
                            <span /> <span /> <span /> <span />
                          </a>
                        </Link>
                      </li>
                    </div>
                  </ul>
                </form>
              </div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </header>
    </>
  );
}
