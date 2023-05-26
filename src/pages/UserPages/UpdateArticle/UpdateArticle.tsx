import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { createArticle, getDetailArticle } from '../../../api/Article';
import { getTag } from '../../../api/Tag';
import { getAllLecturers } from '../../../api/Lecturer';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type SizeType = Parameters<typeof Form>[0]['size'];

interface ArticleType {
  name: string;
  journal: string;
}

type OptionSelect = {
  value: number;
  label: string;
};

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

const UpdateArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState<any>();

  const [name, setName] = useState(article?.name);
  const [journal, setJournal] = useState(article?.journal);
  const [volume, setVolume] = useState(article?.volume);
  const [issue, setIssue] = useState(article?.issue);
  const [day, setDay] = useState<number>(article?.day);
  const [month, setMonth] = useState<number>(article?.month);
  const [year, setYear] = useState<number>(article?.year);
  const [abstract, setAbstract] = useState(article?.abstract);
  const [ArXivID, setArXivID] = useState(article?.ArXivID);
  const [DOI, setDOI] = useState(article?.DOI);
  const [ISBN, setISBN] = useState(article?.ISBN);
  const [ISSN, setISSN] = useState(article?.ISSN);
  const [PMID, setPMID] = useState(article?.PMID);
  const [Scopus, setScopus] = useState(article?.Scopus);
  const [PII, setPII] = useState(article?.PII);
  const [SGR, setSGR] = useState(article?.SGR);
  const [projectId, setProjectId] = useState(article?.projectId);
  const [citationKey, setCitationKey] = useState(article?.citationKey);
  const [generalNote, setGeneralNote] = useState(article?.generalNote);

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

  const handleGetURL = (list: any) => {
    var urls: any[] = [];
    list?.map((item: string) => {
      let obj = {
        url: item
      };
      urls.push(obj);
    });
    setUrlPayload(urls);
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

  const handleGetDetailArticle = async () => {
    const res = await getDetailArticle(id);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setArticle(data);

          setName(data.name);
          setJournal(data.journal);
          setVolume(data.volume);
          setIssue(data.issue);
          setDay(data.day);
          setMonth(data.month);
          setYear(data.year);
          setAbstract(data.abstract);
          setArXivID(data.ArXivID);
          setDOI(data.DOI);
          setISBN(data.ISBN);
          setISSN(data.ISSN);
          setPMID(data.PMID);
          setScopus(data.Scopus);
          setPII(data.PII);
          setSGR(data.SGR);
          setProjectId(data.projectId);
          setCitationKey(data.citationKey);
          setGeneralNote(data.generalNote);
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

  const handleCreateArticle = async () => {
    var tags: any[] = [];
    var authors: any[] = [];

    selectedTag?.map((item: { value: number; label: string }) => {
      let obj = { tag_id: item.value };
      tags.push(obj);
    });

    selectedLecturer?.map((item: { value: number; label: string }) => {
      let obj = { lecturerId: item.value };
      authors.push(obj);
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
      urls: urlPayload,
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

  console.log('art', article);
  console.log('name', name);

  useEffect(() => {
    handleGetDetailArticle();
    fetchTag();
    fetchLecturer();
  }, []);

  return (
    <Styled>
      <div className="header_topbar">
        <div className="btn-back-search" onClick={() => navigate(-1)}>
          <ArrowBackIcon /> quay lại
        </div>
        <div className="content_tab_name tab-selected">CHỈNH SỬA BÀI BÁO KHOA HỌC</div>
      </div>
      <div className="container">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          // onFinish={() => createArticle(data)}
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}>
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Journal">
            <Input value={journal} onChange={(e) => setJournal(e.target.value)} />
          </Form.Item>

          <Form.Item label="Volume">
            <Input value={volume} onChange={(e) => setVolume(e.target.value)} />
          </Form.Item>

          <Form.Item label="Issue">
            <Input value={issue} onChange={(e) => setIssue(e.target.value)} />
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

          <Form.Item label="DOI">
            <Input value={DOI} onChange={(e) => setDOI(e.target.value)} />
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
            <div style={{ marginTop: '20px' }}>{/* <InputTags /> */}</div>
          </Form.Item>

          <Form.Item label="URL">
            <InputTags handleGetInputTag={handleGetURL} />
          </Form.Item>

          <Form.Item label="Note">
            <InputTags handleGetInputTag={handleGetNote} />
          </Form.Item>

          <div className="btnContainer">
            <Button
              style={{ borderRadius: '4px', padding: '8px 23px', marginRight: '10px' }}
              onClick={() => navigate(-1)}>
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

export default UpdateArticle;
