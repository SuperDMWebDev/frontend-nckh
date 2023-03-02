import styled from 'styled-components';

const Styled = styled.div`
    .carousel {
        padding: 75px 0 100px 0;
        background-color: #f9f9f9;
        position: relative;
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

    .carousel-control-prev, .carousel-control-next {
        position: absolute;
        top: 255px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #18478B;
        opacity: 50%;
        transition: all .3s;
    }
    .carousel-control-prev {
        left: 40px;
    }
    .carousel-control-next {
        right: 40px;
    }

    .carousel-control-prev-icon {
        background-image: url("../assets/icons/arrow-left.svg");
        width: 30px;
        height: 30px;
    }
    .carousel-control-next-icon {
        background-image: url("../assets/icons/arrow-right.svg");
        width: 30px;
        height: 30px;
    }
    .carousel-control-prev:hover .carousel-control-prev-icon {
        background-image: url("../assets/icons/arrow-left-white.svg");
        width: 30px;
        height: 30px;
    }
    .carousel-control-next:hover .carousel-control-next-icon {
        background-image: url("../assets/icons/arrow-right-white.svg");
        width: 30px;
        height: 30px;
    }

    .carousel-indicators {
        bottom: 55px;
    }
    .carousel-indicators button {
        width: 20px;
        height: 0;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 1;
        border-radius: 405px;
        margin: 0 5px;
        border: 4px solid rgba(0, 0, 0, 0.4);
    }
`;

export default Styled;
