import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

class WorkInfo extends PureComponent {

    render() {
        return (
            <div>
               工艺详情
            </div>
        );
    }
}

export default connect()(WorkInfo);
