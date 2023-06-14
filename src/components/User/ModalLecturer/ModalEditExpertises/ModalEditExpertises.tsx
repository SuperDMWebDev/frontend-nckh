import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, Modal } from 'antd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { editExpertises } from '../../../../api/Lecturer';

export default function ModalEditExpertises(props: any) {
    const { lecturer, canEdit } = props;
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const accountId = localStorage.getItem("accountId");
    const lecturerId = localStorage.getItem("lecturerId");

    const [field, setField] = useState<string>("");
    const [specialized, setSpecialized] = useState<string>("");

    const [editField, setEditField] = useState<string>(field);
    const [editSpecialized, setEditSpecialized] = useState<string>(specialized);

    useEffect(() => {
        if (lecturer?.expertises !== undefined) {
            setField(lecturer?.expertises[0].specialization);
            setSpecialized(lecturer?.expertises[1].specialization);
        }
    });

    const handleSaveEdit = () => {
        const data = {
            field: editField,
            specialized: editSpecialized
        }
        editExpertises(lecturer, data, lecturerId);
        window.location.reload();
    };

    const handleOpenEditModal = () => {
        setEditField(field);
        setEditSpecialized(specialized);
        setOpenEditModal(true);
    }

    return (
        <div className="content-profile">
            <div className="main_content">
                <h2 className="title_content">LĨNH VỰC CHUYÊN MÔN</h2>
                {canEdit ? <div className='btn-edit-card' onClick={handleOpenEditModal}>
                    <ModeEditOutlineIcon style={{
                        fontSize: "17px",
                        cursor: "pointer"
                    }} />
                </div> : null}
                {
                    lecturer?.expertises == undefined ? <>
                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                            Chưa cập nhật.
                        </span>
                    </> : <>
                        {lecturer?.expertises.map((expertise: any) => (
                            <div style={{ marginBottom: "2px" }} key={expertise.id.toString()}>
                                <p className='data_content' style={{ marginBottom: "-5px" }}>
                                    <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span style={{ fontWeight: "bolder" }}>{expertise.title}</span>: {expertise.specialization}
                                </p>
                            </div>
                        ))}
                    </>
                }
            </div>

            <Modal
                title="Chỉnh sửa thông tin"
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
                            value={editField}
                            onChange={(e) => { setEditField(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Lĩnh vực</label>
                    </div>

                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={editSpecialized}
                            onChange={(e) => { setEditSpecialized(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Chuyên ngành</label>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
