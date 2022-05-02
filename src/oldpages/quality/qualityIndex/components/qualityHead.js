import { Button } from 'antd';
import { Link } from 'react-router-dom'

const Head = () => {
    return (
        <header>
            <div>质检管理首页</div>
            <div>
                <Button type="primary"><Link to="/Quality">质检计划审核</Link></Button>
                <Button type="primary"><Link to="/QualityRetrospect">查看更多质检计划</Link></Button>
            </div>
        </header>
    )
}

export default Head