import styled from 'styled-components';

const Styled = styled.div`
color: var(--dark);

.container {
  margin: 30px 0;
  padding: 0;
}
.btn {
  font-size: 16px;
  border: 1px solid var(--dark);
  color: var(--dark);
  transition: all .3s;
}
.btn:active {
  border-color: transparent;
}
.btn:focus {
  box-shadow: none;
}
.title {
  margin-bottom: 16px;
  padding: 0 2px;
  text-align: right;
}
.title::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: black;
  margin-top: 2px;
}

.account {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  text-align: center;
}

.btn-edit {
  color: var(--gray-semi);
  border: none;
}
.btn-edit:hover {
  color: var(--gray-medium);
}
.btn-edit p {
  display: none;
}
.details-info .info {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
}
.details-info h1, .details-info p {
  font-size: 16px;
  margin: 0;
}
.details-info p {
  width: 50%;
}

.download-data-content {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.download-data-content p {
  margin: 0;
}
.btn-file:first-of-type {
  margin-right: 20px;
}
.btn-file:hover {
  color: var(--blue-light);
}

.account-manipulation.container {
  width: 90%;
  margin: 40px auto;
  margin-bottom: 0;
}
.btn-controls {
  display: flex;
  justify-content: space-between;
}
.btn-change-pwd, .btn-close-account {
  font-size: 20px;
}
.btn-change-pwd:hover, .btn-close-account:hover {
  color: var(--white);
  background-color: var(--blue-light);
}
`;

export default Styled;
