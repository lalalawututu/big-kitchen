// import { Descriptions, Button } from 'antd';
// import SupplierDetailContainer from "../../container/supplier/detail";
// import { EditOutlined } from '@ant-design/icons';
// import { useNavigate, useLocation } from 'react-router-dom';

// // 品牌详情
// function BrandDetail() {
//   let location = useLocation();
//   let BrandId = location.state ? location.state.BrandId : '';
//   let brand = SupplierDetailContainer.useContainer();
//   let navigate = useNavigate();
//   return (
//     <div className="work-information">
//       <div className='common-edit-btn' onClick={() => navigate('/BrandAddEdit', { state: { BrandId: BrandId } })}><EditOutlined /></div>
//       <div className="basic-info bg-fff">
//         <h2 className="common-title">基本信息</h2>
//         <Descriptions size={'default'} column={3} className="descriptions-basic">
//           <Descriptions.Item label="品牌名称">{brand.brandDetail.BrandName || ''}</Descriptions.Item>
//           <Descriptions.Item label="类别">{brand.brandDetail.BrandType || ''}</Descriptions.Item>
//         </Descriptions>
//       </div>
//       {/* <span>原料图片：{brand.brandDetail.LogoUrl || ''} &nbsp;&nbsp;&nbsp;&nbsp;</span> */}
//     </div>
//   )
// }

// export default function detail() {
//   return (
//     <div className='supplierIndex'>
//       <brandDetail.Provider>
//         <BrandDetail />
//       </brandDetail.Provider>
//     </div >
//   )
// }
