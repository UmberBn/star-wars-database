export default (ISOdate) => {
  const getDate = new Date(ISOdate);
  const year = getDate.getFullYear();
  const month = (getDate.getMonth() + 1).toString().padStart(2, 0);
  const day = getDate.getDate().toString().padStart(2, 0);

  return `${day}/${month}/${year}`;
};
