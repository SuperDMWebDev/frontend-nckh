import React, { useState, useRef } from 'react';
import { DatePicker, Form, Input } from 'antd';
import Styled from './style';

type SizeType = Parameters<typeof Form>[0]['size'];

const ModalArticle = () => {
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
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);

  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const tagdRef = useRef();
  // const updateChildState = () => {
  //   if (tagdRef.current) {
  //     changeVal()
  //     setTags(tagdRef.current.changeVal());
  //   }
  // };

  return (
    <Styled>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
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
      </Form>
    </Styled>
  );
};

export default ModalArticle;
