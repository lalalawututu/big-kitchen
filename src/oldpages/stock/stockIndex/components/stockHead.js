import { useNavigate } from 'react-router-dom';

const Head = () => {
    let navigate = useNavigate()
    const RouterPush = path => {
        navigate(path)
    }
    return (
        <header>
            <div className='title'>看库存</div>
            <div className='menu'>
                <div onClick={() => RouterPush('/stockInOut')}>出入库记录</div>
                <div onClick={() => RouterPush('/stockList')}>库存查询</div>
                <div onClick={() => RouterPush('/stockSafe')}>设置安全库存</div>
            </div>
        </header>
    )
}

export default Head