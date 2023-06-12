import React, { useState, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import { SettingFilled } from '@ant-design/icons';

type Props = {
  data: string;
  handleDelete: (a: string) => void;
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
        <Typography>{data}</Typography>
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

const AuthorTag = ({ handleGetInputTag }: any) => {
  const [names, setNames] = useState<string[]>([]);
  const [authorPayLoads, setAuthorPayLoads] = useState<NAME[]>([]);

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

  const handleDelete = (value: string) => {
    const newNames = names.filter((val) => val !== value);
    setNames(newNames);
  };

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
        {names.map((data, index) => {
          return <Tags data={data} handleDelete={handleDelete} key={index} />;
        })}
      </Box>
    </Styled>
  );
};

export default AuthorTag;
