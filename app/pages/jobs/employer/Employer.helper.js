import TABS from './employer.constant';

const getStarColor = (value) => {
  if (value > 4 && value <= 5) {
    return '#377e01';
  }
  if (value > 3 && value <= 4) {
    return '#5ba829';
  }
  if (value > 2 && value <= 3) {
    return '#cdd614';
  }
  if (value > 1 && value <= 2) {
    return '#ff9a05';
  }
  return '#ff4b2b';
};
export default getStarColor;

export const sectionTabs = [
  { value: TABS.PROFILE, id: 1, shouldShow: true },
  { value: TABS.EMPLOYER_JOBS, id: 2, shouldShow: true },
  { value: TABS.REVIEWS, id: 3, shouldShow: true },
];

export const getTabs = (shouldHideJobTab, shouldHideEmployerAndJobTab) => {
  if (shouldHideJobTab) {
    const updatedTabs = sectionTabs.map((tab) => {
      if (tab.id === 2) {
        return { ...tab, shouldShow: false };
      }
      return tab;
    });
    return updatedTabs;
  }
  if (shouldHideEmployerAndJobTab) {
    const updatedTabs = sectionTabs.map((tab) => {
      if (tab.id === 1 || tab.id === 2) {
        return { ...tab, shouldShow: false };
      }
      return tab;
    });
    return updatedTabs;
  }
  return sectionTabs;
};
