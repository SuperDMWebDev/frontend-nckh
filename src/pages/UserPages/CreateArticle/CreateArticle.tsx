import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
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
import Button from '@mui/material/Button';

const { Search } = Input;

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
  const [rank, setRank] = useState('');

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

  const handleGetArticleByDOI = async () => {
    var payload = {
      data: {
        doi: DOI
      }
    };

    // e.preventDefault();

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
      rank,
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
        {/* <div className="btn-back-search" onClick={handleBackSearch}>
          <ArrowBackIcon /> quay lại trang cá nhân
        </div> */}
        <div className="content_tab_name">TẠO BÀI BÁO KHOA HỌC</div>
      </div>
      <div className="container">
        <div className="row">
          <Search
            placeholder="DOI"
            value={DOI}
            onChange={(e) => setDOI(e.target.value)}
            onSearch={handleGetArticleByDOI}
            enterButton
          />
        </div>

        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

        <div className="flex">
          <div className="selectInput">
            <Select
              options={journalOptionList}
              value={journalOption}
              onChange={(option) => handleSelectJournalOption(option)}
            />
          </div>

          <Input
            placeholder={journalOption.label}
            value={journalConferenceText}
            onChange={(e) => handleGetJournalConference(e)}
          />
          <div style={{ width: '170px' }}>
            <Input placeholder="Rank" value={rank} onChange={(e) => setRank(e.target.value)} />
          </div>
        </div>

        <Input
          placeholder="Volume"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />

        <Input
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value))}
          type="number"
        />

        <Input
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          type="number"
        />

        <Input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          type="number"
        />

        <Input
          placeholder="Abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />

        <Input placeholder="ArXivID" value={ArXivID} onChange={(e) => setArXivID(e.target.value)} />

        <Input placeholder="ISBN" value={ISBN} onChange={(e) => setISSN(e.target.value)} />

        <Input placeholder="PMID" value={PMID} onChange={(e) => setPMID(e.target.value)} />

        <Input placeholder="Scopus" value={Scopus} onChange={(e) => setScopus(e.target.value)} />

        <Input placeholder="PII" value={PII} onChange={(e) => setPII(e.target.value)} />

        <Input placeholder="SGR" value={SGR} onChange={(e) => setSGR(e.target.value)} />

        <Input
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />

        <Input
          placeholder="General Note"
          value={generalNote}
          onChange={(e) => setGeneralNote(e.target.value)}
        />

        <div className="selectInputFull">
          <Select
            options={tagList}
            placeholder="Select tags"
            value={selectedTag}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
          />
        </div>
        {/* <div style={{ marginTop: '20px' }}>
            <InputTags />{' '}
          </div> */}

        <div className="selectInputFull">
          <Select
            options={lecturerList}
            placeholder="Select lecturers"
            value={selectedLecturer}
            onChange={handleSelectLecturer}
            isSearchable={true}
            isMulti
          />
        </div>

        <div>
          <AuthorTag handleGetInputTag={handleGetAuthor} />
        </div>

        <div className="btnContainer">
          <Button size="large" variant="outlined" onClick={() => handleBackSearch()}>
            Cancel
          </Button>
          <Button size="large" variant="contained" onClick={() => handleCreateArticle()}>
            Submit
          </Button>
        </div>
      </div>
    </Styled>
  );
};

export default CreateArticle;
