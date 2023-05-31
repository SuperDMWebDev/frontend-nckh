import styled from 'styled-components';

const Styled = styled.div`
  .container {
    width: 50%;
    margin-bottom: 40px;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
    margin: 20px 0;
  }

  .header_topbar {
    width: 100%;
    height: 50px;
    background-color: #f7f7f7;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
  }

  .btn-back-search {
    width: 300px;
    margin-right: 80px;
    margin-left: 300px;
    cursor: pointer;
    font-family: proxima-nova, sans-serif;
    font-size: 12px;
    color: #959595;
  }

  .btn-back-search:hover {
    color: #4a5bf7;
    text-decoration: underline;
  }

  .content_tab_name {
    color: #363636a1;
    position: relative;
    font-size: 18px;
    text-decoration: none;
    margin-top: 2px;
    margin-bottom: 2px;

    border: none;
    background: none;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
  }

  .btnContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
  }

  .group {
    position: relative;
    margin-bottom: 45px;
  }

  input {
    font-size: 14px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 700px;
    border: none;
    border-bottom: 1px solid #757575;
  }
  input:focus {
    outline: none;
  }

  /* LABEL ======================================= */
  label {
    color: #999;
    font-size: 14px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */
  input:focus ~ label,
  input:valid ~ label {
    top: -15px;
    font-size: 14px;
    color: #3f51b5;
  }

  label.label--config {
    position: static;
    margin-left: 5px;
  }

  /* BOTTOM BARS ================================= */
  .bar {
    position: relative;
    display: block;
    width: 700px;
  }
  .bar:before,
  .bar:after {
    content: '';
    height: 1px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #3f51b5;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }

  /* active state */
  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from {
      background: #3f51b5;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @-moz-keyframes inputHighlighter {
    from {
      background: #3f51b5;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @keyframes inputHighlighter {
    from {
      background: #3f51b5;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
`;

export default Styled;
