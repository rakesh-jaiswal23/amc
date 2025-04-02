const getSearchBoxContent = (keywordsContainer, locations) => {
  const keywordsArray = [];
  const locationsArray = [];
  keywordsContainer.forEach((keyword) => {
    keywordsArray.push(keyword.displayName);
  });
  locations.forEach((location) => {
    locationsArray.push(location.shortname);
  });
  const resultArray = [];
  if (keywordsArray.length !== 0) {
    resultArray.push(keywordsArray);
  }
  if (locationsArray.length !== 0) {
    resultArray.push(locationsArray);
  }
  return JSON.stringify(resultArray);
};
export default getSearchBoxContent;
