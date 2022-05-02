import { useTranslation } from 'react-i18next'
import { Button } from 'antd';

const ChangeLanguage = () => {
    let { i18n } = useTranslation()
    return (
        <Button style={{width:'76px'}} onClick={()=>i18n.changeLanguage(i18n.language==='zh'?'en':'zh')}>{i18n.language==='zh'?'English':'中文'}</Button>
    )
}

export default ChangeLanguage