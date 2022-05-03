export const searchContentOr = (inputValue, initialData, searchKeys, setData) => {
  let filterData = [];
  searchKeys.forEach(key =>{
    initialData.forEach(item => {
      if (item[key].includes(inputValue)){
        filterData.push(item);
      }
    });
  })
  setData(filterData);
}