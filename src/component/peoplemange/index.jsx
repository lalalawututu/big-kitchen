import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';

class PeopleMange extends PureComponent {
  render() {
    return (
      <div className="example">人员管理</div>
    );
  }
}

export default connect()(PeopleMange);
