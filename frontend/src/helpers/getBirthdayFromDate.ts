const getBirthdayFromDate = (date: Date) => {
  if (!date) return "2001-01-01";
  const month = (+date.getMonth() + 1).toString();
  const day = date.getDate();
  return (
    date.getFullYear() +
    "-" +
    (month.length === 1 ? "0" + month : month) +
    "-" +
    (day >= 10 ? day : "0" + day)
  );
};

export default getBirthdayFromDate;
