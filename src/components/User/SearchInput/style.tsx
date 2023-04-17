import styled from 'styled-components';

const Styled = styled.div`
  .searchContainer {
    max-width: 656px;
    height: 80px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  .input_search {
    box-sizing: border-box;
    color: rgb(50, 50, 50);
    background: rgb(255, 255, 255);
    border: none;
    height: 40px;
    width: 400px;
    font-size: 13px;
    padding: 12px 40px 12px 16px;
    line-height: 1;
    border-radius: 50px 0 0 50px;
  }

  .searchOption {
    background-color: #fff;
    border-radius: 0 50px 50px 0;
    padding: 0 8px;
    position: relative;

    &_title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100px;
      height: 40px;
    }

    &_option {
      border-radius: 9px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.196);
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 5px;
    }
  }
`;

export default Styled;
