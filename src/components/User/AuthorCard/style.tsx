import styled from 'styled-components';

const Styled = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    max-width: 700px;
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
  }

  .left {
    &_img {
      width: 113px;
      border-radius: 50%;
    }
  }

  .right {
    &_availability {
      display: flex;
      font-size: 13px;
      gap: 15px;
      margin-top: 8px;
      &_title {
        font-weight: 600;
      }

      &_content {
        color: grey;
      }
    }

    &_category {
      border-radius: 15px;
      display: inline-flex;
      font-size: 11px;
      letter-spacing: 0.13px;
      line-height: 16px;
      padding: 5px 10px;
      margin-top: 15px;
      background-color: #dadada;
    }
  }
`;

export default Styled;
