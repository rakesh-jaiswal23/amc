import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';
import Popover from '@mui/material/Popover';
import UI from '../../../constants/ui';
import getStarColor from './Employer.helper';
import { getAspectRatingNameByID } from '../../../formatter/commonBootstrap';
import useWindowSize from '../../../hooks/useWindowSize';
import { DEFAULT_RATING_VALUE } from '../../../constants';
import { MOBILE_SCREEN_WIDTH } from '../../../constants/screenSize';

function EmployerReviewDetailsPopUp(props) {
  const { anchorEl, categoryRatings, selectedRating } = props;
  const { windowWidth } = useWindowSize();
  const open = Boolean(anchorEl);
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      disableRestoreFocus
      PaperProps={{
        elevation: 1,
        boxShadow: '0px 2px 6px -2px rgba(0, 106, 194, 0.2)',
      }}
      disableScrollLock
    >
      <div style={{ padding: '20px 14px' }}>
        <div className="d-flex flex-column mb-4">
          <h6>{UI.OVERALL_RATING}</h6>
          <Rating
            name="custom-rating"
            value={selectedRating / 100}
            precision={0.5}
            readOnly
            sx={{
              color: getStarColor(selectedRating / 100),
            }}
          />
          <span style={{ paddingLeft: 8 }}>{`${
            selectedRating / 100
          } out of ${DEFAULT_RATING_VALUE}`}</span>
        </div>
        <h6 className="my-2">{UI.CATERGORY_RATINGS}</h6>
        <div
          style={
            windowWidth < MOBILE_SCREEN_WIDTH
              ? {
                  display: 'grid',
                  gridTemplateColumns: '220px',
                  rowGap: 7,
                  marginTop: 5,
                }
              : {
                  display: 'grid',
                  gridTemplateColumns: '220px 220px',
                  rowGap: 7,
                  marginTop: 5,
                }
          }
        >
          {categoryRatings?.map((eachItem) => (
            <div key={eachItem.id} className="d-flex align-items-center">
              <StarIcon
                fontSize="inherit"
                sx={{
                  color: getStarColor(eachItem.rating / 100),
                }}
                style={{ marginRight: '4px', marginBottom: '4px' }}
              />
              <div
                style={{ marginRight: 10, width: '7%' }}
                className="subtitle-2-bold"
              >
                {eachItem.rating / 100}
              </div>
              <div className="subtitle-2">
                {getAspectRatingNameByID(eachItem.id)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
}

EmployerReviewDetailsPopUp.propTypes = {
  anchorEl: PropTypes.object,
  categoryRatings: PropTypes.array,
  selectedRating: PropTypes.number,
};

EmployerReviewDetailsPopUp.defaultProps = {
  anchorEl: null,
  categoryRatings: [],
  selectedRating: null,
};

export default EmployerReviewDetailsPopUp;
