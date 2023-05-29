import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { createArticle } from '../../../api/Article';
import { getTag } from '../../../api/Tag';
import { getAllLecturers } from '../../../api/Lecturer';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthorTag from '../../../components/User/AuthorTag/AuthorTag';
type SizeType = Parameters<typeof Form>[0]['size'];

interface ArticleType {
  name: string;
  journal: string;
}

type OptionSelect = {
  value: number;
  label: string;
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const accountId: string | null = localStorage.getItem('accountId');
  const [name, setName] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState<number>();
  const [issue, setIssue] = useState<number>();
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [abstract, setAbstract] = useState('');
  const [ArXivID, setArXivID] = useState('');
  const [DOI, setDOI] = useState('');
  const [ISBN, setISBN] = useState('');
  const [ISSN, setISSN] = useState('');
  const [PMID, setPMID] = useState('');
  const [Scopus, setScopus] = useState('');
  const [PII, setPII] = useState('');
  const [SGR, setSGR] = useState('');
  const [projectId, setProjectId] = useState('');
  const [citationKey, setCitationKey] = useState('');
  const [generalNote, setGeneralNote] = useState('');

  const [tagList, setTagList] = useState<OptionSelect[]>([]);
  const [lecturerList, setLecturerList] = useState<OptionSelect[]>([]);
  const [selectedTag, setSelectedTag] = useState<OptionSelect[]>();
  const handleSelect = (data: any) => {
    setSelectedTag(data);
  };
  const [selectedLecturer, setSelectedLecturer] = useState<OptionSelect[]>();
  const handleSelectLecturer = (data: any) => {
    setSelectedLecturer(data);
  };

  const [authorPayload, setAuthorPayload] = useState<any[]>([]);
  const [urlPayload, setUrlPayload] = useState<any[]>([]);
  const [notePayload, setNotePayload] = useState<any[]>([]);

  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const fetchTag = async () => {
    const res = await getTag();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          let newData: OptionSelect[] = [];
          data.map((item: { id: number; name: string }) => {
            let obj: OptionSelect = { value: item.id, label: item.name };
            newData.push(obj);
          });
          setTagList(newData);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const fetchLecturer = async () => {
    const res = await getAllLecturers();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          let newData: OptionSelect[] = [];
          data.map((item: { id: number; name: string }) => {
            let obj: OptionSelect = { value: item.id, label: item.name };
            newData.push(obj);
          });
          setLecturerList(newData);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const handleGetAuthor = (list: any) => {
    setAuthorPayload(list);
  };

  const handleGetNote = (list: any) => {
    var notes: any[] = [];
    list?.map((item: string) => {
      let obj = {
        note: item
      };
      notes.push(obj);
    });
    setNotePayload(notes);
  };

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/profile');
  };

  const handleCreateArticle = async () => {
    var tags: any[] = [];
    var authors: any[] = [
      {
        lecturerId: parseInt(accountId!)
      }
    ];

    selectedTag?.map((item: { value: number; label: string }) => {
      let obj = { tag_id: item.value };
      tags.push(obj);
    });

    selectedLecturer?.map((item: { value: number; label: string }) => {
      let obj = { lecturerId: item.value };
      authors.push(obj);
    });

    authorPayload?.map((item) => {
      authors.push(item);
    });

    var data = {
      name,
      journal,
      volume,
      issue,
      day,
      month,
      year,
      abstract,
      ArXivID,
      DOI,
      ISBN,
      ISSN,
      PMID,
      Scopus,
      PII,
      SGR,
      projectId,
      citationKey,
      generalNote,
      tags,
      authors,
      notes: notePayload
    };

    var bodyFormData = new FormData();
    bodyFormData.append('data', JSON.stringify(data));
    const res = await createArticle(bodyFormData);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          toast.success('Create article sucessfully');
          navigate('/profile');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.success('Fail to create article');
          navigate('/profile');
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    fetchTag();
    fetchLecturer();
  }, []);

  return (
    <Styled>
      <div className="header_topbar">
        <div className="btn-back-search" onClick={handleBackSearch}>
          <ArrowBackIcon /> quay lại trang cá nhân
        </div>
        <div className="content_tab_name tab-selected">TẠO BÀI BÁO KHOA HỌC</div>
      </div>
      <div className="container">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}>
          <Form.Item label="DOI">
            <Input value={DOI} onChange={(e) => setDOI(e.target.value)} />
          </Form.Item>

          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Journal">
            <Input value={journal} onChange={(e) => setJournal(e.target.value)} />
          </Form.Item>

          <Form.Item label="Volume">
            <Input value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
          </Form.Item>

          <Form.Item label="Issue">
            <Input value={issue} onChange={(e) => setIssue(parseInt(e.target.value))} />
          </Form.Item>

          <Form.Item label="Day">
            <Input value={day} onChange={(e) => setDay(parseInt(e.target.value))} />
          </Form.Item>
          <Form.Item label="Month">
            <Input value={month} onChange={(e) => setMonth(parseInt(e.target.value))} />
          </Form.Item>
          <Form.Item label="Year">
            <Input value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
          </Form.Item>

          <Form.Item label="Abstract">
            <Input value={abstract} onChange={(e) => setAbstract(e.target.value)} />
          </Form.Item>

          <Form.Item label="ArXivID">
            <Input value={ArXivID} onChange={(e) => setArXivID(e.target.value)} />
          </Form.Item>

          <Form.Item label="ISBN">
            <Input value={ISBN} onChange={(e) => setISBN(e.target.value)} />
          </Form.Item>

          <Form.Item label="ISSN">
            <Input value={ISSN} onChange={(e) => setISSN(e.target.value)} />
          </Form.Item>

          <Form.Item label="PMID">
            <Input value={PMID} onChange={(e) => setPMID(e.target.value)} />
          </Form.Item>

          <Form.Item label="Scopus">
            <Input value={Scopus} onChange={(e) => setScopus(e.target.value)} />
          </Form.Item>

          <Form.Item label="PII">
            <Input value={PII} onChange={(e) => setPII(e.target.value)} />
          </Form.Item>

          <Form.Item label="SGR">
            <Input value={SGR} onChange={(e) => setSGR(e.target.value)} />
          </Form.Item>

          <Form.Item label="Project Id">
            <Input value={projectId} onChange={(e) => setProjectId(e.target.value)} />
          </Form.Item>

          <Form.Item label="Citation Key">
            <Input value={citationKey} onChange={(e) => setCitationKey(e.target.value)} />
          </Form.Item>

          <Form.Item label="General Note">
            <Input value={generalNote} onChange={(e) => setGeneralNote(e.target.value)} />
          </Form.Item>

          <Form.Item label="Tags">
            <Select
              options={tagList}
              placeholder="Select tags"
              value={selectedTag}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
            <div style={{ marginTop: '20px' }}>{/* <InputTags />   */}</div>
          </Form.Item>

          <Form.Item label="Authors">
            <Select
              options={lecturerList}
              placeholder="Select authors"
              value={selectedLecturer}
              onChange={handleSelectLecturer}
              isSearchable={true}
              isMulti
            />
            <div style={{ marginTop: '20px' }}>
              <AuthorTag handleGetInputTag={handleGetAuthor} />
            </div>
          </Form.Item>

          <Form.Item label="Note">
            <InputTags handleGetInputTag={handleGetNote} />
          </Form.Item>

          <div className="btnContainer">
            <Button
              style={{ borderRadius: '4px', padding: '8px 23px', marginRight: '10px' }}
              onClick={() => handleBackSearch()}>
              Cancel
            </Button>
            <Button
              style={{ borderRadius: '4px', padding: '8px 23px' }}
              type="primary"
              htmlType="submit"
              onClick={() => handleCreateArticle()}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Styled>
  );
};

export default CreateArticle;
