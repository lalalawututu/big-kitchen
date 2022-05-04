"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _unstatedNext = require("unstated-next");

var _reactRouterDom = require("react-router-dom");

var _common = require("../../common");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSupplier = function useSupplier() {
  var location = (0, _reactRouterDom.useLocation)();
  var navigate = (0, _reactRouterDom.useNavigate)();
  var BrandId = location.state ? location.state.BrandId : '';

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      brandDetail = _useState2[0],
      setBrandDetail = _useState2[1]; //供应商详情内容


  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      supplierList = _useState4[0],
      setSupplierList = _useState4[1]; //供应商名称


  (0, _react.useEffect)(function () {
    getSuppliersList(); //获取供应商列表

    getTableDetail(); //获取供应商管理列表数据
  }, [BrandId]); //获取供应商管理列表数据

  function getTableDetail() {
    fetch('GetBrandView?BrandId=' + BrandId).then(function _callee(response) {
      var res;
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
              res = _context.sent;
              setBrandDetail(res.data);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  } //获取供应商列表数据


  function getSuppliersList() {
    var url = _common.Sync_Server + "/data/blockchain?model=suppliers";
    fetch("".concat(url)).then(function _callee2(response) {
      var dataJson, _supplierList;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!response.ok) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return regeneratorRuntime.awrap(response.json());

            case 3:
              dataJson = _context2.sent;
              _supplierList = JSON.parse(dataJson.content);
              setSupplierList(_supplierList.suppliers);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  } //保存接口


  function SaveOrUpdateBrand(data) {
    fetch('SaveOrUpdateBrand', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(function _callee3(response) {
      var res;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(response.json());

            case 2:
              res = _context3.sent;

              if (res.data.Code === '200') {
                navigate('/BrandIndex');
              }

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  } //保存操作


  var onFinish = function onFinish(values) {
    SaveOrUpdateBrand(values);
  }; //删除接口


  function DelBrandById() {
    fetch('DelBrandById', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'BrandId': BrandId
      })
    }).then(function _callee4(response) {
      var res;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(response.json());

            case 2:
              res = _context4.sent;

              if (res.data.Code === '200') {
                navigate('/BrandIndex');
              }

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  }

  return {
    supplierList: supplierList,
    onFinish: onFinish,
    DelBrandById: DelBrandById,
    brandDetail: brandDetail
  };
};

var SupplierUpdateContainer = (0, _unstatedNext.createContainer)(useSupplier);
var _default = SupplierUpdateContainer;
exports["default"] = _default;