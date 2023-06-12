import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Modal } from 'antd';
import './ModalEditWorkPosition.css';
import { editWorkPosition } from '../../../../api/Lecturer';
import { getAllUniversity } from '../../../../api/Lecturer';

export default function ModalEditWorkPosition(props: any) {
    const { lecturer, canEdit } = props;
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const accountId = localStorage.getItem("accountId");
    const [universitys, setUniversitys] = useState<any>([]);

    // EDIT
    const [idWorkPosition, setIdWorkPosition] = useState<string>();
    const [universityName, setUniversityName] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [fromDate, setFromDate] = useState<string>();
    const [toDate, setToDate] = useState<string>();

    //CREATE
    const [newUniversityName, setNewUniversityName] = useState<string>();
    const [newPosition, setNewPosition] = useState<string>();
    const [newFromDate, setNewFromDate] = useState<string>("nay");
    const [newToDate, setNewToDate] = useState<string>("nay");

    const handleEditCard = (workPosition: any) => {
        setIdWorkPosition(workPosition.id);
        setUniversityName(workPosition.universityName);
        setPosition(workPosition.position);
        setFromDate(workPosition.fromDate);
        setToDate(workPosition.toDate);
        setOpenEditModal(true);
    };

    useEffect(() => {
        const university = getAllUniversity();
        university.then((res) => {
            setUniversitys(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleCreatWorkPosition = () => {
        const data = {
            universityName: newUniversityName,
            position: newPosition,
            fromDate: newFromDate,
            toDate: newToDate
        }
        console.log(data);
    };

    const handleSaveEdit = () => {
        let data: any = {};
        if (toDate == 'nay') {
            data = {
                id: idWorkPosition,
                universityName: universityName,
                position: position,
                fromDate: fromDate,
                toDate: null,
                isNow: true,
            }
        } else {
            data = {
                id: idWorkPosition,
                universityName: universityName,
                position: position,
                fromDate: fromDate,
                toDate: toDate,
                isNow: false
            }
        }

        console.log(data);
        editWorkPosition(lecturer, data, accountId);
        window.location.reload();
    }

    const handleDeleteBook = () => {

    };

    const handleChangeUniversity = (event: any) => {

    };

    const handleNewFromYearChange = (event: any) => {
        setNewFromDate(event.target.value);
    };

    const handleNewToYearChange = (event: any) => {
        setNewToDate(event.target.value);
    };

    const handleFromYearChange = (event: any) => {
        setFromDate(event.target.value);
    };

    const handleToYearChange = (event: any) => {
        setToDate(event.target.value);
    };

    const optionsYear: JSX.Element[] = [];
    for (let year = 2023; year >= 1990; year--) {
        optionsYear.push(
            <option key={year} value={year}>{year}</option>
        );
    }
    optionsYear.push(
        <option key={1} value={1}>Hiện nay</option>
    );

    return (
        <div className="content-profile">
            <div className="main_content">
                <h2 className="title_content">THỜI GIAN CÔNG TÁC</h2>
                {canEdit ? <div className='btn-edit-card' onClick={(e) => { setOpenAddModal(true) }}>
                    <AddIcon style={{
                        fontSize: "20px",
                        cursor: "pointer"
                    }} />
                </div> : null}

                <Modal
                    title="Thêm thời gian công tác"
                    centered
                    open={openAddModal}
                    onOk={handleCreatWorkPosition}
                    onCancel={() => setOpenAddModal(false)}
                    width={700}
                    className="modalStyle"
                >
                    <div>
                        <div className="group">
                            <input required={true}
                                type="text"
                                className="input-edit-profile"
                                value={newUniversityName}
                                onChange={(e) => { setNewUniversityName(e.target.value) }}
                            />
                            <span className="highlight-edit-profile"></span>
                            <span className="bar-edit-profile"></span>
                            <label className='label-edit-profile'>Nơi công tác</label>
                        </div>
                        <div className="group">
                            <input required={true}
                                type="text"
                                className="input-edit-profile"
                                value={newPosition}
                                onChange={(e) => { setNewPosition(e.target.value) }}
                            />
                            <span className="highlight-edit-profile"></span>
                            <span className="bar-edit-profile"></span>
                            <label className='label-edit-profile'>Chức vụ</label>
                        </div>

                        <div className='form-input'>
                            <div className='input-year'>
                                <span>Thời gian bắt đầu: </span>
                                <select id="year" value={newFromDate} onChange={handleNewFromYearChange}>
                                    <option value="nay">Hiện nay</option>
                                    {optionsYear}
                                </select>
                            </div>

                            <div className='input-year'>
                                <span>Thời gian kết thúc: </span>
                                <select id="year" value={newToDate} onChange={handleNewToYearChange}>
                                    <option value="nay">Hiện nay</option>
                                    {optionsYear}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>

                {
                    lecturer?.workPositions == undefined ? <>
                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                            Chưa cập nhật.
                        </span>
                    </> : <>
                        {lecturer?.workPositions.map((workPosition: any) => (
                            <div style={{ marginBottom: "2px" }} key={workPosition.id.toString()}>
                                <p className='data_content' style={{ marginBottom: "-5px" }}>
                                    <div className="card_book">
                                        {canEdit ? <div className='btn-edit-card' onClick={() => handleEditCard(workPosition)}><ModeEditOutlineIcon /></div>
                                            : null}
                                        <div className="name-book">
                                            <p className="name">Nơi công tác: {workPosition.universityName ? workPosition.universityName : workPosition.company}</p>
                                        </div>
                                        <div>Chức vụ: {!workPosition.position ?
                                            <span style={{ fontStyle: "italic", fontSize: "13px" }}>Chưa cập nhật</span> : workPosition.position}</div>
                                        <div className="user-field">
                                            Thời gian:{" "}
                                            {
                                                workPosition.fromDate == null || workPosition.toDate == null ?
                                                    <>
                                                        <span style={{ fontStyle: "italic", fontSize: "13px", marginLeft: "5px" }}>Chưa cập nhật</span>
                                                    </> : <>
                                                        {workPosition.fromDate} - {workPosition.toDate}
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </p>
                            </div>
                        ))}

                        <Modal
                            title="Chỉnh sửa thời gian công tác"
                            centered
                            open={openEditModal}
                            onCancel={() => setOpenEditModal(false)}
                            width={700}
                            className="modalStyle"
                            footer={[
                                <Button key="submit" style={{ backgroundColor: "red", color: "white" }} onClick={() => handleDeleteBook()}>
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
                                        value={universityName}
                                        onChange={(e) => { setUniversityName(e.target.value) }}
                                    />
                                    <span className="highlight-edit-profile"></span>
                                    <span className="bar-edit-profile"></span>
                                    <label className='label-edit-profile'>Nơi công tác</label>
                                </div>
                                <div className="group">
                                    <input required={true}
                                        type="text"
                                        className="input-edit-profile"
                                        value={position}
                                        onChange={(e) => { setPosition(e.target.value) }}
                                    />
                                    <span className="highlight-edit-profile"></span>
                                    <span className="bar-edit-profile"></span>
                                    <label className='label-edit-profile'>Chuyên ngành</label>
                                </div>

                                <div className='form-input'>
                                    <div className='input-year'>
                                        <span>Thời gian bắt đầu: </span>
                                        <select id="year" value={fromDate} onChange={handleFromYearChange}>
                                            <option value="nay">Hiện nay</option>
                                            {optionsYear}
                                        </select>
                                    </div>

                                    <div className='input-year'>
                                        <span>Thời gian kết thúc: </span>
                                        <select id="year" value={toDate} onChange={handleToYearChange}>
                                            <option value="nay">Hiện nay</option>
                                            {optionsYear}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </>
                }
            </div>
        </div>
    )
}
