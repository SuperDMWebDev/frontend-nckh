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
  const [data, setData] = useState();

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

  const handleCreateArticle = async () => {
    const data = {
      name,
      journal
    };
    console.log('data', data);
    const res = await createArticle(data);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          console.log('re', res);
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
            <Button type="primary" htmlType="submit" onClick={() => handleCreateArticle()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Styled>
  );
};

export default CreateArticle;
