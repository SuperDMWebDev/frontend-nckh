import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined, DeleteOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { MenuProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Modal } from 'antd';
import ModalContact from '../ModalContact';
import Loader from '../../Loader/Loader';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { Checkbox } from '@mui/material';
import ModalAcademicTitle from '../ModalAcademicTitle';
import ModalAcademicRank from '../ModalAcademicRank';

interface DataTypeContact {
    key: number;
    id: number;
    name: string;
    createAt: string;
    updateAt: string;
}
type DataIndexContact = keyof DataTypeContact;
const dataContact: DataTypeContact[] = [];
for (let i = 0; i < 46; i++) {
    dataContact.push({
        key: i,
        id: i,
        name: '',
        createAt: '',
        updateAt: '',
    });
}

interface DataTypeAcademicRank {
    key: number;
    id: number;
    idTeacher: number;
    nameRank: string;
    createAt: string;
    updateAt: string;
}
type DataIndexAcademicRank = keyof DataTypeAcademicRank;
const dataAcademicRank: DataTypeAcademicRank[] = [];
for (let i = 0; i < 46; i++) {
    dataAcademicRank.push({
        key: i,
        id: i,
        idTeacher: 0,
        nameRank: '',
        createAt: '',
        updateAt: '',
    });
}

interface DataTypeAcademicTitle {
    key: number;
    id: number;
    idTeacher: number;
    nameTitle: string;
    createAt: string;
    updateAt: string;
}
type DataIndexAcademicTitle = keyof DataTypeAcademicTitle;
const dataAcademicTitle: DataTypeAcademicTitle[] = [];
for (let i = 0; i < 46; i++) {
    dataAcademicTitle.push({
        key: i,
        id: i,
        idTeacher: 0,
        nameTitle: '',
        createAt: '',
        updateAt: '',
    });
}

const Configuration: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [openContact, setOpenContact] = useState(false);
    const [openAcademicRank, setOpenAcademicRank] = useState(false);
    const [openAcademicTitle, setOpenAcademicTitle] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])



    const handleSearchContact = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndexContact
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleSearchAcademicRank = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndexAcademicRank
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleSearchAcademic = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndexAcademicTitle
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchPropsContact = (dataIndex: DataIndexContact): ColumnType<DataTypeContact> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchContact(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchContact(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (searchedColumn === dataIndex ? text : text)
    });
    const getColumnSearchPropsAcademicRank = (dataIndex: DataIndexAcademicRank): ColumnType<DataTypeAcademicRank> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchAcademicRank(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchAcademicRank(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (searchedColumn === dataIndex ? text : text)
    });
    const getColumnSearchPropsAcademicTitle = (dataIndex: DataIndexAcademicTitle): ColumnType<DataTypeAcademicTitle> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchAcademic(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchAcademic(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (searchedColumn === dataIndex ? text : text)
    });

    const columnsContact: ColumnsType<DataTypeContact> = [
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <Checkbox />
            )
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%',
            ...getColumnSearchPropsContact('id'),
            onCell: () => {
                return {
                    onClick: (ev) => {
                        navigate('/detail-page');
                    }
                };
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchPropsContact('name')
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '21%',
            ...getColumnSearchPropsContact('createAt')
        },
        {
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '21%',
            ...getColumnSearchPropsContact('updateAt')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={() => setOpenContact(true)} />
            )
        }
    ];
    const columnsAcademicRank: ColumnsType<DataTypeAcademicRank> = [
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <Checkbox />
            )
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
            ...getColumnSearchPropsAcademicRank('id'),
            onCell: () => {
                return {
                    onClick: (ev) => {
                        navigate('/detail-page');
                    }
                };
            }
        },
        {
            title: 'ID Teacher',
            dataIndex: 'idTeacher',
            key: 'idTeacher',
            width: '15%',
            ...getColumnSearchPropsAcademicRank('idTeacher')
        },
        {
            title: 'Name Of Academic Rank',
            dataIndex: 'nameRank',
            key: 'nameRank',
            width: '22%',
            ...getColumnSearchPropsAcademicRank('nameRank')
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '21%',
            ...getColumnSearchPropsAcademicRank('createAt')
        },
        {
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '21%',
            ...getColumnSearchPropsAcademicRank('updateAt')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={() => setOpenAcademicRank(true)} />
            )
        }
    ];
    const columnsAcademicTitle: ColumnsType<DataTypeAcademicTitle> = [
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <Checkbox />
            )
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
            ...getColumnSearchPropsAcademicTitle('id'),
            onCell: () => {
                return {
                    onClick: (ev) => {
                        navigate('/detail-page');
                    }
                };
            }
        },
        {
            title: 'ID Teacher',
            dataIndex: 'idTeacher',
            key: 'idTeacher',
            width: '15%',
            ...getColumnSearchPropsAcademicTitle('idTeacher')
        },
        {
            title: 'Name Of Academic Title',
            dataIndex: 'nameTitle',
            key: 'nameTitle',
            width: '22%',
            ...getColumnSearchPropsAcademicTitle('nameTitle')
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '21%',
            ...getColumnSearchPropsAcademicTitle('createAt')
        },
        {
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '21%',
            ...getColumnSearchPropsAcademicTitle('updateAt')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={() => setOpenAcademicTitle(true)} />
            )
        }
    ];

    return <>
        {
            loading ? <Loader /> : <div>
                <Tabs
                    defaultActiveKey="contact"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="contact" title="Contact">
                        <div className='header_table'>
                            <span className='title_table'>List of Contacts</span>
                            <button className='button2' onClick={() => setOpenContact(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                            <button className='button2' style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px"}} />Delete</button>
                        </div>

                        <Table
                            pagination={{ pageSize: 7 }}
                            columns={columnsContact}
                            dataSource={dataContact}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        />;

                        <Modal
                            className='title_modal'
                            title="Add Contact"
                            centered
                            open={openContact}
                            onOk={() => setOpenContact(false)}
                            onCancel={() => setOpenContact(false)}
                            width={800}
                        >
                            <ModalContact />
                        </Modal>
                    </Tab>

                    <Tab eventKey="academic-rank" title="Academic Rank">
                        <div className='header_table'>
                            <span className='title_table'>List of Academic Ranks</span>
                            <button className='button2' onClick={() => setOpenAcademicRank(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                            <button className='button2' style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px"}} />Delete</button>
                        </div>

                        <Table
                            pagination={{ pageSize: 7 }}
                            columns={columnsAcademicRank}
                            dataSource={dataAcademicRank}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        />

                        <Modal
                            className='title_modal'
                            title="Add Academic Rank"
                            centered
                            open={openAcademicRank}
                            onOk={() => setOpenAcademicRank(false)}
                            onCancel={() => setOpenAcademicRank(false)}
                            width={800}
                        >
                            <ModalAcademicRank />
                        </Modal>
                    </Tab>

                    <Tab eventKey="academic-title" title="Academic Title">
                        <div className='header_table'>
                            <span className='title_table'>List of Academic Titles</span>
                            <button className='button2' onClick={() => setOpenAcademicTitle(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                            <button className='button2' style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px"}} />Delete</button>
                        </div>

                        <Table
                            pagination={{ pageSize: 7 }}
                            columns={columnsAcademicTitle}
                            dataSource={dataAcademicTitle}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        />

                        <Modal
                            className='title_modal'
                            title="Add Academic Title"
                            centered
                            open={openAcademicTitle}
                            onOk={() => setOpenAcademicTitle(false)}
                            onCancel={() => setOpenAcademicTitle(false)}
                            width={800}
                        >
                            <ModalAcademicTitle />
                        </Modal>
                    </Tab>
                </Tabs>
            </div>
        }
    </>

};

export default Configuration;
