const REGEX_PATTERN = {
  AMOUNT_FORMAT_IN_100_MULTIPLE: /^[1-9]+[0-9]*00$/,
  // EMAIL_FORMAT: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  EMAIL_FORMAT:
    /^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/,
  NAME_FORMAT: /^[A-Za-z]/,
  NUMERIC_FORMAT: /[0-9]|\./,
  UPI_FORMAT: /^[\w.-]+@[\w.-]+$/,
  PASSWORD_FORMAT:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/,
  PHONE_NUMBER:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
};
export default REGEX_PATTERN;
