import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, Modal } from 'antd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { editExpertises } from '../../../../api/Lecturer';

export default function ModalEditExpertises(props: any) {
    const { lecturer, canEdit } = props;
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const accountId = localStorage.getItem("accountId");

    const [field, setField] = useState<string>(lecturer?.expertises[0].specialization);
    const [specialized, setSpecialized] = useState<string>(lecturer?.expertises[1].specialization);

    const handleSaveEdit = () => {
        const data = {
            field: field,
            specialized: specialized
        }
        editExpertises(lecturer, data, accountId);
        window.location.reload();
    };

    return (
        <div className="content-profile">
            <div className="main_content">
                <h2 className="title_content">LĨNH VỰC CHUYÊN MÔN</h2>
                {canEdit ? <div className='btn-edit-card' onClick={(e) => { setOpenEditModal(true) }}>
                    <ModeEditOutlineIcon style={{
                        fontSize: "17px",
                        cursor: "pointer"
                    }} />
                </div> : null}
                {lecturer?.expertises.map((expertise: any) => (
                    <div style={{ marginBottom: "2px" }} key={expertise.id.toString()}>
                        <p className='data_content' style={{ marginBottom: "-5px" }}>
                            <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span style={{ fontWeight: "bolder" }}>{expertise.title}</span>: {expertise.specialization}
                        </p>
                    </div>
                ))}
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
                            value={field}
                            onChange={(e) => { setField(e.target.value) }}
                        />
                        <span className="highlight-edit-profile"></span>
                        <span className="bar-edit-profile"></span>
                        <label className='label-edit-profile'>Lĩnh vực</label>
                    </div>

                    <div className="group">
                        <input required={true}
                            type="text"
                            className="input-edit-profile"
                            value={specialized}
                            onChange={(e) => { setSpecialized(e.target.value) }}
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
