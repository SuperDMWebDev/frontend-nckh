import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './style.css';
import { resetLecturer, updateProfile } from '../../api/Lecturer';
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
  avatar,
  setReload,
  reload
}) => {
  const lecturerId = localStorage.getItem('lecturerId');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const extractValues = async (contentDraft: any) => {
    let content = contentDraft;
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
    const workPositionRegex = /(\d{4})\s*–\s*(Nay|\d{4})\s*([\s\S]+?)(?=\s*(10|\d{4}\s*–\s*|$))/g;
    const researchRegex = /•\s*([\s\S]+?)\s*(?=II)/g;

    const extractedName = content.match(nameRegex);
    content = content.replace(nameRegex, '');
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
    const positionWorkPosition = content.indexOf('Thời gian công tác:');
    content = content.substring(positionWorkPosition);
    const extractedWorkPosition = content.match(workPositionRegex);
    const positionExpertise = content.indexOf('Lĩnh vực chuyên môn');
    const expertise = 'Công nghệ phần mềm';
    content = content.substring('Hướng nghiên cứu:');
    const extractedResearchField = content.match(researchRegex);

    let arrWorkPosition: any[] = [];
    for (let i = 0; i < 5; i++) {
      if (i === 3) {
        const arrExtracted = extractedWorkPosition[i].split('  ');
        arrWorkPosition.push({
          fromDate: arrExtracted[0],
          toDate: arrExtracted[2],
          position: arrExtracted.slice(arrExtracted.length - 5).join(''),
          company: arrExtracted.slice(3, arrExtracted.length - 5).join(''),
          create: true
        });
      } else {
        const arrExtracted = extractedWorkPosition[i].split('   ');
        arrWorkPosition.push({
          fromDate: arrExtracted[0],
          toDate: arrExtracted[2],
          position: arrExtracted[arrExtracted.length - 1],
          company: arrExtracted.slice(3, arrExtracted.length - 1).join(''),
          create: true
        });
      }
    }
    const arrResearchField: any[] = [];
    if (extractedResearchField.length > 0) {
      const arrExtractedResearchField = extractedResearchField[0].split('•');
      for (let i = 1; i < arrExtractedResearchField.length; i++) {
        if (i == 2) {
          arrExtractedResearchField[i] = arrExtractedResearchField[i].replace('3', '');
        }
        arrResearchField.push({ researchName: arrExtractedResearchField[i].trim(), create: true });
      }
    }

    const data = {
      name: extractedName[1],
      gender: extractedGender[1],
      dateOfBirth: removeSpacesAndHyphens(extractedDateOfBirth[1]),
      workPositions: arrWorkPosition,
      avatar,
      expertises: [
        {
          specialization: expertise,
          create: true
        }
      ],
      researchFields: arrResearchField,
      currentDiscipline: {
        universityName: extractedUniversity[1].trim(),
        disciplineName: extractedDiscipline[1].trim(),
        departmentName: extractedDepartment[1].trim(),
        position: extractedPosition[1].replace(',', ' ').trim(),
        id: currentDiscipline?.id ? currentDiscipline.id : undefined,
        create: !currentDiscipline?.id
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
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent: any = await page.getTextContent();
        const pageContent = textContent.items.map((item: any) => item.str).join(' ');

        content += pageContent;
      }

      await resetLecturer(lecturerId);
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
