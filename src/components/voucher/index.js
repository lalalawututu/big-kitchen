import { Table, Input, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import voucher from '@/container/voucher';
const { CheckableTag } = Tag;
const { Search } = Input;

//表格
function TableFun() {
    let voucherContent = voucher.useContainer();
    const columns = [
        { title: '凭证号', dataIndex: 'VoucherNo', key: 'VoucherNo', ellipsis: true, align: 'center' },
        { title: '科目', dataIndex: 'Subject', key: 'Subject', ellipsis: true, align: 'center' },
        { title: '借贷', dataIndex: 'Toloan', key: 'Toloan', ellipsis: true, align: 'center' },
        { title: '金额', dataIndex: 'Money', key: 'Money', ellipsis: true, align: 'center' },
        { title: '凭证日期', dataIndex: 'VoucherDate', key: 'VoucherDate', ellipsis: true, align: 'center' },
        { title: '事由', dataIndex: 'Matter', key: 'Matter', ellipsis: true, align: 'center' },
    ]

    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.MaterialId}
                columns={columns}
                dataSource={voucherContent.data}
            />
        </div>
    )
}
//搜索
function SearchFun() {
    var tagsType = ['全部', '采购', '劳务费', '维修', '工资', '其他']
    return (
        <div className='distribution'>
            < div className="search-container" style={{ marginBottom: '0.1rem' }}>
                <Search
                    placeholder="凭证号"
                    // value={material.searchContent.MaterialName || ''}
                    // onChange={(evt) =>
                    //     material.searchInfo(evt.target.value)
                    // }
                    // onSearch={material.searchOpt}
                    prefix={<SearchOutlined />}
                    allowClear
                    enterButton="搜索" size="middle" />
            </div>
            <div className="creator-content" style={{ padding: '0.2rem', marginBottom: '0.15rem' }}>
                <div className='wrap-line'>
                    <div className='tags-wrap' style={{ marginBottom: '0rem' }}>
                        <div className='title'>运单状态:</div>
                        <div>
                            {tagsType.map(tag => (
                                <CheckableTag
                                    key={tag}
                                // checked={material.selectedTags.indexOf(tag) > -1}
                                // onChange={checked => material.handleChange(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default function Index() {
    return (
        <div className='materialIndex container'>
            <SearchFun />
            <TableFun />
        </div >
    )
}
