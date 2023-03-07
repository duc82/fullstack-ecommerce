const requiredSearch = (page = 1, limit = 10) => {
  return {
    page: page.toString(),
    limit: limit.toString(),
  };
};

export default requiredSearch;
