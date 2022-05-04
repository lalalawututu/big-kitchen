"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _echarts = require("echarts");

var _react = require("react");

var _unstatedNext = require("unstated-next");

var _common = require("../../common");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSupplier = function useSupplier() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1]; //表格数据


  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      brandName = _useState4[0],
      setBrandName = _useState4[1]; //搜索供货商姓名


  (0, _react.useEffect)(function () {
    getTableData(); //获取供应商管理列表数据
  }, []); //获取供应商管理列表数据

  function getTableData() {
    setTableData([]); //清空数据

    var url = _common.Sync_Server + "/meta/contracts";
    fetch("".concat(url)).then(function _callee(response) {
      var dataJson;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!response.ok) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(response.json());

            case 3:
              dataJson = _context.sent;
              console.log(dataJson, 'dataJson'); // let planList = JSON.parse(dataJson.content)
              // // console.log(planList)
              // let data = []
              // planList.employee.forEach((item, index) => {
              //     let panInfo = {
              //         key: item.employeeId,
              //         id: item.employeeId,
              //         EmployeePosition: item.positionalTitles,
              //     }
              //     data.push(panInfo)
              // })
              // this.setState({ data: data })

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  } //查询条件


  function searchInfo(event) {
    setBrandName(event);
  } //搜索查询


  function searchOpt() {
    getTableData();
  }

  return {
    tableData: tableData,
    brandName: brandName,
    searchInfo: searchInfo,
    searchOpt: searchOpt
  };
};

var SupplierContainer = (0, _unstatedNext.createContainer)(useSupplier);
var _default = SupplierContainer;
exports["default"] = _default;