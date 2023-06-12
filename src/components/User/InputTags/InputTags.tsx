import React, { useState, useRef } from 'react';
import { Box, TextField, Stack, Typography } from '@mui/material';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';

type Props = {
  data: string;
  handleDelete: (a: string) => void;
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
        <Typography fontSize={15}>{data}</Typography>
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

const InputTags = ({ handleGetInputTag }: any) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>();

  const handleOnSubmit = (tag: string) => {
    if (tag === '') return;
    else {
      setTags([...tags, tag]);
      handleGetInputTag([...tags, tag]);
      setTag('');
    }
  };

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <Styled>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant="standard"
          size="medium"
          sx={{
            margin: '1rem 0'
          }}
          margin="none"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder={tags.length < 5 ? 'Enter tags' : ''}
          inputProps={{ style: { fontSize: 15 } }}
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
                {tags.map((data, index) => {
                  return <Tags data={data} handleDelete={handleDelete} key={index} />;
                })}
              </Box>
            )
          }}
        />
        <button style={{ border: 'none', background: 'transparent', padding: 0, margin: 0 }}>
          <FontAwesomeIcon color="#0056ce" onClick={() => handleOnSubmit(tag)} icon={faAdd} />
        </button>
      </Box>
    </Styled>
  );
};

export default InputTags;
