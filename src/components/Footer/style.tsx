import styled from 'styled-components';

const Styled = styled.div`
  .footer {
    background-color: var(--blue-bold);
    box-shadow: rgb(0 0 0 / 25%) 0rem 0.4rem inset;
    position: fixed;
    width: 100%;
    top: calc(100vh - 76px);
    height: 76px;
    left: 0px;
    z-index: 9999;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
  }
`;

export default Styled;
