import React, { useState, useRef } from 'react';
import { Box, TextField, Stack, Typography } from '@mui/material';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';

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
        height: '100%',
        display: 'flex',
        padding: '4px 10px',
        margin: '0 0.5rem 0.5rem 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#252525',
        borderRadius: '3px'
      }}>
      <Stack direction="row" gap={3} alignItems="center">
        <Typography>{data}</Typography>
        <button style={{ border: 'none', background: 'transparent' }}>
          <FontAwesomeIcon fontSize={11} onClick={() => handleDelete(data)} icon={faClose} />
        </button>
      </Stack>
    </Box>
  );
};

const AuthorTag = ({ handleGetInputTag }: any) => {
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [authorPayLoads, setAuthorPayLoads] = useState<NAME[]>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleOnSubmit = (firstName: string, lastName: string) => {
    if (firstName == '' || lastName == '') return;
    var name = lastName.concat(' ', firstName);
    var authorPayload = {
      firstName: firstName,
      lastName: lastName
    };
    setNames([...names, name]);
    setAuthorPayLoads([...authorPayLoads, authorPayload]);
    handleGetInputTag([...authorPayLoads, authorPayload]);
    setName('');
  };

  const handleDelete = (value: string) => {
    const newNames = names.filter((val) => val !== value);
    setNames(newNames);
  };

  return (
    <Styled>
      <Box sx={{ margin: '0 0 0 0', display: 'flex', flexWrap: 'wrap' }}>
        {names.map((data, index) => {
          return <Tags data={data} handleDelete={handleDelete} key={index} />;
        })}
      </Box>
      <div className="addLine">
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button style={{ border: 'none', background: 'transparent', padding: 0, margin: 0 }}>
          <FontAwesomeIcon
            color="#0056ce"
            onClick={() => {
              handleOnSubmit(firstName, lastName);
              setFirstName('');
              setLastName('');
            }}
            icon={faAdd}
          />
        </button>
      </div>
    </Styled>
  );
};

export default AuthorTag;