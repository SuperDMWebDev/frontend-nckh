import styled from 'styled-components';

const Styled = styled.div`
  .detail-article-body {
    width: 900px;
    height: 100vh;
    margin: 0 auto;
    margin-top: 20px;
  }

  .article-title {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    font-size: 26px;
    color: #72a9f6;
    max-width: 600px;
  }

  .article-author {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
  }

  .article-author div {
    font-weight: normal;
    font-style: italic;
  }

  .article-author li {
    display: inline;
    margin-right: 20px;
    cursor: pointer;
  }

  .article-author li:hover {
    text-decoration: underline;
  }

  .article-info {
    position: relative;
    width: 90%;
    margin: 0 auto;
    border-top: 3px solid #f7f6f6;
    padding: 17px 0 0 0;
    font-size: 18px;
    color: #939393;
    font-weight: 200;
    min-height: 120px;
    margin-bottom: 15px;
    border-bottom: 3px solid #f7f6f6;
  }

  .article-info div {
    margin-left: 50px;
    margin-bottom: 15px;
  }

  .article-content p {
    color: #757575;
    line-height: 24px;
    font-size: 18px;
    font-weight: 300;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans',
      'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 15px;
    line-height: 21px;
  }

  .button_delete {
    background-color: #f7f7f7;
    padding: 8px 16px;
    color: black;
    font-size: 15px;
    font-weight: 600;
    border-radius: 3px;
    cursor: pointer;
  }
  .button_update {
    background-color: #f7f7f7;
    padding: 8px 16px;
    color: black;
    font-size: 15px;
    font-weight: 600;
    border-radius: 3px;
    cursor: pointer;
  }

  .button_delete:hover {
    color: #f81f1f;
  }

  .button_update:hover {
    color: #001be4;
  }
`;

export default Styled;
