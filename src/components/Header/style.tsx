import styled from 'styled-components';

const Styled = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 50px;
        box-shadow: 0 3px 3px rgb(0 0 0 / 5%);
<<<<<<< HEAD
=======
        background-color: white;
>>>>>>> origin/develop
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
<<<<<<< HEAD
=======
        background-color: transparent !important;
>>>>>>> origin/develop

        display: flex;
        align-items: space-between;
    }
    li {
        margin-right: 42px;
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
<<<<<<< HEAD
=======
        font-size: 16px;
        text-decoration: none;
>>>>>>> origin/develop
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
