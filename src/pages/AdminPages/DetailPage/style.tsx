import styled from 'styled-components';

const Styled = styled.div`
  .container {
    padding: 50px 0;
    width: 50%;
    border-radius: 4px;
  }

  .title_wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 50px;
    padding: 15px;
  }

  .title {
    width: 169px;
    height: 33px;
    left: 438px;
    top: 136px;

    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 33px;

    letter-spacing: -0.01em;

    color: #1677ff;

    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }

  .content_wrapper {
    display: flex;
    justify-content: center;
    gap: 500px;
    font-size: 16px;
    padding-top: 80px;
  }

  .title_column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 55px;
  }

  .value_column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 55px;
  }

  .row_title {
    font-weight: '700';
  }
`;

export default Styled;
