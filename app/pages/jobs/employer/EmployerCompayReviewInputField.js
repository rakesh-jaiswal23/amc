"use client";
import { noop } from 'lodash';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import AutoSuggestion from '@/app/components/AutoSuggestion';
import UI from '@/app/constants/ui';
import { DEFAULT_COMPANY_ID } from '@/app/constants';

function EmployerCompayReviewInputField(props) {
  const { onClickOnSearch, company, companyId, setCompany, setCompanyId } =
    props;
  const methods = useForm();
  const { control } = methods;
  const setCompanyWithId = (object) => {
    setCompany(object?.label || object?.name || object);
    setCompanyId(object?.id || DEFAULT_COMPANY_ID);
  };
  return (
    <div className="d-flex">
      <div style={{ width: '250px' }}>
        <AutoSuggestion
          id="company"
          name="company"
          values={company}
          setValues={setCompanyWithId}
          placeholder={UI.SEARCH_BY_COMPANY_PLACEHOLDER}
          control={control}
        />
      </div>
      <Button
        variant="contained"
        style={{
          marginLeft: -4,
          padding: '5px 15px',
          backgroundColor:
            (companyId === undefined || companyId === -1) && 'lightgrey',
        }}
        onClick={onClickOnSearch}
        disabled={companyId === undefined || companyId === -1}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}

EmployerCompayReviewInputField.propTypes = {
  onClickOnSearch: PropTypes.func,
  company: PropTypes.string,
  companyId: PropTypes.number,
  setCompany: PropTypes.func,
  setCompanyId: PropTypes.func,
};

EmployerCompayReviewInputField.defaultProps = {
  onClickOnSearch: noop,
  company: '',
  companyId: -1,
  setCompany: noop,
  setCompanyId: noop,
};

export default EmployerCompayReviewInputField;
