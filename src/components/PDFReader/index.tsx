import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './style.css';
import { updateProfile } from '../../api/Lecturer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const removeSpacesAndHyphens = (str: string) => {
  return str.replace(/[\s-]/g, '');
};
const PDFReader: React.FC<any> = ({
  setOpenEditProfile,
  email,
  address,
  phone,
  link,
  currentDiscipline,
  setReload,
  reload
}) => {
  const lecturerId = localStorage.getItem('lecturerId');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const extractValues = async (content: any) => {
    const nameRegex = /Họ và tên:\s*(.+?)\s*2\./;
    const dateOfBirthRegex = /Ngày sinh:\s*(.+?)\s*3\./;
    const genderRegex = /Nam\/nữ:\s*(.+?)\s*4\./;
    const phoneRegex = /Di động: \s*(.+?)\s*3/;
    const emailRegex = /Email \s*(.+?)\s*4/;
    const universityRegex = /Trường\/viện:\s*(.+?)\s*Phòng/;
    const departmentRegex = /Khoa :\s*(.+?)\s*Bộ/;
    const disciplineRegex = /môn :\s*(.+?)\s*Chức/;
    const positionRegex = /Chức vụ:\s*(.+?)\s*5./;
    const addressRegex = /Địa chỉ\s*(.+?\s*P\d+\s*Q\d+)/;
    const linkRegex = /Website\s*(.+?)\s*8/;

    const extractedName = content.match(nameRegex);
    const extractedDateOfBirth = content.match(dateOfBirthRegex);
    const extractedGender = content.match(genderRegex);
    const extractedPhoneNumber = content.match(phoneRegex);
    const extractedEmail = content.match(emailRegex);
    const extractedUniversity = content.match(universityRegex);
    const extractedDepartment = content.match(departmentRegex);
    const extractedDiscipline = content.match(disciplineRegex);
    const extractedPosition = content.match(positionRegex);
    const extractedAddress = content.match(addressRegex);
    const extractedLink = content.match(linkRegex);

    const data = {
      name: extractedName[1],
      gender: extractedGender[1],
      dateOfBirth: removeSpacesAndHyphens(extractedDateOfBirth[1]),
      currentDiscipline: {
        universityName: extractedUniversity[1].trim(),
        disciplineName: extractedDiscipline[1].trim(),
        departmentName: extractedDepartment[1].trim(),
        position: extractedPosition[1].trim(),
        id: currentDiscipline.id
      },
      contacts: [
        {
          id: email.id,
          value: extractedEmail[1].trim(),
          update: true
        },
        {
          id: phone.id,
          value: removeSpacesAndHyphens(extractedPhoneNumber[1]),
          update: true
        },
        {
          id: link.id,
          value: extractedLink[1].trim(),
          update: true
        },
        {
          id: address.id,
          value: extractedAddress[1].trim(),
          update: true
        }
      ]
    };

    const res: any = await updateProfile(lecturerId, data);

    if (res.code === 0) {
      toast.success(res.message);
      navigate('/profile');
    } else {
      toast.error(res.message);
    }
  };

  const handleFileUpload = async (files: any) => {
    const file = files[0];
    const fileReader: any = new FileReader();

    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      const totalPages = pdf.numPages;

      let content = '';
      let pageNumber = 1;

      const page = await pdf.getPage(pageNumber);
      const textContent: any = await page.getTextContent();
      const pageContent = textContent.items.map((item: any) => item.str).join(' ');

      content += pageContent;

      await extractValues(content);
    };

    fileReader.readAsArrayBuffer(file);
  };
  const handleUploadProfile = async (e: any, files: any) => {
    e.preventDefault();
    await handleFileUpload(files);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setOpenEditProfile(false);
  };

  return (
    <div>
      <input type="file" ref={inputRef} onChange={(e) => handleUploadProfile(e, e.target.files)} />
    </div>
  );
};

export default PDFReader;
