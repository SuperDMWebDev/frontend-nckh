import styled from "styled-components";

const Styled = styled.div`
    .form-body {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-data {
        width: 800px;
        height: auto;
        border: 1px solid black;
        margin-top: 20px;
        color: black;
        background: rgba(215, 216, 216, 0.15);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
        border-radius: 10px;
        padding: 30px;
    }

    .form-edit {
        display: flex;
        margin-top: 30px;
    }

    .tab-edit {
        width: 250px;
    }

    .tab-edit div {
        font-size: 15px;
    }
`;

export default Styled;