import styled from 'styled-components';

const Styled = styled.div`
  .form-body {
    display: flex;
    justify-content: center;
    align-items: center;
    .MuiBox-root {
      border-radius: 5px;
      border: none;
    }
  }

  .form-input {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .modal--verify {
  }

  .btn-confirm {
    margin-top: 20px;
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4562aa;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }

    .button:hover {
      background-color: #34508e;
    }

    .button:focus {
      outline: none;
    }

    .button:active {
      background-color: #234072;
    }
  }

  .author-list {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    transform: all 0.2s ease;
    margin-bottom: 15px;
  }

  .author-list:before {
    transform: all 0.3s ease;
  }

  .author-list h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .form-data {
    width: 700px;
    height: auto;
    border: 3px solid #c3c3c3;
    margin-top: 20px;
    color: black;
    background: rgba(215, 216, 216, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    padding: 30px;

    h1 {
      font-size: 25px;
      font-weight: 500;
    }
  }

  .wrapper {
    position: relative;
  }

  .name-input {
    padding-left: 20px;
    color: #444;
    font-size: 1.5rem;
    width: 270px;
    height: 45px;
    border-radius: 5px;
    border: 3px solid #c3c3c3;
  }

  .name-label {
    position: absolute;
    top: 0.7rem;
    left: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.5rem;
    transition: 0.4s all;
    padding-inline: 0.25rem;
    font-family: monospace;
  }

  .name-input:focus ~ .name-label,
  .name-input:valid ~ .name-label {
    top: -0.5rem;
    left: 0.5rem;
    background-color: #f9f9f9;
    font-size: 14px;
  }

  .text-loading {
    font-size: 14px;
    font-family: monospace;
  }

  .radio-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 350px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .radio-inputs > * {
    margin: 6px;
  }

  .radio-input:checked + .radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
  }

  .radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
  }

  .radio-input:checked + .radio-tile .radio-icon svg {
    fill: #2260ff;
  }

  .radio-input:checked + .radio-tile .radio-label {
    color: #2260ff;
  }

  .radio-input:focus + .radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
  }

  .radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220px;
    min-height: 50px;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
  }

  .radio-tile:before {
    content: '';
    position: absolute;
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
  }

  .radio-tile:hover {
    border-color: #2260ff;
  }

  .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-icon svg {
    width: 10rem;
    height: 10rem;
    fill: #494949;
  }

  .radio-label {
    color: #5a5a5a;
    transition: 0.375s ease;
    text-align: center;
    font-size: 14px;
    font-weight: bolder;
  }

  .radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 3px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 2px;
  }

  .btn-choose {
    appearance: none;
    background-color: #fafbfc;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    color: #24292e;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji';
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    padding: 10px 23px;
    position: relative;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    word-wrap: break-word;
    margin-top: 30px;
  }

  .btn-choose:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  .btn-choose:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  .btn-choose:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  .btn-choose:focus {
    outline: 1px transparent;
  }

  .btn-choose:before {
    display: none;
  }

  .btn-choose:-webkit-details-marker {
    display: none;
  }
`;

export default Styled;
