import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './EmployerReviewSort.css';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { EMPTY_OBJECT } from '../../../constants';
import { getReviewSortType } from '../../../formatter/commonBootstrap';

function EmployerReviewSortBy(props) {
  const { setSelectedId, selectedId, onSelectedDropDown } = props;
  const [selected, setSelected] = useState(false);
  const DropDownValues = getReviewSortType();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleOnMouseEnter = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleSelect = (item, event) => {
    setSelectedId(item);
    setTarget(event.target);
    setSelected(true);
  };

  useEffect(() => {
    if (selected) {
      onSelectedDropDown();
      setSelected(false);
    }
  }, [selected, onSelectedDropDown]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        style={{
          border: '1px solid grey',
          borderRadius: 20,
          position: 'relative',
        }}
        onMouseEnter={handleOnMouseEnter}
      >
        <span className="subtitle-2 color-5B5B5B">
          Sort by: <span className="color-000000">{selectedId.value}</span>{' '}
        </span>
        <span>
          <KeyboardArrowDownIcon fontSize="14px" />
        </span>
      </Button>

      <Overlay show={show} target={target} placement="bottom" container={ref}>
        <Popover
          id="popover-contained"
          style={{ marginTop: 2, borderRadius: 6 }}
          onMouseLeave={() => {
            setShow(!show);
          }}
        >
          <Popover.Body style={{ width: '160px', padding: 0 }}>
            {DropDownValues.map((item) => (
              <div
                key={item.id}
                onClick={(event) => handleSelect(item, event)}
                style={{ cursor: 'pointer', padding: '10px' }}
                className="sortBy subtitle-2"
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    marginRight: '5px',
                    borderRadius: '50%',
                    backgroundColor:
                      item.id === selectedId.id
                        ? 'rgb(238, 238, 238)'
                        : 'white',
                    visibility:
                      item.id === selectedId.id ? 'visible' : 'hidden',
                  }}
                />
                {item.value}
              </div>
            ))}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

EmployerReviewSortBy.propTypes = {
  selectedId: PropTypes.object,
  setSelectedId: PropTypes.func,
  onSelectedDropDown: PropTypes.func,
};

EmployerReviewSortBy.defaultProps = {
  selectedId: EMPTY_OBJECT,
  setSelectedId: noop,
  onSelectedDropDown: noop,
};

export default EmployerReviewSortBy;
