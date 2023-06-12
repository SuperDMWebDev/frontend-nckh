import React from 'react';
import { useState, useEffect } from 'react';
import { editInfoProfile } from '../../../../api/Lecturer';
import './style.css';
import { getAllUniversity } from '../../../../api/Lecturer';
import { getAllContactType } from '../../../../api/Lecturer';

export default function ModalEditInfoProfile(props: any) {
  const lecturer = props.props;
  const accoundId = localStorage.getItem('accountId');

  const [newUniversity, setNewUniversity] = useState<string>("1");
  const [newCurrentDisciplines, setNewCurrentDisciplines] = useState<string>();
  const [newGender, setNewGender] = useState<string>("Nam");
  const [newDateOfBirth, setNewDateOfBirth] = useState<string>(lecturer?.dateOfBirth);
  const [newDepartmentName, setNewDepartmentName] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>(lecturer.contacts[0].value);
  const [newAddress, setNewAddress] = useState<string>(lecturer.contacts[1].value);
  const [newPhone, setNewPhone] = useState<string>(lecturer.contacts[2].value);
  const [newLink, setNewLink] = useState<string>(lecturer.contacts[3].value);
  const [universitys, setUniversitys] = useState<any>([]);
  const [contactTypes, setContactTypes] = useState<any>([]);

  useEffect(() => {
    if (lecturer.contacts !== undefined) {
      lecturer.contacts.map((contact: any) => {
        if (contact.contactTypeName == 'phone') {
          setNewPhone(contact.value);
        } else if (contact.contactTypeName == 'address') {
          setNewAddress(contact.value);
        } else if (contact.contactTypeName == 'email') {
          setNewEmail(contact.value);
        }

        if (lecturer?.currentDisciplines !== undefined) {
          setNewCurrentDisciplines(lecturer?.currentDisciplines[0].position);
          setNewDepartmentName(lecturer?.currentDisciplines[0].departmentName);
        }

        const university = getAllUniversity();
        university.then((res) => {
          setUniversitys(res.data.data);
          res.data.data.map((u: any) => {
            u.name == lecturer?.currentDisciplines[0].universityName ? setNewUniversity(u.id) : null;
          });
        }).catch((err) => {
          console.log(err);
        });

        const contactTypes = getAllContactType();
        contactTypes.then((res) => {
          console.log(res);
          setContactTypes(res.data.data);
        }).catch((err) => {
          console.log(err);
        });

      }, []);

      console.log(newUniversity);

      const handleChangeGender = (event: any) => {
        setNewGender(event.target.value);
      };

      const handleChangeUniversity = (event: any) => {
        setNewUniversity(event.target.value);
      };

      const optionsGender = [
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
      ];

      const handleSaveEdit = () => {
        const data = {
          newUniversity: newUniversity,
          newCurrentDisciplines: newCurrentDisciplines,
          newGender: newGender,
          newDateOfBirth: newDateOfBirth,
          newDepartmentName: newDepartmentName,
          email: { email: newEmail, id: 1 },
          address: { address: newAddress, id: 2 },
          phone: { phone: newPhone, id: 3 },
          link: { link: lecturer.contacts[3].value, id: 4 }
        }

        console.log(data);
        editInfoProfile(lecturer, data, accoundId);
        window.location.reload();
      }

      const university = getAllUniversity();
      university
        .then((res) => {
          setUniversitys(res.data.data);
          res.data.data.map((u: any) => {
            u.name == lecturer?.currentDisciplines[0].universityName ? setNewUniversity(u.id) : null;
          });
        })
        .catch((err) => {
          console.log(err);
        });

      const contactTypes = getAllContactType();
      contactTypes
        .then((res) => {
          console.log(res);
          setContactTypes(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChangeGender = (event: any) => {
    setNewGender(event.target.value);
  };

  const handleChangeUniversity = (event: any) => {
    setNewUniversity(event.target.value);
  };

  const optionsGender = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' }
  ];

  const handleSaveEdit = () => {
    const data = {
      newUniversity: newUniversity,
      newCurrentDisciplines: newCurrentDisciplines,
      newGender: newGender,
      newDateOfBirth: newDateOfBirth,
      newDepartmentName: newDepartmentName,
      email: { email: newEmail, id: 1 },
      address: { address: newAddress, id: 2 },
      phone: { phone: newPhone, id: 3 },
      link: { link: lecturer.contacts[3].value, id: 4 }

    };

    console.log(data);
    editInfoProfile(lecturer, data, accoundId);
    window.location.reload();
  };

  return (
    <div>
      <div className="group">
        <input
          required={true}
          type="text"
          className="input-edit-profile"
          value={newCurrentDisciplines}
          onChange={(e) => {
            setNewCurrentDisciplines(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Công việc hiện tại</label>
      </div>

      <div className="group">
        <select className="input-edit-profile" value={newGender} onChange={handleChangeGender}>
          {optionsGender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <div className="label-edit-profile">Giới tính</div>
      </div>

      <div className="group">
        <input
          required={true}
          type="text"
          className="input-edit-profile"
          value={newDateOfBirth}
          onChange={(e) => {
            setNewDateOfBirth(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Ngày sinh</label>
      </div>

      <div className="group">
        <input
          required={true}
          type="text"
          className="input-edit-profile"
          value={newDepartmentName}
          onChange={(e) => {
            setNewDepartmentName(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Chuyên ngành</label>
      </div>

      <div className="group">
        <select className="input-edit-profile" onChange={handleChangeUniversity}>
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
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Email</label>
      </div>

      <div className="group">
        <input
          required={true}
          type="text"
          className="input-edit-profile"
          value={newAddress}
          onChange={(e) => {
            setNewAddress(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Địa chỉ</label>
      </div>

      <div className="group">
        <input
          required={true}
          type="text"
          className="input-edit-profile"
          value={newPhone}
          onChange={(e) => {
            setNewPhone(e.target.value);
          }}
        />
        <span className="highlight-edit-profile"></span>
        <span className="bar-edit-profile"></span>
        <label className="label-edit-profile">Số điện thoại</label>
      </div>

      <button className="btn-save-edit" onClick={handleSaveEdit}>
        Lưu
      </button>
    </div>
  );
}
