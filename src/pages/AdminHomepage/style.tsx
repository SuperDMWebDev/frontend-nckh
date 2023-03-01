import styled from 'styled-components';

const Styled = styled.div`
    .carousel {
        padding: 75px 0 100px 0;
        backgroundColor: #f9f9f9;
    }
    img {
        width: 750px;
        height: 100%;
    }
    .carousel-inner {
        display: flex;
    }
    .carousel-item {
        width: 750px;
        position: relative;
        margin-right: 10px;
        margin: auto;
    }

    ul {
        background-color: #f9f9f9;
        list-style: none;
        padding: 0;
        margin: 0 0 0 -10px;

        display: flex;
        align-items: center;
    }
`;

export default Styled;
