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

  .content_wrapper {
    margin-left: 20px;
    display: flex;
    gap: 25px;
  }

  .title_column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }

  .value_column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .row_title {
    font-weight: '700';
  }
`;

export default Styled;
