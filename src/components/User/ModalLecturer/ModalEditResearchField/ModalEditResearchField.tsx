import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, Modal } from 'antd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import { editResearchField } from '../../../../api/Lecturer';
import { createResearchField } from '../../../../api/Lecturer';


export default function ModalEditResearchField(props: any) {
    const { lecturer, canEdit } = props;
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const accountId = localStorage.getItem("accountId");

    //create
    const [researchField, setResearchField] = useState<string>();
    const [note, setNote] = useState<string>();

    //edit
    const [newResearchField, setNewResearchField] = useState<string>();
    const [newNote, setNewNote] = useState<string>();
    const [idResearchField, setIdResearchField] = useState<string>();

    const handleCreate = () => {
        console.log({ researchField, note });
        const data = {
            researchName: researchField,
            note: note
        }
        createResearchField(lecturer, data, accountId);
        window.location.reload();
    };

    const handleSaveEdit = () => {
        console.log({ newResearchField, newNote, idResearchField });
        const data = {
            id: idResearchField,
            researchName: newResearchField,
            note: newNote
        }
        editResearchField(lecturer, data, accountId);
        window.location.reload();
    };

    const handleEditCard = (researchField: any) => {
        setNewResearchField(researchField.researchName);
        setNewNote(researchField.note);
        setIdResearchField(researchField.id);
        setOpenEditModal(true);
    };

    return (
        <div className="content-profile">
            <div className="main_content">
                <h2 className="title_content">HƯỚNG NGHIÊN CỨU</h2>
                {canEdit ? <div className='btn-edit-card' onClick={(e) => { setOpenAddModal(true) }}>
                    <AddIcon style={{
                        fontSize: "17px",
                        cursor: "pointer"
                    }} />
                </div> : null}
                {
                    lecturer?.researchFields == undefined ? <>
                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                            Chưa cập nhật.
                        </span>
                    </> : <>
                        {lecturer?.researchFields.map((researchField: any) => (
                            <div style={{ marginBottom: '2px' }} key={researchField.id.toString()}>
                                <p className="data_content" style={{ marginBottom: '-5px' }}>

                                    <div className="card_book">
                                        {canEdit ? <div className='btn-edit-card'
                                            onClick={() => handleEditCard(researchField)}
                                            style={{ top: "15px" }}
                                        ><ModeEditOutlineIcon /></div>
                                            : null}
                                        <FiberManualRecordIcon style={{ fontSize: '9px', textAlign: 'center' }} />{' '}
                                        <span>{researchField.researchName}</span>
                                        {researchField.note ? <span>({researchField.note})</span> : null}
                                    </div>
                                </p>
                            </div>
                        ))}
                    </>
                }
            </div>

            <Modal
                title="Thêm thông tin hướng nghiên cứu"
                centered
                open={openAddModal}
                onCancel={() => setOpenAddModal(false)}
                width={700}
                className="modalStyle"
                footer={[
                    <Button key="submit" type="primary" onClick={handleCreate}>
                        Tạo
                    </Button>
                ]}>
                <div>
                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={researchField}
                            onChange={(e) => { setResearchField(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Hướng nghiên cứu</label>
                    </div>

                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={note}
                            onChange={(e) => { setNote(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Ghi chú</label>
                    </div>
                </div>
            </Modal>

            <Modal
                title="Chỉnh sửa thông tin hướng nghiên cứu"
                centered
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                width={700}
                className="modalStyle"
                footer={[
                    <Button key="submit" type="primary" onClick={handleSaveEdit}>
                        Lưu
                    </Button>
                ]}>
                <div>
                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={newResearchField}
                            onChange={(e) => { setNewResearchField(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Hướng nghiên cứu</label>
                    </div>

                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={newNote}
                            onChange={(e) => { setNewNote(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Ghi chú</label>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
