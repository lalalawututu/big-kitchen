import {Button, Col, Modal, Row} from "antd";
import React from "react";
import MineContainer from "../../container/mine";
import './index.less'

function Index(props) {
    let mine = MineContainer.useContainer();
    let reasons = props.reason
    return (
            <Modal title="异常上报"
                   width={600}
                   centered
                   visible={mine.exception}
                   okText="确定"
                   className="add-mask"
                   footer={[]}
                   onCancel={() => {
                       mine.setException(false)
                   }}>
                <Row className="exception-submit-container">
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">选择异常原因</h4>
                            {reasons.map((req, index) =>
                                <Button key={index}>{req}</Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal>
    )
}
export default Index
