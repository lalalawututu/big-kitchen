export const searchContentAnd = async (data, tag, setFilterArr) => {
  let newData = []
  data.forEach(item => {
    if(item.stockName === tag) {
      newData.push(item)
    }
  });
  console.log(newData);
  setFilterArr(newData);
}