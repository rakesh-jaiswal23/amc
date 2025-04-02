"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@/app/constants';
import { getRequest } from '@/app/services';
import isStringEmpty from '@/app/helper/isStringEmpty';
import getUniqueList from '@/app/helper/uniqueList';
import VALIDATION_VALUES from '@/app/constants/validationValues';
import KEY_CODES from '@/app/constants/keyCodes';

function AutoSuggestion(props) {
  const {
    id,
    values,
    maxLength,
    setValues,
    placeholder,
    isMulti,
    isRequired,
    name,
    control,
    isSkillField,
    isCapsLockOn,
    disabled,
  } = props;
  const [keywordsTextFieldValue, setKeywordsTextFieldValue] = useState('');
  const [dataAutosuggest, setDataAutosuggest] = useState(EMPTY_ARRAY);
  const [searchKey, setSearchKey] = useState('');

  const onChange = useCallback(
    (e, valueFromAutoSuggestion) => {
      if (!valueFromAutoSuggestion) {
        setValues('');
      } else {
        setValues(valueFromAutoSuggestion);
      }
    },
    [values, setValues]
  );

  useEffect(() => {
    if (values && !isMulti) {
      if (values?.name) {
        setKeywordsTextFieldValue(values?.name);
      } else {
        setKeywordsTextFieldValue(values);
      }
    } else {
      setKeywordsTextFieldValue('');
    }
  }, [values, isMulti]);

  const isMultiField = useMemo(
    () =>
      isMulti
        ? {
            multiple: true,
            value: values,
          }
        : { value: keywordsTextFieldValue },
    [isMulti, values, keywordsTextFieldValue]
  );

  useEffect(() => {
    if (!isStringEmpty(searchKey)) {
      if (isSkillField) {
        // passing 'g' i.e. group as false here, as we dont have to show
        // technology groups like FE developer etc
        getRequest(
          `/autosuggest/tech?q=${encodeURIComponent(searchKey)}&g=false`
        ).then((tech) => {
          setDataAutosuggest(tech);
        });
      } else {
        getRequest(
          `/autosuggest/${id}?q=${encodeURIComponent(searchKey)}`
        ).then((data) => {
          setDataAutosuggest(data);
        });
      }
    }
  }, [searchKey]);

  const debouncedSetSearchKey = useCallback(
    debounce(setSearchKey, 200),
    EMPTY_ARRAY
  );

  const onInputChange = (event, newInputValue) => {
    if (!newInputValue.includes(',')) {
      if (isCapsLockOn) {
        setKeywordsTextFieldValue(newInputValue.toUpperCase());
        debouncedSetSearchKey(newInputValue.toUpperCase());
      } else {
        setKeywordsTextFieldValue(newInputValue);
        debouncedSetSearchKey(newInputValue);
      }
      if (!isMulti) {
        if (isCapsLockOn) {
          setValues(newInputValue.toUpperCase());
        } else {
          setValues(newInputValue);
        }
      }
    }
    if (isMulti) {
      const options = newInputValue.split(',');
      if (options.length > 1) {
        const allOptions = values.concat(options);
        const uniqueList = getUniqueList(allOptions);
        setValues(uniqueList);
        setKeywordsTextFieldValue('');
      } else if (isCapsLockOn) {
        setKeywordsTextFieldValue(newInputValue?.toUpperCase());
      } else {
        setKeywordsTextFieldValue(newInputValue);
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            {...isMultiField}
            id={id}
            disabled={disabled}
            freeSolo
            size="small"
            onChange={onChange}
            onKeyDown={(e) => {
              if (isMulti) {
                if (e.keyCode === KEY_CODES.COMMA_CODE && e.target.value) {
                  setValues(values.concat(e.target.value));
                }
              }
            }}
            onBlur={(event) => {
              if (
                isMulti &&
                keywordsTextFieldValue.trim() &&
                values.length === 0
              ) {
                const trimmedValue = keywordsTextFieldValue.trim();
                if (!values.includes(trimmedValue)) {
                  onChange(event, [...values, trimmedValue]);
                }
                setKeywordsTextFieldValue('');
              }
            }}
            options={dataAutosuggest?.map(
              (option) =>
                option?.dispName || {
                  id: option?.id,
                  label: option?.name,
                }
            )}
            // options={dataAutosuggest?.map((option) => {
            //   if (option?.certificateid) {
            //     return {
            //       id: option?.certificateid,
            //       label: option?.name,
            //     };
            //   }
            //   return (
            //     option?.dispName || {
            //       id: option?.id || option?.certificateid,
            //       label: option?.name,
            //     }
            //   );
            // })}
            getOptionLabel={
              (option) =>
                typeof option === 'string'
                  ? option
                  : option?.label || option?.name
              // typeof option === 'string' ? option : option?.label
            }
            // getOptionLabel={(option) => option?.name || option}
            onInputChange={onInputChange}
            inputValue={keywordsTextFieldValue}
            renderInput={(params) => (
              <TextField
                name={name}
                {...params}
                required={isRequired}
                error={!!error} // TODO: ADD
                // helperText={error?.message} // TODO: ADD
                variant="outlined"
                inputProps={{ ...params.inputProps, maxLength }}
                placeholder={placeholder}
              />
            )}
          />
        )}
      />
    </Stack>
  );
}

AutoSuggestion.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  setValues: PropTypes.func,
  maxLength: PropTypes.number,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSkillField: PropTypes.bool,
  isCapsLockOn: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  disabled: PropTypes.bool,
};

AutoSuggestion.defaultProps = {
  id: undefined,
  placeholder: undefined,
  values: undefined,
  setValues: noop,
  maxLength: VALIDATION_VALUES.MAX_VALUE_64,
  isMulti: false,
  isRequired: false,
  isSkillField: false,
  name: undefined,
  control: EMPTY_OBJECT,
  isCapsLockOn: false,
  disabled: false,
};

export default AutoSuggestion;
