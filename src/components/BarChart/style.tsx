import styled from 'styled-components';

const Styled = styled.div`
    background-color: #f9f9f9;
    padding-bottom: 180px;

    .statistic {
        padding: 25px 0;
        background-color: white;
        margin: 0 200px;
    }
    .statistic-title {
        font-size: 20px;
        color: #606060;
        margin-bottom: 40px;
        margin-left: 70px;
    }
    .recharts-wrapper {
        margin: auto;
        background-color: white;
        position: static !important;
    }
    
    .recharts-legend-wrapper {
        display: none;
    }
`;

export default Styled;
