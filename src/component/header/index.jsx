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
              成都天府智慧大厨房智能管控
            </Col>
            <Col span={2}>
              <Link to="/producemange">
                生产管理
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/">
                工艺管理
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/peoplemange">
                人员管理
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/workinformation">
                工艺详情
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/workcreate">
                工艺创建
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/commonCreate">
                通用创建
              </Link>
            </Col>
            <Col span={2}>
              <Menu mode="horizontal">
                <SubMenu key="SubMenu" title="更多">
                  <Menu.Item key="setting:1">
                    <Link to="/productionlist">
                      生产列表
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="setting:2">
                    <Link to="/screen">
                      能源消耗大屏
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="setting:3">
                    <Link to="/mine">
                      个人看板
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
