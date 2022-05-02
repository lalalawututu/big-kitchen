import { Breadcrumb, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DiffOutlined } from '@ant-design/icons';

const Crumbs = props => {
    let navigate = useNavigate()
    const RouterPush = path => {
        navigate(path)
    }
    return (
        <div className="search-container" style={{ marginBottom: '0.2rem', justifyContent: 'end' }}>
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => RouterPush('/stockList')}>库存查询</Button>
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => RouterPush('/stockSafe')}>设置安全库存</Button>
        </div>
    )
}

export default Crumbs