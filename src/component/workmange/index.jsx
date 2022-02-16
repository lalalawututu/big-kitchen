import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';

class WorkMange extends PureComponent {
  render() {
    return (
      <div className="example">工艺管理</div>
    );
  }
}

export default connect()(WorkMange);
