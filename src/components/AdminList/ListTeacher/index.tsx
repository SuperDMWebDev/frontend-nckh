import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, MinusOutlined, DeleteFilled } from '@ant-design/icons';
import { Form, InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Loader from '../../Loader/Loader';
import './style.css';
import { deleteAccount, getAllAccounts, signup } from '../../../api/Account';
import { createLecturer, editBioProfile, getListLecturers } from '../../../api/Lecturer';
import { toast } from "react-toastify";

type SizeType = Parameters<typeof Form>[0]['size'];

interface DataType {
  id: number;
  name: string;
  email: string;
}
interface DataId {
  id: number;
}
interface DataName {
  name: string;
}
interface DataEmail {
  email: string;
}

interface Lecturer {
  [key: string]: any; // 👈️ variable key
  name: string;
}
interface Account {
  [key: string]: any; // 👈️ variable key
  email: string;
}

const ListTeacher: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [formType, setFormType] = useState<'create' | 'update'>('create');
  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [lecturerList, setLecturerList] = useState<Lecturer[]>([]);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dataId, setDataId] = useState<DataId[]>([]);

  const [successEmail, setSuccessEmail] = useState<boolean>(false);
  const [successName, setSuccessName] = useState<boolean>(false);

  const locale = {
    emptyText: 'Không có dữ liệu',
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleCreate = () => {
    setFormType('create');
    form.setFieldsValue({ name: '', email: '' });
    setOpen(true);
  };
  const handleUpdate = (record: DataType) => {
    setFormType('update');
    setId(record.id);
    form.setFieldsValue({ name: record.name, email: record.email });
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenDel(false);
  };
  const handleDelete = (record: DataType) => {
    setId(record.id);
    setOpenDel(true);
  };
  const handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onFinish = () => {
    const dataName: DataName[] = [];
    dataName.push({ name: name });
    const payload: any = {
      data: dataName
    }
    if (name === '' || email === '') {
      toast.error('Bạn chưa nhập đầy đủ dữ liệu!');
    } else {
      signup(email).then((code) => {
        if (code === 0) {
          setSuccessEmail(true);
        } else {
          setSuccessEmail(false);
        }
      });

      if (successEmail === false) {
        toast.error('Người dùng này đã tồn tại!');
      }
      else {
        toast.success('Tạo người dùng thành công!');
      }
    }

    getListLecturers().then((result) => {
      setLecturerList(result.data.data);
    });
    getAllAccounts().then((result) => {
      setAccountList(result.data.data);
    });

    const dataArray: DataType[] = [];
    accountList.map((itemAccount: Account, index: number) => {
      const idx = lecturerList.findIndex((itemLecturer: Lecturer) => itemLecturer.accountId === itemAccount.id);
      if (idx >= 0) {
        const newData: DataType = {
          id: itemAccount.id,
          name: lecturerList[idx].name,
          email: itemAccount.email
        };
        dataArray.push(newData);
      }
    });

    if (JSON.stringify(dataArray) !== JSON.stringify(data)) {
      setData(dataArray);
    }

    setOpen(false);
  };

  const onDelete = (accountId: string) => {
    deleteAccount(accountId).then((code) => {
      if (code === 0) {
        toast.success('Xóa người dùng thành công!');
        getListLecturers().then((result) => {
          setLecturerList(result.data.data);
        });
        getAllAccounts().then((result) => {
          setAccountList(result.data.data);
        });

        const dataArray: DataType[] = [];
        accountList.map((itemAccount: Account, index: number) => {
          const idx = lecturerList.findIndex((itemLecturer: Lecturer) => itemLecturer.accountId === itemAccount.id);
          if (idx >= 0) {
            const newData: DataType = {
              id: itemAccount.id,
              name: lecturerList[idx].name,
              email: itemAccount.email
            };
            dataArray.push(newData);
          }
        });

        if (JSON.stringify(dataArray) !== JSON.stringify(data)) {
          setData(dataArray);
        }
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      ...getColumnSearchProps('id')
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '64%',
      ...getColumnSearchProps('email')
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '3%',
      render: (text, record) => (
        <DeleteFilled className="del-button" style={{ cursor: "pointer" }} onClick={() => handleDelete(record)} />
      )
    }
  ];

  const fetchLecturerList = () => {
    useEffect(() => {
      getListLecturers().then((result) => {
        setLecturerList(result.data.data);
      })
        .catch((err) => console.log("Can't get data lecturer: ", err));
    }, []);
  };
  const fetchAccountList = () => {
    useEffect(() => {
      getAllAccounts().then((result) => {
        //setAccountList(result.data.data);
        console.log(result);
      })
        .catch((err) => console.log("Can't get data lecturer: ", err));
    }, []);
  };

  const fetchData = () => {
    fetchLecturerList();
    // fetchAccountList();

    const dataArray: DataType[] = [];
    accountList.map((itemAccount: Account, index: number) => {
      const idx = lecturerList.findIndex((itemLecturer: Lecturer) => itemLecturer.accountId === itemAccount.id);
      if (idx >= 0) {
        const newData: DataType = {
          id: itemAccount.id,
          name: lecturerList[idx].name,
          email: itemAccount.email
        };
        dataArray.push(newData);
      }
    });

    if (JSON.stringify(dataArray) !== JSON.stringify(data)) {
      setData(dataArray);
    }
  };
  fetchData();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="header_table">
            <span
              className="title_table"
              style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}>Danh sách người dùng</span>
            <button className='button2' onClick={handleCreate}><PlusOutlined style={{ marginRight: "10px" }} />Thêm</button>
          </div>

          <Table
            rowKey="id"
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            pagination={{ pageSize: 7 }}
            columns={columns}
            locale={locale}
            dataSource={data}
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
          />

          <Modal
            className="title_modal"
            title="Thêm người dùng"
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
              className="modalTeacher modal-popup"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              onFinish={() => onFinish()}
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 500 }}
            >
              <Form.Item label="Email" name="email">
                <Input placeholder="Nhập email" value={email} onChange={handleInputChangeEmail} />
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
              <Button type="primary" htmlType="submit" onClick={() => onDelete(id.toString())}>
                Có
              </Button>,
              <Button className='btn-cancel' key="back" onClick={handleCancel}>
                Không
              </Button>
            ]}
          >
            Bạn có chắc muốn xóa người dùng này không?
          </Modal>
        </div>
      )}
    </>
  );
};

export default ListTeacher;
