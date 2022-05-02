import { Descriptions } from 'antd';
import ProductReviewContainer from "@/container/productReview/detail";

//产品追溯详情
function ProductReviewDetail() {
    return (
        <div className='work-information'>
            <div className='basic-info bg-fff'>
                <h2 className="common-title">基本信息：</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="订单号">订单号</Descriptions.Item>
                    <Descriptions.Item label="批次号">批次号</Descriptions.Item>
                    <Descriptions.Item label="生成时间">生成时间</Descriptions.Item>
                    <Descriptions.Item label="数量">数量</Descriptions.Item>
                    <Descriptions.Item label="留样人">留样人</Descriptions.Item>
                    <Descriptions.Item label="客户名称">客户名称</Descriptions.Item>
                    <Descriptions.Item label="收货人">收货人</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="common-long-table bg-fff">
                <h2 className="common-title">批次号信息</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="批次号">批次号</Descriptions.Item>
                    <Descriptions.Item label="生产内容">生产内容</Descriptions.Item>
                    <Descriptions.Item label="数量">数量</Descriptions.Item>
                    <Descriptions.Item label="生产开始时间">生产开始时间</Descriptions.Item>
                    <Descriptions.Item label="生产结束时间">生产结束时间</Descriptions.Item>
                    <Descriptions.Item label="工作人员">工作人员</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="common-long-table bg-fff">
                <h2 className="common-title">送料物流信息</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="供应商名称">供应商名称</Descriptions.Item>
                    <Descriptions.Item label="送料时间">送料时间</Descriptions.Item>
                    <Descriptions.Item label="物流公司">物流公司</Descriptions.Item>
                    <Descriptions.Item label="送料车牌号">送料车牌号</Descriptions.Item>
                    <Descriptions.Item label="送料司机">送料司机</Descriptions.Item>
                    <Descriptions.Item label="物料种类">物料种类</Descriptions.Item>
                    <Descriptions.Item label="数量">数量</Descriptions.Item>
                    <Descriptions.Item label="收货人"></Descriptions.Item>
                </Descriptions>
            </div>
            <div className="common-long-table bg-fff">
                <h2 className="common-title">送货物流信息</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="物流公司">物流公司</Descriptions.Item>
                    <Descriptions.Item label="送货时间">送货时间</Descriptions.Item>
                    <Descriptions.Item label="车牌号">车牌号</Descriptions.Item>
                    <Descriptions.Item label="送货司机">送货司机</Descriptions.Item>
                    <Descriptions.Item label="产成品">产成品</Descriptions.Item>
                    <Descriptions.Item label="数量">数量</Descriptions.Item>
                    <Descriptions.Item label="押车人">押车人</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default function detail() {
    return (
        <div className='supplierIndex'>
            <ProductReviewContainer.Provider>
                <ProductReviewDetail />
            </ProductReviewContainer.Provider>
        </div >
    )
}
