import styled from 'styled-components';

const Styled = styled.div`
  .card_article {
    box-sizing: border-box;

    height: auto;
    background: #ffffff;
    backdrop-filter: blur(6px);
    cursor: pointer;

    transition: all 0.5s;
    user-select: none;
    font-weight: bolder;

    border-left: 0px;
    border-right: 0px;

    padding: 20px 40px;

    border-radius: 10px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.09);
    margin-bottom: 15px;
    width: 100%;
  }

  .card_article:hover {
    background-color: #efefef !important;
  }

  .icon_more {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }

  .card-top-part {
    width: 100%;
    padding: 15px;
    display: flex;
  }

  .left-part {
    margin: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .right-part {
    color: #3f51b5;
    width: 12%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    font-weight: 400;

    &__num {
      display: inline-block;
      font-size: 30px;
      margin: auto;
    }

    &__title {
      font-size: 13px;
      margin-right: auto;
    }
  }

  .user-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .name {
    font-size: 20px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-field {
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    margin: 5px 0;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .name:hover {
    text-decoration: underline;
  }

  .role {
    font-size: 10px;
    color: lightcyan;
    font-weight: bold;
    text-transform: lowercase;
    background-color: lightskyblue;
    padding: 4px 10px;
    border-radius: 15px;
  }

  .user-position {
    color: grey;
    font-size: 13px;
    margin-top: 5px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-bottom-part {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    padding: 15px;
    border: none;

    &__group {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #206edb;
    }

    &__item {
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
    }

    &__item:hover {
      text-decoration: underline;
      color: #0145a4;
    }
  }

  .article-author_list2 {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .citationContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .citationContainer:hover .citationModal {
    display: block;
  }

  .citationModal {
    color: black;
    position: absolute;
    font-size: 12px;
    box-shadow: 0 0 12px rgba(0,0,0,0.09);
    background-color: white;
    min-width: 200px;
    padding: 10px;
    top: -60px;
    font-weight: 600;
    display: none;
    border-radius: 3px;
  }

  .citationModal::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-top: 10px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
  }
`;

export default Styled;
