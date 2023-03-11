export default (date: Date) =>
  new Intl.DateTimeFormat("vi-VN").format(new Date(date));
