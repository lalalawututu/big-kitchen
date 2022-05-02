import React, { PureComponent } from 'react';
import { Row, Col, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

const { SubMenu } = Menu;
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: 0
    }
  }
  componentDidMount() {
    let that = this;
    window.onscroll = function () {
      let sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
      let left = (sl) + 'px';
      that.setState({
        left: left
      });
    }
  }
  render() {
    return (
      <div className="header">
        <div className="headerBox" style={{ left: this.state.left }}>
          <Row>
            <Col span={6}>
              <Link to="/">
                <img alt="" className='logo' />
              </Link>
              <Link to="/" className="headerName"><span>成都天府智慧大厨房智能管控</span></Link>
            </Col>
            <Col span={2}>
              <Link to="/productionlist/all">
                生产计划
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/craft">
                工艺管理
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/PersonnelIndex">
                人员管理
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/workcreate">
                工艺创建
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/screen">
                能源消耗大屏
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/mine/receiving">
                接货看板
              </Link>
            </Col>
            <Col span={2}>
              <Menu mode="horizontal" className="menu-more">
                <SubMenu key="SubMenu" title="更多">
                  <Menu.Item key="setting:7">
                    <Link to="/assetAddEdits">
                      资产创建
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Header;
