const formatVnd = (n: number) => {
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      currency: "VND",
    }).format(n) + "₫"
  );
};

export default formatVnd;
