import styled from 'styled-components';

const Styled = styled.div`
  .banner {
    height: calc(100vh - 80px);
    filter: none;
    background-color: #010103;
    background-image: radial-gradient(circle at top, #0000 30%, #000 80%, #010103 90%),
      url('/assets/images/banner.jpg');
    background-position: 50%;
    font-family: 'Open Sans', sans-serif;
    background-size: cover;
    opacity: 0.9;
    margin: 0;
    padding: 112px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    display: flex;
    max-width: 80%;
    text-align: center;

    &_title {
      color: #fff;
      font-size: 50px;
      margin-bottom: 54px;
    }

    &_script {
      color: #fff;
      font-size: 28px;
      margin-bottom: 2.5rem;
      max-width: 80%;
    }
  }

  .popularSearch {
    font-size: 17px;
    color: #fff;
    margin-top: 20px;
  }
`;

export default Styled;
