import styled from 'styled-components';

const Styled = styled.div`
  .banner {
    height: 70.5rem;
    filter: none;
    background-color: #010103;
    background-image: radial-gradient(circle at top, #0000 30%, #000 80%, #010103 90%),
      url('/assets/images/banner.jpg');
    background-position: 50%;
    background-size: cover;
    margin: 0;
    padding: 112px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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

    &_title {
      color: #fff;
      font-size: 70px;
      margin-bottom: 54px;
    }

    &_script {
      color: #fff;
      font-size: 28px;
      margin-bottom: 2.5rem;
    }
  }

  .popularSearch {
    font-size: 17px;
    color: #fff;
    margin-top: 20px;
  }
`;

export default Styled;
