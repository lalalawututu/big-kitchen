import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import creatorContainer from '../../container/commonCreate';
import {
    Form,
    Input,
    Select,
    Typography,
    Upload,
    Modal
} from 'antd';
import 'antd/dist/antd.css';
import './index.less';

const { Title } = Typography;
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export function CommonCreatePage () {
    let creator = creatorContainer.useContainer();
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    // upload-image
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
    
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <div className='container'>
            <div className='creator-content shadow'>
                <Form
                    className='creator-form'
                    layout='inline'
                    initialValues={creator.data}
                >
                    <Form.Item label='Field A'>
                        <Input className='field-input' placeholder='input placeholder' />
                    </Form.Item>
                    <Form.Item label='Field B'>
                        <Select
                            className='field-select'
                            defaultValue='lucy'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            allowClear
                        >
                            <Option value='lucy'>Lucy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Field B'>
                        <Input className='field-input' placeholder='input placeholder' />
                    </Form.Item>
                </Form>
            </div>

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>板块标题</Title>
                <Form
                    className='creator-form conpose-from'
                    layout='inline'
                >
                    <Form.Item label='Field A'>
                        <Input className='field-input' placeholder='input placeholder' />
                    </Form.Item>
                    <Form.Item label='Field B'>
                        <Select
                            className='field-select'
                            defaultValue='lucy'
                            allowClear
                        >
                            <Option value='lucy'>Lucy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Field C'>
                        <Input className='field-input' placeholder='input placeholder' />
                    </Form.Item>
                    <Form.Item label='Field D'>
                        <Input className='field-input' placeholder='input placeholder' />
                    </Form.Item>
                    <Form.Item label='Field E'>
                        <Select
                            className='field-select'
                            defaultValue='lucy'
                            allowClear
                        >
                            <Option value='lucy'>Lucy</Option>
                        </Select>
                    </Form.Item>
                    <div className='wrap-line'>
                        <Form.Item label='Field F'>
                            <Input className='field-input' placeholder='input placeholder' />
                        </Form.Item>
                    </div>
                    {/* <div className='wrap-line labels-line'>
                        此处标签不知道交互方式，暂时不做
                    </div> */}
                    <div className='wrap-line'>
                        <Form.Item label='Field H'>
                            <Select mode='tags' className='field-Select-tags' onChange={handleChange} tokenSeparators={[',']}>
                                {children}
                            </Select>
                        </Form.Item>
                    </div>
                </Form>
            </div>

            <div className='creator-content shadow'>
                <Title className='content-title' level={4}>原料图片</Title>
                <Upload
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    listType='picture-card'
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </div>

            <div className='creator-content shadow'>
                <Title className='content-title' level={4}>附件</Title>
                
            </div>
        </div>
    )
}
