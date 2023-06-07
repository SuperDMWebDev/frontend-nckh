import React, { useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { addNewBook } from '../../../../api/Lecturer';
import { Button, Modal } from 'antd';
import { updateBook } from '../../../../api/Lecturer';
import { deleteBook } from '../../../../api/Lecturer';

export default function ModalEditBook(props: any) {
    const { lecturer, canEdit } = props;
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const accountId = localStorage.getItem("accountId");

    // EDIT
    const [idBook, setIdBook] = useState<string>();
    const [nameBook, setNameBook] = useState<string>();
    const [nameAuthor, setNameAuthor] = useState<string>();
    const [year, setYear] = useState<string>();

    //CREATE
    const [newNameBook, setNewNameBook] = useState<string>();
    const [newNameAuthor, setNewNameAuthor] = useState<string>();
    const [newYear, setNewYear] = useState<string>();


    const handleEditCard = (book: any) => {
        console.log(book);
        setNameBook(book.name);
        setYear(book.publicYear);
        setNameAuthor(book.coAuthors);
        setIdBook(book.id);
        setOpenEditModal(true);
    };

    const handleCreateBook = () => {
        const newBook = {
            "name": newNameBook,
            "publisherName": "IEEE CPS, ISBN-13; 978",
            "publicYear": newYear,
            "coAuthors": newNameAuthor
        }

        addNewBook(lecturer, newBook, accountId);
        window.location.reload();
    };

    const handleSaveEdit = () => {
        const book = {
            "id": idBook,
            "name": nameBook,
            "publisherName": "IEEE CPS, ISBN-13; 978",
            "publicYear": year,
            "coAuthors": nameAuthor
        }
        updateBook(lecturer, book, accountId);
        window.location.reload();
    }

    const handleDeleteBook = () => {
        deleteBook(lecturer, idBook, accountId);
        window.location.reload();
    }


    return (
        <div>
            <div className="content-profile">
                <div className="main_content">
                    <h2 className="title_content">SÁCH</h2>
                    {canEdit ? <div className='btn-edit-card' onClick={(e) => { setOpenAddModal(true) }}>
                        <AddIcon style={{
                            fontSize: "20px",
                            cursor: "pointer"
                        }} />
                    </div> : null}

                    <Modal
                        title="Thêm sách"
                        centered
                        open={openAddModal}
                        onOk={handleCreateBook}
                        onCancel={() => setOpenAddModal(false)}
                        width={700}
                        className="modalStyle"
                    >
                        <div>
                            <div className="group">
                                <input required={true}
                                    type="text"
                                    className="input-edit-profile"
                                    value={newNameBook}
                                    onChange={(e) => { setNewNameBook(e.target.value) }}
                                />
                                <span className="highlight-edit-profile"></span>
                                <span className="bar-edit-profile"></span>
                                <label className='label-edit-profile'>Tên sách</label>
                            </div>
                            <div className="group">
                                <input required={true}
                                    type="text"
                                    className="input-edit-profile"
                                    value={newNameAuthor}
                                    onChange={(e) => { setNewNameAuthor(e.target.value) }}
                                />
                                <span className="highlight-edit-profile"></span>
                                <span className="bar-edit-profile"></span>
                                <label className='label-edit-profile'>Tác giả</label>
                            </div>
                            <div className="group">
                                <input required={true}
                                    type="text"
                                    className="input-edit-profile"
                                    value={newYear}
                                    onChange={(e) => { setNewYear(e.target.value) }}
                                />
                                <span className="highlight-edit-profile"></span>
                                <span className="bar-edit-profile"></span>
                                <label className='label-edit-profile'>Năm xuất bản</label>
                            </div>
                        </div>
                    </Modal>


                    {
                        lecturer?.books == undefined ? <>
                            <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                                Chưa cập nhật.
                            </span>
                        </> : <>
                            {lecturer?.books.map((book: any) => (
                                <div style={{ marginBottom: "2px" }} key={book.id.toString()}>
                                    <p className='data_content' style={{ marginBottom: "-5px" }}>
                                        <div className="card_book">
                                            {
                                                canEdit ? <div className='btn-edit-card' onClick={() => handleEditCard(book)}><ModeEditOutlineIcon /></div>
                                                    : null
                                            }
                                            <div className="name-book">
                                                <p className="name">Sách: {book.name}</p>
                                            </div>
                                            <div className="user-field">Tác giả: {book.coAuthors}</div>
                                            <div>Năm xuất bản: {book.publicYear}</div>
                                        </div>
                                    </p>
                                </div>
                            ))}

                            <Modal
                                title="Chỉnh sửa sách"
                                centered
                                open={openEditModal}
                                onCancel={() => setOpenEditModal(false)}
                                width={700}
                                className="modalStyle"
                                footer={[
                                    <Button key="submit" style={{ backgroundColor: "red", color: "white" }} onClick={handleDeleteBook}>
                                        Xóa
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleSaveEdit}>
                                        Lưu
                                    </Button>
                                ]}>
                                <div>
                                    <div className="group">
                                        <input required={true}
                                            type="text"
                                            className="input-edit-profile"
                                            value={nameBook}
                                            onChange={(e) => { setNameBook(e.target.value) }}
                                        />
                                        <span className="highlight-edit-profile"></span>
                                        <span className="bar-edit-profile"></span>
                                        <label className='label-edit-profile'>Tên sách</label>
                                    </div>
                                    <div className="group">
                                        <input required={true}
                                            type="text"
                                            className="input-edit-profile"
                                            value={nameAuthor}
                                            onChange={(e) => { setNameAuthor(e.target.value) }}
                                        />
                                        <span className="highlight-edit-profile"></span>
                                        <span className="bar-edit-profile"></span>
                                        <label className='label-edit-profile'>Tác giả</label>
                                    </div>
                                    <div className="group">
                                        <input required={true}
                                            type="text"
                                            className="input-edit-profile"
                                            value={year}
                                            onChange={(e) => { setYear(e.target.value) }}
                                        />
                                        <span className="highlight-edit-profile"></span>
                                        <span className="bar-edit-profile"></span>
                                        <label className='label-edit-profile'>Năm xuất bản</label>
                                    </div>
                                </div>
                            </Modal>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
