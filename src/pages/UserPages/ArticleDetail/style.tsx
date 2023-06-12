import styled from 'styled-components';

const Styled = styled.div`
  .detail-article-body {
    width: 900px;
    height: 100vh;
    margin: 0 auto;
    margin-top: 20px;
  }

  .article-title {
    font-weight: 500;
    line-height: 1.1;
    font-size: 26px;
    color: #0056ce;
    max-width: 600px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .article-author {
    display: flex;
    justify-content: flex-start;
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
    font-weight: 500;
    /* cursor: pointer; */
  }

  .article-author li:hover {
    /* text-decoration: underline; */
  }

  .article-info {
    position: relative;
    width: 100%;
    border-top: 3px solid #f7f6f6;
    margin: 0 auto;
    padding: 17px 0 0 0;
    font-size: 18px;
    min-height: 120px;
    margin-bottom: 15px;
    border-bottom: 3px solid #f7f6f6;

    color: #3a3a3a;
  }

  .subTitle {
    margin-right: 5px;
    font-style: italic;
    font-weight: 300;
  }

  .article-info div {
    margin-left: 50px;
    margin-bottom: 15px;
  }

  .article-content {
    margin-top: 20px;
  }

  .article-content p {
    color: #494949;
    font-size: 18px;
    font-weight: 300;
    line-height: 24px;
    text-indent: 40px;
    margin-top: 10px;

    text-align: justify;
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
