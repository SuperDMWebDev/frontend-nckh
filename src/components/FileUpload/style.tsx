import styled from 'styled-components';

const Styled = styled.div`
  .dropzone {
    border: 2px dashed #999;
    border-radius: 4px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

  .dropzone.active {
    border-color: #33adff;
  }

  .dropzone p {
    margin: 0;
    font-size: 16px;
  }

  .dropzone p::before {
    content: '\f07c';
    font-family: FontAwesome;
    font-size: 36px;
    display: block;
    margin-bottom: 10px;
  }

  .dropzone.active p::before {
    content: '\f055';
    color: #33adff;
  }

  /* Additional styling for the selected file name */

  .selected-file {
    margin-top: 20px;
    font-size: 16px;
    font-style: italic;
  }
`;

export default Styled;
