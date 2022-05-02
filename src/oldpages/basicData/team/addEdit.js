import { useEffect } from 'react'
import { Form, Input, Button, Space, Row } from 'antd';
import TeamContainer from '@/container/basicData/team/addEdit'
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

//form表单
function FormFun() {
  let navigate = useNavigate();
  let team = TeamContainer.useContainer();
  const [form] = Form.useForm()

  useEffect(() => {
    // 回显form功能
    if (team.teamDetail.TeamId) {
      form.setFieldsValue({
        'TeamId': team.teamDetail ? team.teamDetail.TeamId : '', //班组id
        'TeamName': team.teamDetail ? team.teamDetail.TeamName : '', //班组名称
        'WorkStartTime': team.teamDetail ? team.teamDetail.WorkStartTime : '', //工作开始时间
        'WorkEndTime': team.teamDetail ? team.teamDetail.WorkEndTime : '', //工作结束时间
        'HeaderName': team.teamDetail ? team.teamDetail.HeaderName : '', //负责人
      })
    }
  }, [team.teamDetail, form]);

  //添加品牌
  const saveForm = () => {
    form.validateFields().then(values => {
      team.onFinish(values)
    })
  }

  return (
    <div className='work-create-information materials-create-box'>
      <div className='creator-content shadow module-form'>
        <Form
          className='creator-form'
          layout='inline'
          form={form}
          initialValues={{}}
          autoComplete="off"
        >
          <Form.Item label="班组id" name="TeamId" style={{ display: 'none' }}>
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="班组名称" name="TeamName" >
            <Input className='field-input' />
          </Form.Item>

          <Row>
            <Form.Item label="工作时间" name="WorkStartTime">
              {/* <InputNumber min={1} max={24}  /> */}
              <Input style={{ width: '1.2rem' }} />
            </Form.Item>

            <Form.Item >
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Form.Item>

            <Form.Item label="" name="WorkEndTime">
              <Input style={{ width: '1.2rem' }} />
            </Form.Item>
          </Row>

          <Form.Item label="负责人" name="HeaderName"  >
            <Input className='field-input' />
          </Form.Item>
        </Form>
      </div>
      <Space className='buttons btn'>
        <Button className='chen-button shadow' onClick={() => navigate('/TeamIndex')}>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
        {team.teamDetail.TeamId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => team.DelTeamById()}>删除</Button>}
      </Space>
    </div>
  );
}


export default function add() {
  return (
    <div className='supplierIndex'>
      <TeamContainer.Provider>
        <FormFun />
      </TeamContainer.Provider>
    </div >
  )
}
