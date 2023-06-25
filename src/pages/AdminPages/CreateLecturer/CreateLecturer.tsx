// import React, { useState, useEffect } from 'react';
// import { Layout } from 'antd';
// import Styled from './style';
// import Sidebar from '../../../components/Sidebar';
// import { UserOutlined, BookOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
// import { ItemType } from 'antd/es/menu/hooks/useItems';
// import SearchBarAdmin from '../../../components/SearchBarAdmin/SearchBarAdmin';
// const { Content, Header } = Layout;
// import { getAllContactType } from '../../../api/Lecturer';
// import { getAllUniversity } from '../../../api/Lecturer';
// import { createAccount } from '../../../api/Account';
// import { createLecturer } from '../../../api/Lecturer';

// const items: ItemType[] = [
//     {
//         key: '1',
//         icon: <UserOutlined />,
//         label: 'Người dùng'
//     },
//     {
//         key: '2',
//         icon: <BookOutlined />,
//         label: 'Học giả'
//     },
//     {
//         key: '3',
//         icon: <SettingOutlined />,
//         label: 'Cấu hình'
//     },
//     {
//         key: '4',
//         icon: <DatabaseOutlined />,
//         label: 'Bài báo khoa học'
//     }
// ];

// const optionsGender = [
//     { value: "Nam", label: "Nam" },
//     { value: "Nữ", label: "Nữ" },
// ];

// export default function CreateLecturer() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [currentKey, setCurrentKey] = useState('1');

//     const [account, setAccount] = useState<string>();
//     const [password, setPassword] = useState<string>();

//     const [name, setName] = useState<string>("");
//     const [position, setPosition] = useState<string>("");
//     const [gender, setGender] = useState<string>("Nam");
//     const [dateOfBirth, setDateOfBirth] = useState<string>();
//     const [email, setEmail] = useState<string>();
//     const [address, setAddress] = useState<string>();
//     const [phone, setPhone] = useState<string>();
//     const [departmentName, setDepartmentName] = useState<string>();
//     const [university, setUniversity] = useState<string>("1");

//     const [universitys, setUniversitys] = useState<any>([]);
//     const [contactTypes, setContactTypes] = useState<any>([]);



//     useEffect(() => {
//         const university = getAllUniversity();
//         university.then((res) => {
//             setUniversitys(res.data.data);
//         }).catch((err) => {
//             console.log(err);
//         });

//         const contactTypes = getAllContactType();
//         contactTypes.then((res) => {
//             console.log(res);
//             setContactTypes(res.data.data);
//         }).catch((err) => {
//             console.log(err);
//         });

//     }, []);


//     const handleChangeGender = (event: any) => {
//         setGender(event.target.value);
//     };

//     const handleChangeUniversity = (event: any) => {
//         setUniversity(event.target.value);
//     };

//     const handleDateChange = (event: any) => {
//         setDateOfBirth(event.target.value);
//     };


//     const handleSaveEdit = () => {
//         const data2 = { name, position, gender, dateOfBirth, email, address, phone, departmentName, university, account, password };
//         const data = {
//             name: name,
//             gender: gender,
//             dateOfBirth: dateOfBirth
//         }
//         const account_create = {
//             email: account,
//             password: password,
//             password2: password
//         }

//         createAccount(account_create);
//         //createLecturer(data);
//     }

//     return (
//         <div>
//             <Styled>
//                 <Layout style={{ minHeight: '100vh' }}>
//                     <Sidebar
//                         collapsed={collapsed}
//                         setCollapsed={setCollapsed}
//                         items={items}
//                         currentKey={currentKey}
//                         setCurrentKey={setCurrentKey}
//                     />
//                     <Layout>
//                         <SearchBarAdmin />
//                         <Content
//                             style={{
//                                 margin: '30px 30px',
//                                 padding: 24,
//                                 background: 'white',
//                                 borderRadius: '10px'
//                             }}>
//                             <div className="container">
//                                 <div className='btn-herder'>
//                                     <h1 className="title-header">Tạo tài khoản</h1>
//                                     <button className='btn-create' onClick={handleSaveEdit}>Lưu</button>
//                                 </div>
//                                 <h3 className="title">Tài khoản</h3>
//                                 <div className="border-data">
//                                     <div className='form-input'>
//                                         <div className='form'>
//                                             <div>
//                                                 <span>Email:</span>
//                                                 <input placeholder="Nhập ..." className="input-style" type="email"
//                                                     onChange={(e) => setAccount(e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Content>
//                     </Layout>
//                 </Layout>
//             </Styled>
//         </div >
//     )
// }
