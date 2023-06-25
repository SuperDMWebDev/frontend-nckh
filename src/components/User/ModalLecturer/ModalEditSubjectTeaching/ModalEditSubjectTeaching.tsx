import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, Modal } from 'antd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import { createResearchField } from '../../../../api/Lecturer';
import { editSubjectTeaching } from '../../../../api/Lecturer';
import { createSubjectTeaching } from '../../../../api/Lecturer';

export default function ModalEditSubjectTeaching(props: any) {
  const { lecturer, canEdit } = props;
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const lecturerId = localStorage.getItem('lecturerId');

  //create
  const [subjectTeaching, setSubjectTeaching] = useState<string>();

  //edit
  const [newSubjectTeaching, setNewSubjectTeaching] = useState<string>();
  const [idSubjectTeaching, setIdSubjectTeaching] = useState<string>();

  const handleCreate = () => {
    const data = {
      subjectTeaching: subjectTeaching,
    };
    createSubjectTeaching(lecturer, data, lecturerId);
    window.location.reload();
  };

  const handleSaveEdit = () => {
    const data = {
      id: idSubjectTeaching,
      disciplineName: newSubjectTeaching,
    };
    editSubjectTeaching(lecturer, data, lecturerId);
    window.location.reload();
  };

  const handleEditCard = (item: any) => {
    setNewSubjectTeaching(item.disciplineName);
    setIdSubjectTeaching(item.id);
    setOpenEditModal(true);
  };

  return (
    <div className="content-profile">
      <div className="main_content">
        <h2 className="title_content">MÔN HỌC GIẢNG DẠY</h2>
        {canEdit ? (
          <div
            className="btn-edit-card"
            onClick={(e) => {
              setOpenAddModal(true);
            }}>
            <AddIcon
              style={{
                fontSize: '17px',
                cursor: 'pointer'
              }}
            />
          </div>
        ) : null}
        {lecturer?.currentDisciplines == undefined ? (
          <>
            <span style={{ fontSize: '14px', fontStyle: 'italic' }}>Chưa cập nhật.</span>
          </>
        ) : (
          <>
            {lecturer?.currentDisciplines.map((item: any) => (
              <div>
                {
                  item.disciplineName != null ? <div>
                    <div style={{ marginBottom: '2px' }} key={item.id.toString()}>
                      <p className="data_content" style={{ marginBottom: '-5px' }}>
                        <div className="card_book">
                          {canEdit ? (
                            <div
                              className="btn-edit-card"
                              onClick={() => handleEditCard(item)}
                              style={{ top: '15px' }}>
                              <ModeEditOutlineIcon />
                            </div>
                          ) : null}
                          <FiberManualRecordIcon style={{ fontSize: '9px', textAlign: 'center' }} />{' '}
                          <span>{item.disciplineName}</span>
                        </div>
                      </p>
                    </div>
                  </div> : null
                }
              </div>
            ))}
          </>
        )}
      </div>

      <Modal
        title="Thêm thông tin"
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
            <input
              required={true}
              type="text"
              className="input-edit-profile"
              value={subjectTeaching}
              onChange={(e) => {
                setSubjectTeaching(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Môn học giảng dạy</label>
          </div>
        </div>
      </Modal>

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
            <input
              required={true}
              type="text"
              className="input-edit-profile"
              value={newSubjectTeaching}
              onChange={(e) => {
                setNewSubjectTeaching(e.target.value);
              }}
            />
            <span className="highlight-edit-profile"></span>
            <span className="bar-edit-profile"></span>
            <label className="label-edit-profile">Môn học giảng dạy</label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
