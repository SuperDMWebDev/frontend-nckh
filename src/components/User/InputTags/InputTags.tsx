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
        height: '100%',
        display: 'flex',
        padding: '5px 10px',
        margin: '0 0.5rem 0.5rem 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#252525',
        borderRadius: '12px'
      }}>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography>{data}</Typography>
        <button style={{ border: 'none', background: 'transparent', padding: 0, margin: 0 }}>
          <FontAwesomeIcon onClick={() => handleDelete(data)} icon={faClose} />
        </button>
      </Stack>
    </Box>
  );
};

const InputTags = () => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>();

  const handleOnSubmit = (tag: string) => {
    setTags([...tags, tag]);
    setTag('');
  };

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
      <TextField
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        sx={{
          margin: '1rem 0'
        }}
        margin="none"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder={tags.length < 5 ? 'Enter tags' : ''}
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
  );
};

export default InputTags;
