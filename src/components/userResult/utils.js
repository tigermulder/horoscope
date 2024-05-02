export const findColor = (code, colorPillar) => {
  const item = colorPillar.find(ele => ele.code === code);
  return item ? item.color : 'transparent';
};
