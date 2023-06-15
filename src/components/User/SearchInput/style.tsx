import styled from 'styled-components';

const Styled = styled.div`
  margin-bottom: 50px;

  .searchContainer {
    max-width: 656px;
    height: 80px;
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  .searchText {
    position: relative;
  }

  .searchIcon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .searchIcon.active {
    color: blue;
  }

  .input_search {
    box-sizing: border-box;
    color: rgb(50, 50, 50);
    background: rgb(255, 255, 255);
    border: none;
    height: 60px;
    width: 500px;
    font-size: 16px;
    padding: 12px 40px 12px 40px;
    line-height: 1;
    border-radius: 50px 0 0 50px;
    font-family: proxima-nova, sans-serif;
    border-right: #ddd 1px solid;
  }

  .input_search:focus {
    outline: none;
  }

  .clearIcon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .clearIcon svg {
    color: #999;
  }

  .clearIcon:hover svg {
    color: #555;
  }

  .searchOption {
    background-color: #fff;
    border-radius: 0 50px 50px 0;
    padding: 0 20px;
    position: relative;
    font-family: proxima-nova, sans-serif;
    font-size: 14px;
    color: rgb(50, 50, 50);

    &_title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80px;
      height: 60px;
      font-size: 16px;
      cursor: pointer;
    }

    &_option {
      position: absolute;
      top: 80px;
      right: 10px;
      color: black;

      width: 140px;
      height: 90px;

      border-radius: 9px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.196);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      overflow: hidden;
      background-color: #fff;
      z-index: 999;

      &_item {
        width: 100%;
        padding: 8px 0px;
        text-align: center;
        font-size: 16px;
      }

      &_item:hover {
        background-color: #e8e8e8;
      }
    }
  }
`;

export default Styled;
