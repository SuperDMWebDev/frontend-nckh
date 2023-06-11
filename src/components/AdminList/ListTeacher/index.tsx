import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { MenuProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Modal } from 'antd';
import ModalTeacher from '../ModalTeacher';
import Loader from '../../Loader/Loader';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../api/Account';
import { getListLecturers } from '../../../api/Lecturer';

interface DataType {
  stt: number;
  name: string;
  currentPosition: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    stt: i,
    name: `Member. ${i}`,
    currentPosition: 'string'
  });
}

// Menu Dropdown
const items: MenuProps['items'] = [
  {
    label: (
      <div className="button_delete" onClick={(e) => console.log(e.target)}>
        <DeleteOutlined style={{ marginRight: '10px' }} />
        Delete
      </div>
    ),
    key: 'delete'
  }
];

type Lecturer = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

const ListTeacher: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '10%',
      ...getColumnSearchProps('stt')
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name')
      // onCell: () => {
      //   return {
      //     onClick: (e) => {
      //       navigate('/detail-page');
      //     }
      //   };
      // }
    },
    {
      title: 'Vị trí hiện tại',
      dataIndex: 'currentPosition',
      key: 'currentPosition',
      width: '60%',
      ...getColumnSearchProps('currentPosition')
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '3%',
      render: (text, record) => (
        <div style={{ cursor: 'pointer' }} onClick={() => console.log(record.stt, text)}>
          <Dropdown menu={{ items }}>
            <MoreOutlined />
          </Dropdown>
        </div>
      )
    }
  ];

  const [email, setEmail] = useState<string>('');
  const [lecturerList, setLecturerList] = useState<Lecturer>();
  const handleeOk = () => {
    signup(email);
    setOpen(false);
    window.location.reload();
  };

  const dataAuthor = lecturerList?.map((item: Lecturer, index: number) => {
    console.log('🚀 ~ file: index.tsx:204 ~ dataAuthor ~ item:', item);

    return {
      stt: index + 1,
      name: item.name,
      currentPosition: item?.currentDisciplines ? item?.currentDisciplines[0].universityName : ''
    };
  });

  console.log(dataAuthor);

  useEffect(() => {
    const data: Promise<Lecturer> = getListLecturers();
    data
      .then((result) => {
        setLecturerList(result.data.data);
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  console.log(lecturerList);

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
              }}>
              Danh sách người dùng
            </span>
            <button className="button2" onClick={() => setOpen(true)}>
              <PlusOutlined style={{ marginRight: '10px' }} />
              Thêm
            </button>
          </div>

          <Table
            pagination={{ pageSize: 7 }}
            columns={columns}
            dataSource={dataAuthor}
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
          />

          <Modal
            className="title_modal"
            title="Tạo tài khoản mới"
            centered
            open={open}
            onOk={handleeOk}
            onCancel={() => setOpen(false)}
            width={800}>
            <div className="form-input-add">
              <label className="label-input-add">Email</label>
              <input
                type="text"
                className="email-input-add"
                placeholder="Nhập email ..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ListTeacher;
