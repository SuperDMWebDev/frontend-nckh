import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { updateArticle, getArticleByDOI, getDetailArticle } from '../../../api/Article';
import { getTag } from '../../../api/Tag';
import { getAllLecturers } from '../../../api/Lecturer';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import AuthorTag from '../../../components/User/AuthorTag/AuthorTag';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoaderLayer from '../../../components/LoaderLayer/LoaderLayer';

const { Search } = Input;
type SizeType = Parameters<typeof Form>[0]['size'];

type OptionSelect = {
  value: number;
  label: string;
};

type OptionSelectString = {
  value: string;
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

const journalRank: OptionSelectString[] = [
  {
    value: 'Q1',
    label: 'Q1'
  },
  {
    value: 'Q2',
    label: 'Q2'
  },
  {
    value: 'Q3',
    label: 'Q3'
  },
  {
    value: 'Q4',
    label: 'Q4'
  }
];

const conferenceRank: OptionSelectString[] = [
  {
    value: 'A++',
    label: 'A++'
  },
  {
    value: 'A+',
    label: 'A+'
  },
  {
    value: 'A',
    label: 'A'
  },
  {
    value: 'B',
    label: 'B'
  },
  {
    value: 'C',
    label: 'C'
  },
  {
    value: 'Unranked',
    label: 'Unranked'
  }
];

const UpdateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const accountId: string | null = localStorage.getItem('accountId');
  const [article, setArticle] = useState<any>();

  const [DOI, setDOI] = useState('');

  const [name, setName] = useState('');

  const [journalConferenceText, setJournalConferenceText] = useState('');
  const [journal, setJournal] = useState<string | null>();
  const [conference, setConference] = useState<string | null>();
  const [journalOption, setJournalOption] = useState<OptionSelect>(journalOptionList[0]);
  const handleSelectJournalOption = (option: any) => {
    setJournalOption(option);
  };
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

  const [rank, setRank] = useState<OptionSelectString>(journalRank[0]);
  const [rankList, setRankList] = useState<OptionSelectString[]>(journalRank);
  const handleSelectRankOption = (option: any) => {
    setRank(option);
  };

  const [volume, setVolume] = useState(article?.volume);
  const [day, setDay] = useState<number>(article?.day);
  const [month, setMonth] = useState<number>(article?.month);
  const [year, setYear] = useState<number>(article?.year);
  const [abstract, setAbstract] = useState(article?.abstract);
  const [ArXivID, setArXivID] = useState(article?.ArXivID);
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
  const [tagPayload, setTagPayload] = useState<any[]>([]);

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

  const handleGetTag = (list: any) => {
    var tags: any[] = [];
    list?.map((item: string) => {
      let obj = {
        name: item
      };
      tags.push(obj);
    });
    setTagPayload(tags);
  };

  const handleGetDetailArticle = async () => {
    const res = await getDetailArticle(id);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setArticle(data);
          setName(data.name);
          if (data.journal) {
            setJournalConferenceText(data.journal);
          } else {
            setJournalConferenceText(data.conference);
          }
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

          const temp = data.authors.filter((e: any) => {
            return Object.keys(e).includes('lecturer_id');
          });

          console.log('tem', temp);

          const source = lecturerList.map((e) => e.value);
          console.log('source', source);

          console.log(temp.filter((e: any) => source.includes(e.lecturer_id)));

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

  const handleGetArticleByDOI = async () => {
    setIsLoading(true);
    var payload = {
      data: {
        doi: DOI
      }
    };

    const res = await getArticleByDOI(payload);
    if (res) {
      setIsLoading(false);
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data[0];
          setName(data.name);
          setJournalConferenceText(data.journal);
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

  const handleUpdateArticle = async () => {
    var rankPayload: any = rank.value;
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
    tagPayload?.map((item) => [tags.push(item)]);

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
      rank: rankPayload,
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
      generalNote,
      tags,
      authors
    };
    var bodyFormData = new FormData();
    bodyFormData.append('data', JSON.stringify(data));
    const res = await updateArticle(bodyFormData, id);
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
    fetchLecturer();
    fetchTag();
    handleGetDetailArticle();
  }, []);

  return (
    <Styled>
      {isLoading && <LoaderLayer />}
      <div className="header_topbar">
        <div
          className="content_tab_name"
          style={{
            fontSize: '22px',
            margin: '12px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>
          CHỈNH SỬA BÀI BÁO KHOA HỌC
        </div>
      </div>
      <div className="container">
        <div>
          <div style={{ fontSize: '15px', marginBottom: '5px' }}>Nhập DOI để tìm kiếm bài báo</div>
          <div className="flex-center">
            <div className="doiInput">
              <Search
                placeholder="DOI"
                value={DOI}
                onChange={(e) => setDOI(e.target.value)}
                onSearch={handleGetArticleByDOI}
                enterButton
              />
            </div>
          </div>
        </div>

        <TextField
          label="Tên bài báo"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />
        <div className="flex">
          <div className="selectInput">
            <Select
              options={journalOptionList}
              value={journalOption}
              onChange={(option) => handleSelectJournalOption(option)}
            />
          </div>
          <TextField
            variant="outlined"
            label={journalOption.label}
            value={journalConferenceText}
            onChange={(e) => handleGetJournalConference(e)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <div className="selectInput">
            <Select
              options={rankList}
              value={rank}
              onChange={(option) => handleSelectRankOption(option)}
            />
          </div>
        </div>

        <TextField
          label="Volume"
          variant="outlined"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />
        <TextField
          label="Abstract"
          variant="outlined"
          value={abstract}
          multiline
          onChange={(e) => setAbstract(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />
        <div className="flex-center">
          <TextField
            label="Ngày"
            variant="outlined"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            type="number"
            fullWidth
          />
          <TextField
            label="Tháng"
            variant="outlined"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            type="number"
            fullWidth
          />
          <TextField
            label="Năm"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            type="number"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="ArXivID"
            variant="outlined"
            value={ArXivID}
            onChange={(e) => setArXivID(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />

          <TextField
            label="PMID"
            variant="outlined"
            value={PMID}
            onChange={(e) => setPMID(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="ISBN"
            variant="outlined"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <TextField
            label="ISSN"
            variant="outlined"
            value={ISSN}
            onChange={(e) => setISSN(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="PII"
            variant="outlined"
            value={PII}
            onChange={(e) => setPII(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <TextField
            label="SGR"
            variant="outlined"
            value={SGR}
            onChange={(e) => setSGR(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <TextField
          label="General note"
          variant="outlined"
          value={generalNote}
          onChange={(e) => setGeneralNote(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />

        <div>
          <div className="titleTag">Chọn tag hoặc thêm mới</div>
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
          <InputTags handleGetInputTag={handleGetTag} />
        </div>

        <div>
          <div className="titleTag">Chọn tác giả hoặc thêm mới</div>
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
          <div style={{ marginTop: '20px' }}>
            <AuthorTag handleGetInputTag={handleGetAuthor} />
          </div>
        </div>

        <div className="btnContainer">
          <Button size="large" variant="outlined" onClick={() => handleBackSearch()}>
            Cancel
          </Button>
          <Button size="large" variant="contained" onClick={() => handleUpdateArticle()}>
            Submit
          </Button>
        </div>
      </div>
    </Styled>
  );
};

export default UpdateArticle;
