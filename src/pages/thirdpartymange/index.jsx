import ThirdPartyMangeContainer from '../../container/thirdpartymange'
import { Layout, Menu, Button, Table } from 'antd'
import {
  TeamOutlined,
  ApartmentOutlined,
  SendOutlined
} from '@ant-design/icons';
import './index.less'

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
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '负责人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '签约时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '交货时间',
    dataIndex: 'date',
    key: 'date',
  },
];

const purchaseColumns = [
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
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '验收数量',
    dataIndex: 'recieved_quantity',
    key: 'recieved_quantity',
  },
  {
    title: '负责人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '签约时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '交货时间',
    dataIndex: 'date',
    key: 'date',
  },
];

export const ThirdPartyMangePage = () => {
  let mange = ThirdPartyMangeContainer.useContainer();

  return (
    <div className="container">
      <Layout className="site-layout-background menu-list">
        <Sider className="site-layout-background sider-menu">
          <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
            <SubMenu key="sub1" icon={<ApartmentOutlined />} title="ERP">
              <Menu.Item key="1" onClick={mange.switchPurchase}>销售订单</Menu.Item>
              <Menu.Item key="2" onClick={mange.switchBuy}>采购订单</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="OA">
              <Menu.Item key="3" onClick={mange.switchPeople}>人员数据</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SendOutlined />} title="TMS">
              <Menu.Item key="5"> 物流数据</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        {
          mange.purchase ?
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">销售订单</h3>
                    <div className="time-import">
                      同步时间：<span>08:00</span>
                      <Button className="common-btn-bg import-btn">导入</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={mange.purchaseData} columns={purchaseColumns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          mange.buy ?
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">采购订单</h3>
                    <div className="time-import">
                      同步时间：<span>08:00</span>
                      <Button className="common-btn-bg import-btn">导入</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={mange.data} columns={columns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          mange.people ?
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content className="sider-content">
                <div className="site-layout-background">
                  <div className="flex-between">
                    <h3 className="content-title">人员订单</h3>
                    <div className="time-import">
                      同步时间：<span>08:00</span>
                      <Button className="common-btn-bg import-btn">导入</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={mange.data} columns={columns} />
                </div>
              </Content>
            </Layout> : null
        }
      </Layout>
    </div>
  )
}
