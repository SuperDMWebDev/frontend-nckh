import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Form, InputRef } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { Button, Input, Space, Table, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
// eslint-disable-next-line no-duplicate-imports
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// eslint-disable-next-line no-magic-numbers
type SizeType = Parameters<typeof Form>[0]['size'];

interface DataType {
    key: number;
    id: number;
    name: string;
    createAt: string;
    updateAt: string;
}
interface NameInput {
    name: string;
}
interface IdInput {
    id: number;
}
const _data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    _data.push({
        key: i,
        id: i,
        name: '',
        createAt: '',
        updateAt: ''
    });
}

const Test: React.FC = () => {
    const BASE_URL = 'http://localhost:3001/api/v1/';

    const token = localStorage.getItem("accessToken");

    const handleError = (error: any) => {
        const { response, message } = error;
        if (response) {
            return response;
        }
        return message;
    };


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [formType, setFormType] = useState<'create' | 'update'>('create');
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
    const [form] = Form.useForm();
    const [deleted, setDeleted] = useState(false);

    const [data, setData] = useState<NameInput[]>([]);
    const [id, setId] = useState<IdInput[]>([]);
    const [name, setName] = useState('');

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [contactTypes, setContactTypes] = useState<DataType[]>([]);
    useEffect(() => {
        // eslint-disable-next-line no-shadow
        //getAllContactTypes().then((contactTypes) => setContactTypes(contactTypes));
        // eslint-disable-next-line no-magic-numbers, no-console
    }, []);

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof DataType
    ) => {
        confirm();
        // eslint-disable-next-line no-magic-numbers
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleCreate = () => {
        setFormType('create');
        setName('');
        setOpen(true);
    };
    const handleUpdate = () => {
        setFormType('update');
        form.setFieldsValue({ name: 'name' });
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = () => {
        const newData: NameInput = { name: name };
        data.push(newData);
        setData(data);
        createMultipleContactTypes(data);

        // setData([...data, {name: name}]);
        // form.resetFields();
        // console.log(data);
    };

    const handleSubmit = (data: any) => {
        const newData = [...data, { name: name }];
        setData(newData);
        console.log(data);

        // nameArray.push(values);
        // setOpen(false);
        form.resetFields();
        // eslint-disable-next-line no-console
        // console.log(nameArray);
    };

    const handleDelete = () => {
        // eslint-disable-next-line no-console
        //console.log(idList);
        //deleteMultipleContactTypes(idList);
    };

    const getColumnSearchProps = (dataIndex: keyof DataType): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    // eslint-disable-next-line no-magic-numbers
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
                            // eslint-disable-next-line no-magic-numbers
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
            <SearchOutlined style={{ color: filtered ? 'search-outlined-filtered' : 'search-outlined-not-filtered' }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // eslint-disable-next-line no-magic-numbers
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // eslint-disable-next-line no-confusing-arrow
        render: (text) => (searchedColumn === dataIndex ? text : text)
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%',
            ...getColumnSearchProps('id'),
            onCell: () => {
                return {
                    onClick: (ev) => {
                        navigate('/detail-page');
                    }
                };
            }
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Được tạo vào lúc',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '21%',
            ...getColumnSearchProps('createAt')
        },
        {
            title: 'Cập nhật vào lúc',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '21%',
            ...getColumnSearchProps('updateAt')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={handleUpdate} />
            )
        }
    ];

    // function createMultipleContactTypes(data: NameInput[] | undefined): void {
    //     //throw new Error('Function not implemented.');
    //     //handleSubmit(data);
    //     //console.log(name);
    //     // const value = form.getFieldValue('name');
    //     // console.log(value);
    //     //setData(data);
    //     // const newData = [...data, { name: name }];
    //     // setData(data);
    //     console.log(data);
    // }
    const createMultipleContactTypes = async (data: NameInput[]) => {
        try {
            const res = await axios.post(`${BASE_URL}configs/contact-type/create`, data);

            console.log(data);
            return res;
        } catch (error) {
            return handleError(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const idList: React.Key[] = [];
    // const rowSelection = {
    //     onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {

    //         selectedRowKeys.map(item => {
    //             id.push({ id: parseInt(item.toString()) });
    //             setId(id);
    //         });
    //         console.log(id);

    //         return selectedRowKeys;
    //     },
    //     // getCheckboxProps: (record: DataType) => ({
    //     //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     //     name: record.name,
    //     // }),
    // };


    const rowSelection = {
        // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        //     selectedRowKeys.map(item => {
        //         id.push({ id: parseInt(item.toString()) });
        //         setId(id);
        //     });
        //     //console.log(id);

        //     return selectedRowKeys;
        // },
        onSelect: (record: any, selected: any) => {
            if (!selected) {
                const index = id.findIndex((item) => item.id === record.id);
                id.splice(index, 1);
                setId(id);
            } else {
                id.push({ id: record.id });
                setId(id);
            }
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            if (!selected) {
                //setId([]);
                while (id.length != 0) {
                    id.splice(0, 1);
                }
                setId(id);
                //console.log(id);
            } else {
                while (id.length != 0) {
                    id.splice(0, 1);
                }
                console.log(id);
                selectedRows.map((item: DataType) => {
                    //console.log(id);
                    const cur: IdInput = { id: item.id};
                    //console.log(cur);
                    
                    //if (id.indexOf(cur) === -1) {
                        //console.log(!id.includes(cur));
                        id.push({ id: item.id });
                        //setId(id);
                        //console.log(id);
                    //}
                });
                setId(id);
                console.log(id);
                //setId(selectedRows.map((row: { id: any; }) => ({ id: row.id })));
                //console.log(id);
            }
        },
    };




    return <>
        {
            <>
                <div className='header_table'>
                    <span className='title_table'>Danh sách liên hệ</span>
                    <button className='button2' onClick={handleCreate}><PlusOutlined style={{ marginRight: "10px" }} />Thêm</button>
                    <button className='button2' onClick={handleDelete} style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px" }} />Xóa</button>
                    <button className='button2' onClick={handleUpdate}><PlusOutlined style={{ marginRight: "10px" }} />Cap nhat</button>
                </div>

                <Table
                    rowKey="id"
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    pagination={{ pageSize: 7 }}
                    columns={columns}
                    dataSource={_data}
                    // eslint-disable-next-line no-magic-numbers, no-confusing-arrow
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                />

                <Modal
                    className='title_modal'
                    title={formType === "create" ? "Thêm liên hệ" : "Sửa liên hệ"}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={handleCancel}
                    width={500}
                    destroyOnClose
                    footer={[
                        // <Button key="back" onClick={handleCancel}>
                        //     Thoát
                        // </Button>,
                        // // eslint-disable-next-line react/jsx-key
                        // <Button type="primary" onClick={handleSubmit}>
                        //     OK
                        // </Button>
                    ]}
                >
                    <div id="name-input"></div>
                    <Form
                        form={form}
                        className="modalContact modal-popup"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={onFinish}
                        initialValues={{ size: componentSize }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize as SizeType}
                        style={{ maxWidth: 500 }}
                    >
                        <Form.Item label="Tên" name="name">
                            <Input placeholder="Liên hệ" value={name} onChange={handleInputChange} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        }
    </>;
};

export default Test;
