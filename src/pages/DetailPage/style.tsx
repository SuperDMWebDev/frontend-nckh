import styled from 'styled-components';
const Styled = styled.div`
  .title {
    font-size: 24px;
    margin-left: 20px;
    margin-bottom: 40px;
  }

  .content-wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .content_row {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    flex-direction: row;
  }

  .row_title {
    font-weight: '700';
  }
`;

export default Styled;
