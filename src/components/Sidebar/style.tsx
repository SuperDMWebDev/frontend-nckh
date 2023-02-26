import styled from 'styled-components';
const Styled = styled.div`
  aside.ant-layout-sider {
    height: 100%;
  }
  .ant-layout-sider-collapsed {
    .sidebar__title {
      display: none;
    }
  }
  .sidebar {
    background-color: var(--blue-bold);
    &__menu {
      background-color: var(--blue-bold);
    }

    .ant-layout-sider-trigger {
    }
  }
  .sidebar__logo {
    display: flex;
    gap: 20px;
    align-items: center;
    color: var(--white);
    font-size: 16px;
    text-transform: capitalize;
    span.logo {
      max-width: 25px;
      margin-bottom: 2px;

      img {
        object-fit: cover;
        height: auto;
        width: 100%;
      }
    }
  }
`;

export default Styled;
