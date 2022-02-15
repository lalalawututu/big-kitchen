import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { actionCreatorsMine } from './store';

class Mine extends PureComponent {
  render() {
    return (
      <div className="example">123</div>
    );
  }
}

export default connect()(Mine);
