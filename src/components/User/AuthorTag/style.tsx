import styled from 'styled-components';

const Styled = styled.div`
  .addLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    margin-bottom: 20px;
  }

  .MuiTypography-root {
    font-size: 16px;
  }

  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .deleteicon:hover {
    cursor: pointer;
    color: red;
  }
`;

export default Styled;
