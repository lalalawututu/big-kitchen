export const searchContent = (inputValue, initialData, param, setData) => {
  let filterData = [];
  if(param === 'BOM') {
    initialData.forEach(item => {
      if (item.FinishSkuCode.indexOf(inputValue) >= 0 || item.BomName.indexOf(inputValue) >= 0 || item.Material.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
  else if(param === 'SKU') {
    initialData.forEach(item => {
      if (item.materialName.indexOf(inputValue) >= 0 || item.sku_code.indexOf(inputValue) >= 0 || item.supplier.indexOf(inputValue) >= 0 || item.brand.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
  else if(param === 'SUPPLYORDER') {
    initialData.forEach(item => {
      if (item.car.indexOf(inputValue) >= 0 || item.sku_code.indexOf(inputValue) >= 0 || item.supplier.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
  else if(param === 'SUPPLYESTIMATE') {
    initialData.forEach(item => {
      if (item.supplier_name.indexOf(inputValue) >= 0 || item.linkman.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
  else if(param === 'PEOPLEMANAGE') {
    initialData.forEach(item => {
      if (item.id.indexOf(inputValue) >= 0 || item.EmployeePosition.indexOf(inputValue) >= 0 ) {
        filterData.push(item);
      }
    });
    setData(filterData);
  }
}