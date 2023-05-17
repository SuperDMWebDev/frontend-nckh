import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { createArticle } from '../../../api/Article';
import { getTag } from '../../../api/Tag';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

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
  const [data, setData] = useState<ArticleType>();
  // const [data, setData] = useState({
  //   name: 'The Impact of Gamification on Learning Outcomes of Computer Science Majors',
  //   journal: 'ACM Transactions on Computing Education',
  //   year: 2020,
  //   pageFrom: 8,
  //   pageTo: 10,
  //   volume: 20,
  //   issue: 2,
  //   month: 2,
  //   day: 28,
  //   abstract:
  //     "Gamification is the use of game elements in domains other than games. Gamification use is often suggested for difficult activities because it enhances users' engagement and motivation level. Due to such benefits, the use of gamification is also proposed in education environments to improve students' performance, engagement, and satisfaction. Computer science in higher education is a tough area of study and thus needs to utilize various already explored benefits of gamification. This research develops an empirical study to evaluate the effectiveness of gamification in teaching computer science in higher education. Along with the learning outcomes, the effect of group size on students' satisfaction level is also measured. Furthermore, the impact of gamification over time is analyzed throughout a semester to observe its effectiveness as a long-term learning technique. The analysis, covering both learning outcome and students' satisfaction, suggests that gamification is an effective tool to teach tough courses at higher education level; however, group size should be taken into account for optimal classroom size and better learning experience.",
  //   urlAccessDate: '28/02/2023',
  //   ArXivID: 'test',
  //   DOI: '10.1145/3383456',
  //   ISBN: 'testISBN',
  //   ISSN: '10.1145/3383456',
  //   PMID: 'testPMID',
  //   Scopus: '2-s2.0-85085248397',
  //   PII: 'testPII',
  //   SGR: '85085248397',
  //   projectId: 'testProjectId',
  //   citationKey: 'testCitationKey',
  //   generalNote: 'This is the general note for testing',
  //   tags: [
  //     {
  //       tag_id: 4
  //     },
  //     {
  //       tag_id: 5
  //     },
  //     {
  //       name: 'test tag 0'
  //     },
  //     {
  //       name: 'test tag 1'
  //     }
  //   ],
  //   authors: [
  //     {
  //       lecturerId: 1
  //     },
  //     {
  //       firstName: 'first0',
  //       lastName: 'last0'
  //     },
  //     {
  //       firstName: 'first1',
  //       lastName: 'last1'
  //     },
  //     {
  //       firstName: 'first2',
  //       lastName: 'last2'
  //     },
  //     {
  //       lecturerId: 2
  //     }
  //   ],
  //   urls: [
  //     {
  //       url: 'https://www.google.com/search?channel=fs&client=ubuntu-sn&q=date+format+in+js+with+mysql'
  //     },
  //     {
  //       url: 'https://www.google.com/search?channel=fs&client=ubuntu-sn&q=moment+date+parse'
  //     },
  //     {
  //       url: 'https://stackoverflow.com/questions/22184747/parse-string-to-date-with-moment-js'
  //     }
  //   ],
  //   notes: [
  //     {
  //       note: 'Sample note test 0'
  //     },
  //     {
  //       note: 'Sample note test 1'
  //     },
  //     {
  //       note: 'Sample note test 2'
  //     }
  //   ]
  // });

  const [name, setName] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState('');
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

  const [selectedTag, setSelectedTag] = useState<OptionSelect>();
  const handleSelect = (data: any) => {
    setSelectedTag(data);
  };

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

  useEffect(() => {
    fetchTag();
  }, []);

  return (
    <Styled>
      <div className="container">
        <div className="title">Create an article</div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={() => createArticle(data)}
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}>
          <Form.Item label="Name">
            <Input value={data && data.name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Journal">
            <Input value={data && data.journal} onChange={(e) => setJournal(e.target.value)} />
          </Form.Item>

          <Form.Item label="Volume">
            <Input value={volume} onChange={(e) => setVolume(e.target.value)} />
          </Form.Item>

          <Form.Item label="Issue">
            <Input value={issue} onChange={(e) => setIssue(e.target.value)} />
          </Form.Item>

          <Form.Item label="Date">
            <DatePicker style={{ width: '100%' }} />
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
            <div style={{ marginTop: '20px' }}>
              <InputTags />
            </div>
          </Form.Item>

          <Form.Item label="Authors">
            <InputTags />
          </Form.Item>

          <Form.Item label="URL">
            <InputTags />
          </Form.Item>

          <Form.Item label="Note">
            <InputTags />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Styled>
  );
};

export default CreateArticle;
