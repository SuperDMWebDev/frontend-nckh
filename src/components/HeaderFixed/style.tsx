import styled from 'styled-components';

const Styled = styled.div`
    .header-fixed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 50px;
        box-shadow: 0 3px 3px rgb(0 0 0 / 5%);
        background-color: white;

        position: absolute;
        width: 100%;
        top: 79px;
    }
    svg {
        margin-right: 12px;
        width: 22px;
        height: 22px;
        line-height: 22px;
    }
    .account svg {
        color: #959595;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: transparent !important;

        display: flex;
        align-items: space-between;
    }
    li {
        margin-right: 40px;
        display: flex;
        align-items: center;
    }
    li:last-child {
        margin-right: 0;
    }
    li:hover a {
        color: #3f51b5;
    }
    li:hover a::after {
        width: 100%;
    }

    a {
        color: #959595;
        position: relative;
        font-size: 16px;
        text-decoration: none;
    }
    a::after {
        content: "";
        background-color: #3f51b5;
        width: 0;
        display: block;
        height: 2px;
        position: absolute;
        transition: all .3s;
    }
`;

export default Styled;
