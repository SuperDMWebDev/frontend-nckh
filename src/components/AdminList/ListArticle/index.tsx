import React, { useRef, useState, useEffect } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { PlusOutlined } from '@ant-design/icons';
import Loader from '../../Loader/Loader';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { exportExcelArticles, getArticles } from '../../../api/Article';
import ExportExcelModal from '../../ExportExcelModal';

interface DataType {
    index: number;
    id: number;
    name: string;
    type: string;
    date: string;
    rank: string;
}
interface Article {
    [key: string]: any; // 👈️ variable key
    id: number;
    name: string;
    journal: string;
    conference: string;
    day: number;
    month: number;
    year: number;
    rank: string;
}

const ListArticle: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [openExportModal, setOpenExportModal] = useState(false);

    const [articleList, setArticleList] = useState<Article[]>([]);
    const [data, setData] = useState<DataType[]>([]);

    const navigate = useNavigate();

    const locale = {
        emptyText: 'Không có dữ liệu',
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const fetchArticleList = () => {
        useEffect(() => {
            getArticles().then((result) => {
                setArticleList(result.data.data);
            })
                .catch((err) => console.log("Can't get data article: ", err));
        }, []);
    };
    const fetchData = () => {
        fetchArticleList();

        const dataArray: DataType[] = [];
        articleList?.map((item: Article, index: number) => {
            const date: string = `
                ${item.day !== null ? `${item.day} - ` : ''}${item.month !== null ? `${item.month} - ` : ''}${item.year}`;
            const newData: DataType = {
                index: index + 1,
                id: item.id,
                name: item.name,
                type: item.conference === null ? 'Tạp chí' : 'Hội nghị',
                date: date,
                rank: item.rank
            };
            dataArray.push(newData);
        });

        if (JSON.stringify(dataArray) !== JSON.stringify(data)) {
            setData(dataArray);
        }
    };
    fetchData();

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
        navigate('/create-article');
    };

    const getColumnSearchProps = (dataIndex: keyof DataType): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm ${dataIndex}`}
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
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Bộ lọc
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        Đóng
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
            dataIndex: 'index',
            key: 'index',
            width: '5%'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '55%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: '12%',
            ...getColumnSearchProps('type')
        },
        {
            title: 'Ngày phát hành',
            dataIndex: 'date',
            key: 'date',
            width: '18%',
            ...getColumnSearchProps('date')
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            width: '10%',
            ...getColumnSearchProps('rank')
        }
    ];

    const handleExport = async (selectedYear: any) => {
        await exportExcelArticles(selectedYear);
        setOpenExportModal(false);
    };

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
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                width: "68%"
                            }}>Danh sách công bố khoa học</span>
                        <button className='button2' onClick={handleCreate}><PlusOutlined style={{ marginRight: "10px" }} />Thêm</button>
                        <button className='button2' style={{ marginLeft: "10px" }} onClick={() => setOpenExportModal(true)}><DownloadOutlined style={{ marginRight: "10px" }} />Xuất excel</button>
                    </div>

                    <Table
                        rowKey="id"
                        pagination={{ pageSize: 7 }}
                        columns={columns}
                        locale={locale}
                        dataSource={data}
                        rowClassName={(record, index) =>
                            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                        }
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    localStorage.setItem('articleId', record.id.toString());
                                    navigate(`/article-detail/${record.id}`);
                                },
                            };
                        }}
                    />

                    <ExportExcelModal
                        visible={openExportModal}
                        onClose={() => setOpenExportModal(false)}
                        onExport={handleExport}
                    />
                </div>
            )}
        </>
    );
};

export default ListArticle;
