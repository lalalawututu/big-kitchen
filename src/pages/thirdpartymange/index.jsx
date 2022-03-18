import ThirdPartyMangeContainer from '../../container/thirdpartymange'
import history from '../../history';
import { Layout, Menu, Button, Table } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.less'

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const dataSource = [
  {
    key: '1',
    order: '009988766',
    name: '成都市龙腾四海科技有限公司',
    address: '成都市XXXXXXXXXXXXXXXXXXXXXX',
    number: '2吨',
    person: '小蔡',
    signing: '2022年2月14日',
    delivery: '2022年2月14日',
  },
  {
    key: '2',
    order: '009988766',
    name: '成都市龙腾四海科技有限公司',
    address: '成都市XXXXXXXXXXXXXXXXXXXXXX',
    number: '2吨',
    person: '小蔡2号',
    signing: '2022年2月14日',
    delivery: '2022年2月14日',
  },
];

const columns = [
  {
    title: '订单号',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: '客户名称',
    dataIndex: 'order',
    key: 'name',
  },
  {
    title: '客户地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '数量',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '负责人',
    dataIndex: 'person',
    key: 'person',
  },
  {
    title: '签约时间',
    dataIndex: 'signing',
    key: 'signing',
  },
  {
    title: '交货时间',
    dataIndex: 'delivery',
    key: 'delivery',
  },
];

export const ThirdPartyMangePage = () => {
  let mange = ThirdPartyMangeContainer.useContainer();

  return (
    <div className="container">
      <Layout className="site-layout-background menu-list">
        <Sider className="site-layout-background sider-menu">
          <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="ERP">
              <Menu.Item key="1">销售订单32</Menu.Item>
              <Menu.Item key="2">采购订单3</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="OA">
              <Menu.Item key="3">人员数据 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="TMS">
              <Menu.Item key="5"> 物流数据 9</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content className="sider-content">
            <div className="site-layout-background">

              <div className="flex-between">
                <h3 className="content-title">销售订单</h3>
                <div class="time-import">
                  同步时间：<span>08:00</span>
                  <Button className="common-btn-bg import-btn">导入</Button>
                </div>
              </div>

              <Table bordered dataSource={dataSource} columns={columns} />;
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
