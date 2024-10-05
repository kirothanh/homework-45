
export const sortElement = (sortConfig, data) => {
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedData
}

export const onSort = (columnName, sortConfig, setSortConfig) => {
  let direction = "asc";
  if (sortConfig.key === columnName && sortConfig.direction === "asc") {
    direction = "desc";
  }
  setSortConfig({ key: columnName, direction });
};