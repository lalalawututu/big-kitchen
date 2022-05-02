import ThirdPartyMangeContainer from '../../container/thirdpartymange'
import { Layout, Menu, Button, Table } from 'antd'
import {
  TeamOutlined,
  SendOutlined
} from '@ant-design/icons';
import './index.less'
import {
  CalculatorOutlined,
  ShoppingOutlined,
} from "@ant-design/icons/lib/icons";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
  {
    title: '订单号',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: '客户名称',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: '客户地址',
    dataIndex: 'client_address',
    key: 'client_address',
  },
  {
    title: 'SKU',
    dataIndex: 'SKU',
    key: 'SKU',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '菜品',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '交货时间',
    dataIndex: 'date',
    key: 'date',
  },
];

const purchaseColumns = [
  {
    title: '下单日前',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '物料',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: '送货司机',
    dataIndex: 'driver',
    key: 'driver',
  },
  {
    title: '车牌号',
    dataIndex: 'car',
    key: 'car',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '送货时间',
    dataIndex: 'delivery_period',
    key: 'delivery_period',
  }
];
const customersColumns = [
  {
    title: '客户名称',
    dataIndex: 'company_name',
    key: 'company_name',
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    key: 'project_name',
  },
  {
    title: '档口名称',
    dataIndex: 'dk_name',
    key: 'dk_name',
  },
  {
    title: '地址',
    dataIndex: 'project_address',
    key: 'project_address',
  },
  {
    title: '联系人',
    dataIndex: 'project_contact',
    key: 'project_contact',
  },
  {
    title: '联系电话',
    dataIndex: 'project_phone',
    key: 'project_phone',
  },
  {
    title: '档口联系人',
    dataIndex: 'dk_contact',
    key: 'dk_contact',
  },
  {
    title: '档口联系电话',
    dataIndex: 'dk_phone',
    key: 'dk_phone',
  }
];

const suppliersColumns = [
  {
    title: '名称',
    dataIndex: 'supplier_name',
    key: 'supplier_name',
  },
  {
    title: '品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
  },
  {
    title: '积分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '联系人',
    dataIndex: 'linkman',
    key: 'linkman',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '座机',
    dataIndex: 'landline',
    key: 'landline',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  }
];

const SKUColumns = [
  {
    title: '名称',
    dataIndex: 'sku_name',
    key: 'sku_name',
  },
  {
    title: '编码',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '规格',
    dataIndex: 'sku_spec',
    key: 'sku_spec',
  },
  {
    title: '单位',
    dataIndex: 'sku_uom',
    key: 'sku_uom',
  },
  {
    title: '品牌',
    dataIndex: 'sku_brand',
    key: 'sku_brand',
  },
  {
    title: '类型',
    dataIndex: 'sku_type',
    key: 'sku_type',
  }
];

const DemandColumns = [
  {
    title: 'SKU编码',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '排班顺序',
    dataIndex: 'process_order',
    key: 'process_order',
  },
  {
    title: '毛菜',
    dataIndex: 'is_raw',
    key: 'is_raw',
  }
];


const EmployeeColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '电话',
    dataIndex: 'mobile_phone',
    key: 'mobile_phone',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '身份证',
    dataIndex: 'identity',
    key: 'identity',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
  }
];
export const ThirdPartyManagePage = () => {
  let manager = ThirdPartyMangeContainer.useContainer();
  let margin_left = 200

  return (
    <div className="container">
      <Layout className="site-layout-background menu-list">
        <Sider className="site-layout-background sider-menu">
          <Menu selectedKeys={[manager.selectedMenu]} defaultOpenKeys={['sub1','sub2', 'sub3', 'sub4']} mode="inline">
            <SubMenu key="sub1" icon={<CalculatorOutlined />} title="ERP">
              <Menu.Item key="2" onClick={manager.switchOrders}>销售订单</Menu.Item>
              <Menu.Item key="1" onClick={manager.switchPurchase}>采购订单</Menu.Item>
              <Menu.Item key="6" onClick={manager.switchCustomer}>客户列表</Menu.Item>
              <Menu.Item key="7" onClick={manager.switchSupplier}>供应商列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="OA">
              <Menu.Item key="3" onClick={manager.switchPeople}>员工数据</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SendOutlined />} title="TMS">
              <Menu.Item key="5">物流数据</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<ShoppingOutlined />} title="生产需求">
              <Menu.Item key="8" onClick={manager.switchDemand}>生产需求</Menu.Item>
              <Menu.Item key="9" onClick={manager.switchSku}>SKU</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        {
          manager.customer ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="site-layout-background">
                    <div className="flex-between">
                      <h3 className="content-title">客户列表</h3>
                      <div className="time-import">
                        同步时间：<span>--:--</span>
                        <Button onClick={manager.importOrders} className="common-btn-bg import-btn">导入</Button>
                      </div>
                    </div>
                    <Table bordered dataSource={manager.customerData} columns={customersColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
        {
          manager.supplier ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="site-layout-background">
                    <div className="flex-between">
                      <h3 className="content-title">供应商列表</h3>
                      <div className="time-import">
                        同步时间：<span>--:--</span>
                        <Button onClick={manager.sendPrice} className="common-btn-bg import-btn">导入</Button>
                      </div>
                    </div>
                    <Table bordered dataSource={manager.supplierData} columns={suppliersColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
        {
          manager.purchase ?
            <Layout className="site-layout" style={{ marginLeft: margin_left }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">报价单</h3>
                  </div>
                  <Table bordered dataSource={manager.priceData} columns={purchaseColumns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          manager.orders ?
            <Layout className="site-layout" style={{ marginLeft: margin_left }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">销售订单</h3>
                    <div className="time-import">
                      同步时间：<span>--:--</span>
                      <Button onClick={manager.sendPrice} className="common-btn-bg import-btn">导入</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={manager.ordersData} columns={columns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          manager.people ?
            <Layout className="site-layout" style={{ marginLeft: margin_left }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">员工信息</h3>
                    <div className="time-import">
                      同步时间：<span>--:--</span>
                      <Button onClick={manager.importOAData} className="common-btn-bg import-btn">导入</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={manager.employeeData} columns={EmployeeColumns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          manager.sku ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="site-layout-background">
                    <div className="flex-between">
                      <h3 className="content-title">SKU</h3>
                      <div className="time-import">
                        同步时间：<span>--:--</span>
                        <Button onClick={manager.sendPrice} className="common-btn-bg import-btn">导入</Button>
                      </div>
                    </div>
                    <Table bordered dataSource={manager.skuData} columns={SKUColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
        {
          manager.demand ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="site-layout-background">
                    <div className="flex-between">
                      <h3 className="content-title">生产需求</h3>
                    </div>
                    <Table bordered dataSource={manager.demandData} columns={DemandColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
      </Layout>
    </div>
  )
}
