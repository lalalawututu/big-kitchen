import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import { actionCreatorsHeader } from './store';

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
            <Col span={1}>
              <Link to="/">
                <img src={headPicture} alt="" />
              </Link>
            </Col>
            <Col span={4}>
              成都天府智慧大厨房智能管控
            </Col>
            <Col span={2}>
              <Link to="/">
                人员看板
              </Link>
            </Col>
            <Col span={2}>
              <Link to="/workmange">
                工艺管理
              </Link>  
            </Col>
            <Col span={2}>
              <Link to="/peoplemange">
                人员管理
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

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
