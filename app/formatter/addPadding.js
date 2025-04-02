import UI from '../constants/ui';

function addPadding(number, digit = 2) {
  if (number === 0) {
    return UI.ASSESSMENT_ZERO_COUNT;
  }
  const padded = number.toString().padStart(digit, '0');
  return padded;
}

export default addPadding;
