import styled from 'styled-components';

const Styled = styled.div`
    .top-bar {
        background-color: #18478B;
        padding: 15px 60px;
        color: #dfdfdf;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
    }
    svg {
        margin-right: 12px;
        width: 22px;
        height: 22px;
        line-height: 22px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: transparent !important;

        display: flex;
        align-items: center;
    }
    li {
        display: flex;
        align-items: center;
    }
    li:hover a {
        color: white;
    }
    a {
        color: #dfdfdf;
        font-size: 16px;
        text-decoration: none;
        transition: all .3s;
        cursor: pointer;
    }
`;

export default Styled;
