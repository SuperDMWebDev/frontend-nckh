import styled from 'styled-components';

const Styled = styled.div`
  .container {
    display: flex;
    gap: 20px;

    max-width: 750px;
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
    padding: 20px 20px;
    cursor: pointer;
    transition: all 0.5s;
    user-select: none;
    font-weight: bolder;

    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;

    padding-top: 30px;
    padding-bottom: 20px;
    background: #ffffff;
    backdrop-filter: blur(6px);
    border-radius: 20px;
    margin-bottom: 10px;
  }

  .container:hover {
    background-color: #caebff;
  }

  .name {
    font-family: proxima-nova, sans-serif;
    cursor: pointer;
  }

  .left {
    width: 120px;

    &_img {
      width: 113px;
      border-radius: 50%;
    }
  }

  .right {
    width: 100%;

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

  .right_availability {
    display: flex;
  }

  .right_availability_title {
    width: 50px;
  }

  .right_availability_content {
    width: auto;
  }
`;

export default Styled;
