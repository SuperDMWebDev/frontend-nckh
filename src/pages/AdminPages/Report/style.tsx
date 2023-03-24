import styled from 'styled-components';

const Styled = styled.div`
    .content-container {
        margin: 150px 0 50px 0;
    }
    ul {
        background-color: #f9f9f9;
        list-style: none;
        padding: 0;
        margin: 0 0 0 -10px;

        display: flex;
        align-items: center;
    }
    .header-fixed {
        top: 0;
    }

    .title {
        margin-bottom: 50px;
        text-align: center;
        font-size: 40px;
    }
    .content {
        margin-bottom: 20px;
        font-size: 14px;
        text-align: left;
        font-style: italic;
        display: block;
        margin-left: 60px;
    }
    .report-chart {
        margin: 0 200px;
        border: 3px solid rgba(0, 0, 0, 5%);
    }
    .chart {
        padding-bottom: 0;
    }
    .statistic {
        margin: auto;
    }
    .detail {
        width: 80%;
        margin: 50px auto;
        text-align: justify;
        font-size: 16px;
    }
`;

export default Styled;
