const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("vi-VN").format(new Date(date));

export default formatDate;
