import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { createArticle, getArticleByDOI } from '../../../api/Article';
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

const journalOptionList: OptionSelect[] = [
  {
    value: 1,
    label: 'Journal'
  },
  {
    value: 2,
    label: 'Conference'
  }
];

const CreateArticle = () => {
  const navigate = useNavigate();
  const accountId: string | null = localStorage.getItem('accountId');

  const [DOI, setDOI] = useState('');

  const [name, setName] = useState('');

  const [journalConferenceText, setJournalConferenceText] = useState('');
  const [journal, setJournal] = useState<string | null>();
  const [conference, setConference] = useState<string | null>();
  const [volume, setVolume] = useState<number>();
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [abstract, setAbstract] = useState('');
  const [ArXivID, setArXivID] = useState('');
  const [ISBN, setISBN] = useState('');
  const [ISSN, setISSN] = useState('');
  const [PMID, setPMID] = useState('');
  const [Scopus, setScopus] = useState('');
  const [PII, setPII] = useState('');
  const [SGR, setSGR] = useState('');
  const [projectId, setProjectId] = useState('');
  const [generalNote, setGeneralNote] = useState('');

  const [tagList, setTagList] = useState<OptionSelect[]>([]);
  const [lecturerList, setLecturerList] = useState<OptionSelect[]>([]);
  const [selectedTag, setSelectedTag] = useState<OptionSelect[]>();
  const [journalOption, setJournalOption] = useState<OptionSelect>(journalOptionList[0]);

  const handleGetJournalConference = (e: any) => {
    setJournalConferenceText(e.target.value);
    if (journalOption.value == 1) {
      setJournal(e.target.value);
      setConference(null);
    } else {
      setConference(e.target.value);
      setJournal(null);
    }
  };

  const handleSelectJournalOption = (option: any) => {
    setJournalOption(option);
  };

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

  const handleGetArticleByDOI = async (e: any) => {
    var payload = {
      data: {
        doi: DOI
      }
    };

    e.preventDefault();

    const res = await getArticleByDOI(payload);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data[0];
          setName(data.name);
          setJournal(data.journal);
          setVolume(data.volume);
          setDay(data.day);
          setMonth(data.month);
          setYear(data.year);
          setAbstract(data.abstract);
          setArXivID(data.ArXivID);
          setISBN(data.ISBN);
          setISSN(data.ISSN);
          setPMID(data.PMID);
          setScopus(data.Scopus);
          setPII(data.PII);
          setSGR(data.SGR);
          setProjectId(data.projectId);
          setGeneralNote(data.generalNote);

          toast.success('Successfully get article data from DOI');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.error('Fail to load article from given DOI');
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
    navigate('/profile');
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
      conference,
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
          toast.success('Create article sucessfully');
          navigate('/profile');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.error('Fail to create article');
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
        <div className="content_tab_name">TẠO BÀI BÁO KHOA HỌC</div>
      </div>
      <div className="container">
        <form>
          <div className="flex">
            <div className="group">
              <input value={DOI} onChange={(e) => setDOI(e.target.value)} type="text" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>DOI</label>
            </div>
            <Button
              style={{ borderRadius: '4px', padding: '8px 23px' }}
              type="primary"
              htmlType="submit"
              onClick={(e) => handleGetArticleByDOI(e)}>
              Add
            </Button>
          </div>

          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>

          <div className="flex">
            <div className="selectInput">
              <Select
                options={journalOptionList}
                value={journalOption}
                onChange={(option) => handleSelectJournalOption(option)}
              />
            </div>
            <div className="group">
              <input
                value={journalConferenceText}
                onChange={(e) => handleGetJournalConference(e)}
                type="text"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Journal</label>
            </div>
          </div>

          <div className="group">
            <input
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              type="number"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Volume</label>
          </div>

          <div className="group">
            <input value={day} onChange={(e) => setDay(parseInt(e.target.value))} type="number" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Day</label>
          </div>

          <div className="group">
            <input
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              type="number"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Month</label>
          </div>

          <div className="group">
            <input value={year} onChange={(e) => setYear(parseInt(e.target.value))} type="number" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Year</label>
          </div>

          <div className="group">
            <input value={abstract} onChange={(e) => setAbstract(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Abstract</label>
          </div>

          <div className="group">
            <input value={ArXivID} onChange={(e) => setArXivID(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ArXivID</label>
          </div>

          <div className="group">
            <input value={ISBN} onChange={(e) => setISSN(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ISBN</label>
          </div>

          <div className="group">
            <input value={ISSN} onChange={(e) => setISSN(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>ISSN</label>
          </div>

          <div className="group">
            <input value={PMID} onChange={(e) => setPMID(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>PMID</label>
          </div>

          <div className="group">
            <input value={Scopus} onChange={(e) => setScopus(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Scopus</label>
          </div>

          <div className="group">
            <input value={PII} onChange={(e) => setPII(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>PII</label>
          </div>

          <div className="group">
            <input value={SGR} onChange={(e) => setSGR(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>SGR</label>
          </div>

          <div className="group">
            <input value={projectId} onChange={(e) => setProjectId(e.target.value)} type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Project Id</label>
          </div>

          <div className="group">
            <input
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
              type="text"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>General Note</label>
          </div>

          <div className="group">
            <label className="label--config">Tags</label>
            <div style={{ width: '700px' }}>
              <Select
                options={tagList}
                placeholder="Select tags"
                value={selectedTag}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              />
            </div>
            <div style={{ marginTop: '20px' }}>{/* <InputTags />   */}</div>
          </div>

          <div className="group">
            <label className="label--config">Authors</label>
            <div style={{ width: '700px' }}>
              <Select
                options={lecturerList}
                placeholder="Select authors"
                value={selectedLecturer}
                onChange={handleSelectLecturer}
                isSearchable={true}
                isMulti
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <AuthorTag handleGetInputTag={handleGetAuthor} />
            </div>
          </div>

          <div className="group">
            <label className="label--config">Note</label>
            <InputTags handleGetInputTag={handleGetNote} />
          </div>

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
        </form>
      </div>
    </Styled>
  );
};

export default CreateArticle;
