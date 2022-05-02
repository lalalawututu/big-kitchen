import React, { useState } from 'react'
import creatorContainer from '../../container/commonCreate'
import {
    Form,
    Input,
    Select,
    Typography,
    Upload,
    Tag,
    Space,
    Button
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'

const { Title } = Typography
const { Option } = Select

export function CommonCreatePage() {
    let creator = creatorContainer.useContainer()

    // upload-image
    const [imgList, setImgList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ])

    const [value, setValue] = useState('')
    const [tagsData, setTageData] = useState(['标签1','标签2', '标签3'])

    const onChange = ({ imgList: newImgList }) => {
        setImgList(newImgList)
    }

    const addInput = (e) => {
        setValue(e.target.value)
    }

    const addTag = () => {
        const addTag = tagsData.indexOf(value) === -1 && value !== '' ? [...tagsData, value] : [...tagsData]
        setTageData(addTag)
    }

    const removeTag = (tag) => {
        const removeTag = tagsData.filter(t => t !== tag)
        setTageData(removeTag)
    }

    const onPreview = async file => {
        let src = file.url
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj)
                reader.onload = () => resolve(reader.result)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        imgWindow.document.write(image.outerHTML)
    }

    // upload-files
    const [fileList, setFileList2] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ])

    const onChange2 = ({ imgList: newImgList }) => {
        setFileList2(newImgList)
    }

    return (
        <div className='container'>
            <div className='creator-content bg-fff'>
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

            <div className='creator-content bg-fff'>
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
                            <Input className='field-input' placeholder='input placeholder' onChange={e => addInput(e)}/>
                        </Form.Item>
                        <Button className='common-btn-bg' onClick={() => addTag()}>添加</Button>
                    </div>
                    <div className='wrap-line'>
                        <Form.Item label='Field H'>
                            <div className='tags-wrap'>
                                <Tag className='active'>
                                    Tag 1
                                </Tag>
                                <Tag>
                                    Tag 2
                                </Tag>
                                <Tag>
                                    Tag 3
                                </Tag>
                            </div>
                        </Form.Item>
                    </div>
                    <div className='wrap-line'>
                        <Form.Item label='Field I'>
                            <div className='tags-wrap canClose'>
                                {tagsData.map((tag) => (
                                    <Tag
                                        key={tag}
                                        className='active'
                                    >
                                        {tag}
                                        <DeleteOutlined className="delete-btn" onClick={() => removeTag(tag)} />
                                    </Tag>
                                ))}
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </div>

            <div className='creator-content bg-fff'>
                <Title className='content-title' level={4}>原料图片</Title>
                <Upload
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    listType='picture-card'
                    fileList={imgList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {imgList.length < 5 && '+ Upload'}
                </Upload>
            </div>

            <div className='creator-content bg-fff'>
                <Title className='content-title' level={4}>附件</Title>
                <Upload
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    fileList={fileList}
                    className='file-upload'
                    onChange={onChange2}
                    itemRender={(originNode, file, currFileList) => (
                        <div className='file-item'>
                            {file.uid + file.name}
                        </div>
                    )}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </div>

            <Space className='buttons' size='large'>
                <Button className='chen-button shadow'>取消</Button>
                <Button className='chen-button shadow primary'>保存</Button>
                <Button className='chen-button shadow primary' icon={<DeleteOutlined />}>
                    删除
                </Button>
            </Space>
        </div>
    )
}
