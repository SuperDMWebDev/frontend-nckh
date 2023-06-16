import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, Modal } from 'antd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { addExpertises, editExpertises } from '../../../../api/Lecturer';
import AddIcon from '@mui/icons-material/Add';

export default function ModalEditExpertises(props: any) {
  const { lecturer, canEdit, getInfoLecturer } = props;
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const accountId = localStorage.getItem('accountId');
  const lecturerId = localStorage.getItem('lecturerId');

  const [addTitle, setAddTitle] = useState<string>('');
  const [addSpecialization, setAddSpecializaation] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editSpecialization, setEditSpecialization] = useState<string>('');
  const [currentEdit, setCurrentEdit] = useState<any>();

  const handleEditCard = (expertise: any) => {
    setCurrentEdit(expertise.id);
    setEditTitle(expertise.title);
    setEditSpecialization(expertise.specialization);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    const data = {
      id: currentEdit,
      title: editTitle,
      specialization: editSpecialization
    };

    await editExpertises(lecturer, data, lecturerId);
    setOpenEditModal(false);
    await getInfoLecturer();
  };

  const handleSaveCreate = async () => {
    const data = {
      title: addTitle,
      specialization: addSpecialization
    };

    await addExpertises(lecturer, data, lecturerId);
    setOpenAddModal(false);
    await getInfoLecturer();
  };

  return (
    <div className="content-profile">
      <div className="main_content">
        <h2 className="title_content">LĨNH VỰC CHUYÊN MÔN</h2>
        {canEdit ? (
          <div className="btn-edit-card" onClick={() => setOpenAddModal(true)}>
            <AddIcon
              style={{
                fontSize: '20px',
                cursor: 'pointer'
              }}
            />
          </div>
        ) : null}
        {lecturer?.expertises === undefined ? (
          <>
            <span style={{ fontSize: '14px', fontStyle: 'italic' }}>Chưa cập nhật.</span>
          </>
        ) : (
          <>
            {lecturer?.expertises.map((expertise: any) => (
              <div style={{ marginBottom: '2px' }} key={expertise.id.toString()}>
                <p className="data_content" style={{ marginBottom: '-5px' }}>
                  <div className="card_book">
                    {canEdit ? (
                      <div className="btn-edit-card" onClick={() => handleEditCard(expertise)}>
                        <ModeEditOutlineIcon />
                      </div>
                    ) : null}
                    <div className="name-book">
                      <p className="name">
                        Lĩnh vực: {expertise.title ? expertise.title : 'Chưa cập nhật'}
                      </p>
                    </div>
                    <div>
                      Chuyên môn:{' '}
                      {expertise.specialization ? expertise.specialization : 'Chưa cập nhật'}
                    </div>
                  </div>
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      <Modal
        title="Chỉnh sửa thông tin"
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={700}
        className="modalStyle"
        footer={[
          <Button key="submit" type="primary" onClick={() => handleSaveEdit()}>
            Lưu
          </Button>
        ]}>
        <div>
          <div className="group">
            <input
              required
              type="text"
              className="input-edit-profile"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Lĩnh vực</label>
          </div>

          <div className="group">
            <input
              required
              type="text"
              className="input-edit-profile"
              value={editSpecialization}
              onChange={(e) => {
                setEditSpecialization(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Chuyên ngành</label>
          </div>
        </div>
      </Modal>
      <Modal
        title="Thêm thông tin"
        centered
        open={openAddModal}
        onOk={() => handleSaveCreate()}
        onCancel={() => setOpenAddModal(false)}
        width={700}
        className="modalStyle">
        <div>
          <div className="group">
            <input
              required
              type="text"
              className="input-edit-profile"
              value={addTitle}
              onChange={(e) => {
                setAddTitle(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Lĩnh vực</label>
          </div>

          <div className="group">
            <input
              required
              type="text"
              className="input-edit-profile"
              value={addSpecialization}
              onChange={(e) => {
                setAddSpecializaation(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Chuyên ngành</label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
