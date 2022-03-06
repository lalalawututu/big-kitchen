import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

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
    const {
      headPicture,
      toggleMine,
      handletoggleMine
    } = this.props;
    return (
      <div className="header">
        <div className="headerBox" style={{left: this.state.left}}>
          <Row>
            <Col span={7}>
              <Link to="/">
                <img src={headPicture} alt="" className='logo' />
              </Link>
              成都天府智慧大厨房智能管控
            </Col>
            <Col span={3}>
              <Link to="/">
                工艺管理
              </Link>
            </Col>
            <Col span={3}>
              <Link to="/peoplemange">
                人员管理
              </Link>
            </Col>
            <Col span={3}>
              <Link to="/workinformation">
                工艺详情
              </Link>
            </Col>
            <Col span={3}>
              <Link to="/workcreate">
                工艺创建
              </Link>
            </Col>
            <Col span={3}>
              <Link to="/commonCreate">
                pc通用创建
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  headPicture: state.getIn(['header', 'headPicture']),
});


export default Header;
