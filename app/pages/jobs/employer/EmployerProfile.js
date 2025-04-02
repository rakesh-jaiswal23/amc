import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import UI from '../../../constants/ui';
import {
  getCompanySize,
  getCompanyStage,
  getEngineerSize,
  getFunding,
} from '../../../formatter/commonBootstrap';
import { getDateInMMMYY } from '../../../formatter/date';
import { EMPTY_OBJECT } from '../../../constants';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import LabelValueView from '../../../components/labelValueView';
import Content from '../../../components/content';
import { getLoginDetailFromSession } from '../../../helpers/sessionDetails';
import ReportAbuseDialog from '../../../components/reportAbuseDialog/reportAbuseDialog';
import { setShowLoginDialog } from '../../../../redux/userSlice';

function EmployerProfile(props) {
  const { employerDetail: employer, loading } = props;
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <ReportAbuseDialog
        entityId={employer.id}
        reportAboutId={2}
        openReportDialog={openReportDialog}
        setOpenReportDialog={setOpenReportDialog}
      />
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress size="2rem" />
        </div>
      ) : employer !== EMPTY_OBJECT ? (
        <div className="px-3 pb-4">
          <HeadingLabelValueView label={UI.COMPANY_DETAILS}>
            <LabelValueView
              condition={employer?.tagline}
              label={UI.COMPANY_TAGLINE}
              value={employer.tagline}
            />

            <LabelValueView
              condition={employer?.brief}
              label={UI.COMPANY_BRIEF}
              value={employer.brief}
              isValueHTML
            />

            <LabelValueView
              condition={employer?.founded}
              label={UI.FOUNDED_ON}
              value={getDateInMMMYY(employer.founded)}
            />
          </HeadingLabelValueView>

          <HeadingLabelValueView label={UI.CONTACT_DETAILS}>
            <LabelValueView
              condition={employer?.address}
              label={UI.ADDRESS}
              value={employer.address}
            />

            <LabelValueView
              condition={employer?.city?.name}
              label={UI.CITY}
              value={employer?.city?.name}
            />

            <LabelValueView
              condition={employer?.website}
              label={UI.WEBSITE}
              value={
                <a
                  className="ms-1"
                  href={
                    employer?.website.startsWith('http')
                      ? employer?.website
                      : `https://${employer?.website}`
                  }
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {employer?.website}
                </a>
              }
            />
          </HeadingLabelValueView>

          <HeadingLabelValueView label={UI.OTHER_DETAILS}>
            <LabelValueView
              condition={employer?.companysize}
              label={UI.COMPANY_SIZE}
              value={getCompanySize(employer.companysize)}
            />

            <LabelValueView
              condition={employer?.funding}
              label={UI.FUNDING}
              value={getFunding(employer.funding)}
            />

            <LabelValueView
              condition={employer?.companystage}
              label={UI.COMPANY_STAGE}
              value={getCompanyStage(employer.companystage)}
            />

            <LabelValueView
              condition={employer?.engineersize}
              label={UI.ENGINEERS_SIZE}
              value={getEngineerSize(employer.engineersize)}
            />

            <LabelValueView
              condition={employer?.techstack}
              label={UI.TECHNOLOGY_STACK}
              value={employer?.techstack?.join(', ')}
            />

            <LabelValueView
              condition={
                employer?.linkedin ||
                employer?.facebook ||
                employer?.twitter ||
                employer?.instagram
              }
              label={UI.SOCIAL}
              value={
                <>
                  <Content condition={employer?.linkedin}>
                    <a
                      href={employer?.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <LinkedInIcon />
                    </a>
                  </Content>
                  <Content condition={employer?.facebook}>
                    <a
                      href={employer?.facebook}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <FacebookIcon />
                    </a>
                  </Content>

                  <Content condition={employer?.twitter}>
                    <a
                      href={employer?.twitter}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <TwitterIcon />
                    </a>
                  </Content>

                  <Content condition={employer?.instagram}>
                    <a
                      href={employer?.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <InstagramIcon />
                    </a>
                  </Content>
                </>
              }
            />
          </HeadingLabelValueView>
          <hr />
          {getLoginDetailFromSession() != null && (
            <div className="float-right p-1" style={{ float: 'right' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenReportDialog(true);
                }}
              >
                Report Employer
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center my-2 px-2">
          <span className="headline-6-bold">
            Login to claim this company and fill details{' '}
          </span>
          <Button
            variant="contained"
            onClick={() => dispatch(setShowLoginDialog())}
            className="my-2"
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
}

EmployerProfile.propTypes = {
  employerDetail: PropTypes.object,
  loading: PropTypes.bool,
};

EmployerProfile.defaultProps = {
  employerDetail: EMPTY_OBJECT,
  loading: false,
};

export default EmployerProfile;
