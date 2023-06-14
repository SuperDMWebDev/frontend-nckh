import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { addNewBook, editDegree } from '../../../../api/Lecturer';
import { Button, Modal } from 'antd';
import { updateBook } from '../../../../api/Lecturer';
import { deleteBook } from '../../../../api/Lecturer';
import { getAllUniversity } from '../../../../api/Lecturer';
import { getAllAcademicTitle } from '../../../../api/Lecturer';
import { createDegree } from '../../../../api/Lecturer';
import { deleteDegree } from '../../../../api/Lecturer';

export default function ModalEditDegree(props: any) {
  const { lecturer, canEdit } = props;
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const accountId = localStorage.getItem('accountId');
  const lecturerId = localStorage.getItem('lecturerId');
  const [universitys, setUniversitys] = useState<any>([]);
  const [academicTitles, setAcademicTitles] = useState<any>([]);

  // EDIT
  const [idDegree, setIdDegree] = useState<string>();
  const [name, setName] = useState<string>();
  const [specialization, setSpecialization] = useState<string>();
  const [year, setYear] = useState<string>();
  const [university, setUniversity] = useState<number>();
  const [academicTitle, setAcademicTitle] = useState<number>();

  //CREATE
  const [newName, setNewName] = useState<string>();
  const [newSpecialization, setNewSpecialization] = useState<string>();
  const [newYear, setNewYear] = useState<string>();
  const [newUniversity, setNewUniversity] = useState<number>(1);
  const [newAcademicTitle, setNewAcademicTitle] = useState<number>(1);

  const handleEditCard = (degree: any) => {
    setName(degree.graduationThesisName);
    setYear(degree.graduationDate);
    setSpecialization(degree.specialization);
    setIdDegree(degree.id);
    setOpenEditModal(true);
  };

  useEffect(() => {
    const university = getAllUniversity();
    university
      .then((res) => {
        setUniversitys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const academicTitle = getAllAcademicTitle();
    academicTitle
      .then((res) => {
        setAcademicTitles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCreatDegree = () => {
    const data = {
      graduationThesisName: newName,
      specialization: newSpecialization,
      universityId: newUniversity,
      graduationDate: newYear,
      academicTitleId: newAcademicTitle
    };
    createDegree(lecturer, data, lecturerId);
    window.location.reload();
  };

  const handleSaveEdit = () => {
    const data = {
      id: idDegree,
      graduationThesisName: name,
      universityId: university,
      graduationDate: year,
      specialization: specialization
    };
    editDegree(lecturer, data, lecturerId);
    console.log(data);
    window.location.reload();
  };

  const handleDeleteBook = () => {
    deleteDegree(lecturer, idDegree, lecturerId);
    window.location.reload();
  };

  const handleChangeUniversity = (event: any) => {
    setNewUniversity(+event.target.value);
    setUniversity(+event.target.value);
  };

  const handleChangeAcademicTitle = (event: any) => {
    setAcademicTitle(+event.target.value);
    setNewAcademicTitle(+event.target.value);
  };

  return (
    <div>
      <div className="content-profile">
        <div className="main_content">
          <h2 className="title_content">ĐỀ TÀI, LUẬN ÁN</h2>
          {canEdit ? (
            <div
              className="btn-edit-card"
              onClick={(e) => {
                setOpenAddModal(true);
              }}>
              <AddIcon
                style={{
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              />
            </div>
          ) : null}

          <Modal
            title="Thêm thông tin"
            centered
            open={openAddModal}
            onOk={handleCreatDegree}
            onCancel={() => setOpenAddModal(false)}
            width={700}
            className="modalStyle">
            <div>
              <div className="group">
                <input
                  required={true}
                  type="text"
                  className="input-edit-profile"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className="label-edit-profile">Tên đề tài, luận án</label>
              </div>
              <div className="group">
                <input
                  required={true}
                  type="text"
                  className="input-edit-profile"
                  value={newSpecialization}
                  onChange={(e) => {
                    setNewSpecialization(e.target.value);
                  }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className="label-edit-profile">Chuyên ngành</label>
              </div>

              <div className="group">
                <select
                  className="input-edit-profile"
                  value={newUniversity}
                  onChange={handleChangeUniversity}>
                  {universitys?.map((option: any) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <div className="label-edit-profile">Trường Đại học</div>
              </div>

              <div className="group">
                <select
                  className="input-edit-profile"
                  value={newAcademicTitle}
                  onChange={handleChangeAcademicTitle}>
                  {academicTitles.map((option: any) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <div className="label-edit-profile">Học vị</div>
              </div>

              <div className="group">
                <input
                  required={true}
                  type="text"
                  className="input-edit-profile"
                  value={newYear}
                  onChange={(e) => {
                    setNewYear(e.target.value);
                  }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className="label-edit-profile">Năm hoàn thành</label>
              </div>
            </div>
          </Modal>

          {lecturer?.degrees == undefined ? (
            <>
              <span style={{ fontSize: '14px', fontStyle: 'italic' }}>Chưa cập nhật.</span>
            </>
          ) : (
            <>
              {lecturer?.degrees.map((degree: any) => (
                <div style={{ marginBottom: '2px' }} key={degree.id.toString()}>
                  <p className="data_content" style={{ marginBottom: '-5px' }}>
                    <div className="card_book">
                      {canEdit ? (
                        <div className="btn-edit-card" onClick={() => handleEditCard(degree)}>
                          <ModeEditOutlineIcon />
                        </div>
                      ) : null}
                      <div className="name-book">
                        <p className="name">Tên đề tài, luận án: {degree.graduationThesisName}</p>
                      </div>
                      <div className="user-field">
                        Chuyên ngành: {degree.specialization} - {degree.universityName}
                      </div>
                      <div>Năm tốt nghiệp: {degree.graduationDate}</div>
                    </div>
                  </p>
                </div>
              ))}

              <Modal
                title="Chỉnh sửa thông tin"
                centered
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                width={700}
                className="modalStyle"
                footer={[
                  <Button
                    key="submit"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleDeleteBook()}>
                    Xóa
                  </Button>,
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
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <span className="highlight-edit-profile"></span>
                    <span className="bar-edit-profile"></span>
                    <label className="label-edit-profile">Tên đề tài, luận án</label>
                  </div>
                  <div className="group">
                    <input
                      required={true}
                      type="text"
                      className="input-edit-profile"
                      value={specialization}
                      onChange={(e) => {
                        setSpecialization(e.target.value);
                      }}
                    />
                    <span className="highlight-edit-profile"></span>
                    <span className="bar-edit-profile"></span>
                    <label className="label-edit-profile">Chuyên ngành</label>
                  </div>
                  <div className="group">
                    <select
                      className="input-edit-profile"
                      value={newUniversity}
                      onChange={handleChangeUniversity}>
                      {universitys.map((option: any) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <span className="highlight-edit-profile"></span>
                    <span className="bar-edit-profile"></span>
                    <div className="label-edit-profile">Trường Đại học</div>
                  </div>
                  <div className="group">
                    <input
                      required={true}
                      type="text"
                      className="input-edit-profile"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    />
                    <span className="highlight-edit-profile"></span>
                    <span className="bar-edit-profile"></span>
                    <label className="label-edit-profile">Năm tốt nghiệp</label>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
