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

  const [authorPayload, setAuthorPayload] = useState<any[]>([]);
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

  const handleBackSearch = () => {
    navigate(`/article-detail/${id}`);
  };

  const handleUpdateArticle = async () => {
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
          toast.success('Update article sucessfully');
          navigate('/profile');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.success('Fail to update article');
          navigate('/profile');
          break;
        }
        default:
          break;
      }
    }
  };

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
        <form>
          <div className="group">
            <input value={DOI} onChange={(e) => setDOI(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>DOI</label>
          </div>

          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>

          <div className="group">
            <input
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Journal</label>
          </div>

          <div className="group">
            <input
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Volume</label>
          </div>

          <div className="group">
            <input
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Day</label>
          </div>

          <div className="group">
            <input
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Month</label>
          </div>

          <div className="group">
            <input
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Year</label>
          </div>

          <div className="group">
            <input
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Abstract</label>
          </div>

          <div className="group">
            <input
              value={ArXivID}
              onChange={(e) => setArXivID(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ArXivID</label>
          </div>

          <div className="group">
            <input value={ISBN} onChange={(e) => setISSN(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ISBN</label>
          </div>

          <div className="group">
            <input value={ISSN} onChange={(e) => setISSN(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ISSN</label>
          </div>

          <div className="group">
            <input value={PMID} onChange={(e) => setPMID(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>PMID</label>
          </div>

          <div className="group">
            <input
              value={Scopus}
              onChange={(e) => setScopus(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Scopus</label>
          </div>

          <div className="group">
            <input value={PII} onChange={(e) => setPII(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>PII</label>
          </div>

          <div className="group">
            <input value={SGR} onChange={(e) => setSGR(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>SGR</label>
          </div>

          <div className="group">
            <input
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Project Id</label>
          </div>

          <div className="group">
            <input
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>General Note</label>
          </div>

          <div className="group">
            <label className="label--config">Tags</label>
            <Select
              options={tagList}
              placeholder="Select tags"
              value={selectedTag}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
            <div style={{ marginTop: '20px' }}>{/* <InputTags />   */}</div>
          </div>

          <div className="group">
            <label className="label--config">Authors</label>
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
          </div>

          <div className="group">
            <label className="label--config">Note</label>
            <InputTags handleGetInputTag={handleGetNote} />
          </div>
        </form>
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
            onClick={() => handleUpdateArticle()}>
            Submit
          </Button>
        </div>
      </div>
    </Styled>
  );
};

export default UpdateArticle;
