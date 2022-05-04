import { Button,Input } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-补单
function Supplement(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    return (
        <div className='product-info'>
            <div className='ant-descriptions des-box'>
                <div className='ant-descriptions-item-label' style={{ marginBottom: '0.15rem' }}>补单原因</div>
                <div className='ant-descriptions-item-content' style={{ lineHeight: '1.4' }}>{item.reason}</div>
            </div>

            <div className='ant-descriptions des-box' style={{marginTop:'0.3rem'}}>
                <div className='ant-descriptions-item-label' style={{ marginBottom: '0.15rem' }}>补单称重</div>
                <div className='ant-descriptions-item-content'>
                    <input placeholder="" class="ant-input batch-number" type="text" style={{'width':'30%','marginRight':'0.1rem'}} />公斤
                </div>
            </div>

            <div className="submit-container submit-container1" >
                {/* onClick={() => { mine.TaskSubmitClick(item, index, 4) }} */}
                {<Button className="submit-btn"  icon={<BarsOutlined />}>确定完成</Button>}
            </div>
        </div>
    )
}

export default Supplement
