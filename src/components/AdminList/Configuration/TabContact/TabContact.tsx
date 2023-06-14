import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Form, InputRef } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { Button, Input, Space, Table, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
// eslint-disable-next-line no-duplicate-imports
import { PlusOutlined } from '@ant-design/icons';
import { createMultipleContactTypes, deleteMultipleContactTypes, getAllContactTypes, updateContactType } from '../../../../api/Configuration';
import { toast } from "react-toastify";

// eslint-disable-next-line no-magic-numbers
type SizeType = Parameters<typeof Form>[0]['size'];

interface DataType {
    id: number;
    name: string;
}
interface DataName {
    name: string;
}
interface DataId {
    id: number;
}

const TabContact: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [formType, setFormType] = useState<'create' | 'update'>('create');
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
    const [form] = Form.useForm();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [dataId, setDataId] = useState<DataId[]>([]);

    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    const locale = {
        emptyText: 'Không có dữ liệu',
    };
    
    const [contactTypes, setContactTypes] = useState<DataType[]>([]);
    useEffect(() => {
        // eslint-disable-next-line no-shadow
        getAllContactTypes().then((contactTypes) => setContactTypes(contactTypes));
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
        form.setFieldsValue({ name: '' });
        setOpen(true);
    };
    const handleUpdate = (record: DataType) => {
        setFormType('update');
        setId(record.id);
        form.setFieldsValue({ name: record.name });
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
        setOpenDel(false);
    };
    const handleDelete = () => {
        if (dataId.length === 0) {
            toast.error('Bạn chưa chọn liên hệ nào để xóa!');
        } else {
            setOpenDel(true);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onFinish = () => {
        if (formType === 'create') {
            const dataName: DataName[] = [];
            dataName.push({ name: name });
            const payload: any = {
                data: dataName
            }
            if (name === '') {
                toast.error('Bạn chưa nhập liên hệ!');
            } else {
                createMultipleContactTypes(payload).then((code) => {
                    if (code === 0) {
                        toast.success('Tạo liên hệ thành công!');
                    } else {
                        toast.error('Tạo liên hệ thất bại!');
                    }
                    getAllContactTypes().then((contactTypes) => setContactTypes(contactTypes));
                    setOpen(false);
                });
            }
        } else {
            const dataUpdate: DataType = { id: id, name: name };
            if (dataUpdate.name === '') {
                toast.error('Bạn chưa nhập liên hệ!');
            } else {
                updateContactType(dataUpdate).then((code) => {
                    if (code === 0) {
                        toast.success('Cập nhật liên hệ thành công!');
                    } else {
                        toast.error('Cập nhật liên hệ thất bại!');
                    }
                    getAllContactTypes().then((contactTypes) => setContactTypes(contactTypes));
                    setOpen(false);
                });
            }
        }
    };
    const onDelete = () => {
        const temp: any = {
            data: dataId
        }
        const payload: any = {
            data: temp
        }
        deleteMultipleContactTypes(payload).then((code) => {
            if (code === 0) {
                toast.success('Xóa liên hệ thành công!');
                getAllContactTypes().then((contactTypes) => setContactTypes(contactTypes));
            } else {
                toast.error('Xóa liên hệ thất bại!');
            }
            setOpenDel(false);
        });
    };

    const rowSelection = {
        onSelect: (record: any, selected: boolean) => {
            if (!selected) {
                const index = dataId.findIndex((item) => item.id === record.id);
                dataId.splice(index, 1);
                setDataId(dataId);
            } else {
                dataId.push({ id: record.id });
                setDataId(dataId);
            }
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            if (!selected) {
                while (dataId.length != 0) {
                    dataId.splice(0, 1);
                }
                setDataId(dataId);
            } else {
                while (dataId.length != 0) {
                    dataId.splice(0, 1);
                }
                selectedRows.map((item: DataType) => {
                    dataId.push({ id: item.id });
                });
                setDataId(dataId);
            }
        },
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
            width: '3%',
            ...getColumnSearchProps('id')
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '94%',
            ...getColumnSearchProps('name')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={() => handleUpdate(record)} />
            )
        }
    ];

    return <>
        {
            <>
                <div className='header_table'>
                    <span className='title_table'>Danh sách liên hệ</span>
                    <button className='button2' onClick={handleCreate}><PlusOutlined style={{ marginRight: "10px" }} />Thêm</button>
                    <button className='button2' onClick={handleDelete} style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px" }} />Xóa</button>
                </div>

                <Table
                    rowKey="id"
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    pagination={{ pageSize: 7 }}
                    columns={columns}
                    locale={locale}
                    dataSource={contactTypes}
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
                    footer={[]}
                >
                    <Form
                        form={form}
                        className="modalContact modal-popup"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={() => onFinish()}
                        initialValues={{ size: componentSize }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize as SizeType}
                        style={{ maxWidth: 500 }}
                    >
                        <Form.Item label="Tên" name="name">
                            <Input placeholder="Nhập liên hệ" value={name} onChange={handleInputChange} />
                        </Form.Item>

                        <Form.Item className='btn-controls' wrapperCol={{ offset: 8, span: 16 }}>
                            <Button className='btn-cancel' key="back" onClick={handleCancel}>
                                Thoát
                            </Button>
                            <Button type="primary" htmlType="submit">
                                OK
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    className='title_modal'
                    centered
                    open={openDel}
                    onOk={() => setOpenDel(false)}
                    onCancel={handleCancel}
                    width={500}
                    destroyOnClose
                    footer={[
                        <Button type="primary" htmlType="submit" onClick={onDelete}>
                            Có
                        </Button>,
                        <Button className='btn-cancel' key="back" onClick={handleCancel}>
                            Không
                        </Button>
                    ]}
                >
                    Bạn có chắc muốn xóa liên hệ này không?
                </Modal>
            </>
        }
    </>;
};

export default TabContact;
