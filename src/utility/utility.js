export const titleCase = (str = '') => {
  str = str.toLowerCase();
  let words = str.split(' ');

  let capitalized = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1, word.length);
  });
  return capitalized.join(' ');
};

export const handleImageError = (e, description = '') => {
  let fallbackText = description.trim().replace(' ', '+');

  e.target.onerror = null;
  e.target.src = `https://dummyimage.com/100x100/cfcfcf/fff.jpg&text=${fallbackText}`;
};

export const scrollHandler = element => {
  const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -30;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};
