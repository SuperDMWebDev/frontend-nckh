import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
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

interface DataTypeAcademic {
    key: number;
    id: number;
    idTeacher: number;
    nameRank: string;
    nameTitle: string;
    createRankAt: string;
    updateRankAt: string;
    createTitleAt: string;
    updateTitleAt: string;
}
type DataIndexAcademic = keyof DataTypeAcademic;
const dataAcademic: DataTypeAcademic[] = [];
for (let i = 0; i < 46; i++) {
    dataAcademic.push({
        key: i,
        id: i,
        idTeacher: 0,
        nameRank: '',
        nameTitle: '',
        createRankAt: '',
        updateRankAt: '',
        createTitleAt: '',
        updateTitleAt: '',
    });
}

const Configuration: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [open, setOpen] = useState(false);
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
    const handleSearchAcademic = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndexAcademic
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
    const getColumnSearchPropsAcademic = (dataIndex: DataIndexAcademic): ColumnType<DataTypeAcademic> => ({
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '25%',
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
            width: '25%',
            ...getColumnSearchPropsContact('name')
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '25%',
            ...getColumnSearchPropsContact('createAt')
        },
        {
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '25%',
            ...getColumnSearchPropsContact('updateAt')
        }
    ];
    const columnsAcademic: ColumnsType<DataTypeAcademic> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('id'),
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
            width: '12.5%',
            ...getColumnSearchPropsAcademic('idTeacher')
        },
        {
            title: 'Name Of Academic Rank',
            dataIndex: 'nameRank',
            key: 'nameRank',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('nameRank')
        },
        {
            title: 'Name Of Academic Title',
            dataIndex: 'nameTitler',
            key: 'nameTitle',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('nameTitle')
        },
        {
            title: 'Create Rank At',
            dataIndex: 'createRankAt',
            key: 'createRankAt',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('createRankAt')
        },
        {
            title: 'Update Rank At',
            dataIndex: 'updateRankAt',
            key: 'updateRankAt',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('updateRankAt')
        },
        {
            title: 'Create Title At',
            dataIndex: 'createTitleAt',
            key: 'createTitleAt',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('createTitleAt')
        },
        {
            title: 'Update Title At',
            dataIndex: 'updateTitleAt',
            key: 'updateTitleAt',
            width: '12.5%',
            ...getColumnSearchPropsAcademic('updateTitleAt')
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
                            <button className='button2' onClick={() => setOpen(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
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
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={800}
                        >
                            <ModalTeacher />
                        </Modal>
                    </Tab>

                    <Tab eventKey="academic" title="Academic">
                        <div className='header_table'>
                            <span className='title_table'>List of Academics</span>
                            <button className='button2' onClick={() => setOpen(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                        </div>

                        <Table
                            pagination={{ pageSize: 7 }}
                            columns={columnsAcademic}
                            dataSource={dataAcademic}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        />

                        <Modal
                            className='title_modal'
                            title="Add Academic"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={800}
                        >
                            <ModalTeacher />
                        </Modal>
                    </Tab>
                </Tabs>
            </div>
        }
    </>

};

export default Configuration;
