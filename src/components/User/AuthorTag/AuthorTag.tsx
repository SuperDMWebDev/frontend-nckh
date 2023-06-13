import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';

type Props = {
  data: NAME;
  handleDelete: (a: NAME) => void;
};

type NAME = {
  firstName: string;
  lastName: string;
};

const Tags = ({ data, handleDelete }: Props) => {
  return (
    <Box
      sx={{
        background: '#e0e0e0',
        height: '34px',
        display: 'flex',
        padding: '4px 10px',
        margin: '0 0.5rem 0.5rem 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#252525',
        borderRadius: '4px'
      }}>
      <div className="tag">
        <Typography>{data.firstName.concat(' ', data.lastName)}</Typography>
        <FontAwesomeIcon
          className="deleteicon"
          fontSize={14}
          onClick={() => handleDelete(data)}
          icon={faClose}
        />
      </div>
    </Box>
  );
};

const AuthorTag = ({ data, handleGetInputTag }: any) => {
  console.log('data truyen vo', data);
  const [names, setNames] = useState<string[]>([]);
  const [authorPayLoads, setAuthorPayLoads] = useState<NAME[]>(data);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleOnSubmit = (firstName: string, lastName: string) => {
    if (firstName == '' || lastName == '') return;
    else {
      var name = lastName.concat(' ', firstName);
      var authorPayload = {
        firstName: firstName,
        lastName: lastName
      };
      setNames([...names, name]);
      setAuthorPayLoads([...authorPayLoads, authorPayload]);
      handleGetInputTag([...authorPayLoads, authorPayload]);
      setFirstName('');
      setLastName('');
    }
  };

  const handleDelete = (data: NAME) => {
    const newNames = authorPayLoads.filter(
      (val) => val.firstName !== data.firstName && val.lastName !== data.lastName
    );
    setAuthorPayLoads(newNames);
    handleGetInputTag(newNames);
  };

  useEffect(() => {
    setAuthorPayLoads(data);
    handleGetInputTag(data);
  }, [data]);

  return (
    <Styled>
      <div className="addLine">
        <div style={{ fontSize: '16px', width: '100px' }}>Tác giả: </div>
        <Input
          placeholder="Tên"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Input
          placeholder="Họ"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <button style={{ border: 'none', background: 'transparent' }}>
          <FontAwesomeIcon
            color="#0056ce"
            onClick={() => {
              handleOnSubmit(firstName, lastName);
            }}
            icon={faAdd}
          />
        </button>
      </div>
      <Box sx={{ margin: '0 0 0 0', display: 'flex', flexWrap: 'wrap', width: '700px' }}>
        {authorPayLoads.map((data, index) => {
          return <Tags data={data} handleDelete={handleDelete} key={index} />;
        })}
      </Box>
    </Styled>
  );
};

export default AuthorTag;
