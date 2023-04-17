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
    padding: 0 20px;
    position: relative;

    &_title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80px;
      height: 40px;
      font-size: 14px;
    }

    &_option {
      position: absolute;
      top: 50px;

      border-radius: 9px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.196);
      width: 100px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background-color: #fff;
      &_item {
        padding: 8px 0;
        font-size: 14px;
      }

      &_item:hover {
        background-color: #e8e8e8;
      }
    }
  }
`;

export default Styled;
