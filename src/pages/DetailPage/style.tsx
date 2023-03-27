import styled from 'styled-components';

const Styled = styled.div`
  .title_wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .title {
    width: 169px;
    height: 33px;
    left: 438px;
    top: 136px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 33px;
    /* identical to box height */

    letter-spacing: -0.01em;

    color: #1677ff;

    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }

  .content-wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .content_row {
    display: flex;
    align-items: center;
    width: 60%;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .row_title {
    font-weight: '700';
  }
`;

export default Styled;
