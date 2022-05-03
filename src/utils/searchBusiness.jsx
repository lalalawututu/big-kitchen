export const searchContent = (inputValue, initialData, param, setData) => {
  let filterData = [];
  if(param = 'BOM') {
    initialData.forEach(item => {
      if (item.FinishSkuCode.indexOf(inputValue) >= 0 || item.BomName.indexOf(inputValue) >= 0 || item.Material.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
}