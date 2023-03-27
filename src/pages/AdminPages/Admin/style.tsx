import styled from 'styled-components';
const Styled = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;1,300;1,400&display=swap');

  .button_table {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header_table {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .title_table {
    width: 200px;
    height: 33px;
    left: 438px;
    top: 136px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    /* identical to box height */
    letter-spacing: -0.01em;
    color: #1677ff;

    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }

  .button_table {
    width: 90px;
    height: 40px;
    outline: none;
    background-color: white;
    color: #5932ea;
    border-color: #5932ea;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  .button_table:hover {
    background-color: #5932ea;
    color: white;
    border: none;
  }

  .title_modal {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 33px;
    /* identical to box height */

    letter-spacing: -0.01em;

    color: #000000;

    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    color: red;
  }

  .modalStyle {
    border-radius: 20px;
  }

  .newStyle {
    border-radius: 20px;
  }

  /* applied style to its root properties, but no change */
  .ant-modal-content {
    border-radius: 20px;
  }

  .modalStyle2 .ant-modal-header {
    border-radius: 20px 20px 0 0;
  }

  .modalStyle .ant-modal-content {
    background-color: #01579b;
  }
`;

export default Styled;
