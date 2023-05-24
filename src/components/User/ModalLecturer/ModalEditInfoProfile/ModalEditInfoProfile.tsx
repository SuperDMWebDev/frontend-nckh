import React from 'react';
import { useState, useEffect } from 'react';
import { editInfoProfile } from '../../../../api/Lecturer';
import './style.css';

export default function ModalEditInfoProfile(props: any) {
    const lecturer = props.props;

    const [newUniversity, setNewUniversity] = useState<string>(lecturer?.currentDisciplines[0].universityName);
    const [newCurrentDisciplines, setNewCurrentDisciplines] = useState<string>(lecturer?.currentDisciplines[0].position);
    const [newGender, setNewGender] = useState<string>(lecturer?.gender);
    const [newDateOfBirth, setNewDateOfBirth] = useState<string>(lecturer?.dateOfBirth);
    const [newDepartmentName, setNewDepartmentName] = useState<string>(lecturer?.currentDisciplines[0].departmentName);
    const [newEmail, setNewEmail] = useState<string>();
    const [newAddress, setNewAddress] = useState<string>();
    const [newPhone, setNewPhone] = useState<string>();

    useEffect(() => {
        lecturer.contacts.map((contact: any) => {
            if (contact.contactTypeName == "phone") {
                setNewPhone(contact.value);
            } else if (contact.contactTypeName == "address") {
                setNewAddress(contact.value);
            } else if (contact.contactTypeName == "email") {
                setNewEmail(contact.value);
            }
        });
    }, [])

    const handleChangeGender = (event: any) => {
        setNewGender(event.target.value);
    };

    const handleChangeUniversity = (event: any) => {
        setNewUniversity(event.target.value);
    };

    const optionsUniversity = [
        { value: "a", label: "Truong A" },
        { value: "b", label: "Truong B" },
        { value: "c", label: "Truong C" }
    ];

    const optionsGender = [
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
    ];


    const handleSaveEdit = () => {
        editInfoProfile({ lecturer, newUniversity, newCurrentDisciplines, newGender, newDateOfBirth, newDepartmentName, newEmail, newAddress, newPhone }, "1");
        window.location.reload();
    }


    return (
        <div>
            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newCurrentDisciplines}
                    onChange={(e) => { setNewCurrentDisciplines(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Công việc hiện tại</label>
            </div>

            <div className='group'>
                <select
                    className="input-edit-profile"
                    value={newGender}
                    onChange={handleChangeGender}
                >
                    {optionsGender.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <div className='label-edit-profile'>Giới tính</div>
            </div>

            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newDateOfBirth}
                    onChange={(e) => { setNewDateOfBirth(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Ngày sinh</label>
            </div>

            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newDepartmentName}
                    onChange={(e) => { setNewDepartmentName(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Chuyên ngành</label>
            </div>

            <div className="group">
                <select
                    className="input-edit-profile"
                    value={newUniversity}
                    onChange={handleChangeUniversity}
                >
                    {optionsUniversity.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <div className='label-edit-profile'>Trường Đại học</div>
            </div>

            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newEmail}
                    onChange={(e) => { setNewEmail(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Email</label>
            </div>

            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newAddress}
                    onChange={(e) => { setNewAddress(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Địa chỉ</label>
            </div>

            <div className="group">
                <input required={true}
                    type="text"
                    className="input-edit-profile"
                    value={newPhone}
                    onChange={(e) => { setNewPhone(e.target.value) }}
                />
                <span className="highlight-edit-profile"></span>
                <span className="bar-edit-profile"></span>
                <label className='label-edit-profile'>Số điện thoại</label>
            </div>

            <button className='btn-save-edit' onClick={handleSaveEdit}>Lưu</button>
        </div>
    )
}
