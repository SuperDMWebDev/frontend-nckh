import styled from 'styled-components';

const Styled = styled.div`
color: var(--dark);
font-size: 16px;

a {
  text-decoration: none;
  color: var(--blue-light);
  transition: all .3s;
}
a:hover {
  text-decoration: underline;
  color: var(--blue-bold);
}
.container {
  width: 90%;
  margin: 50px auto;
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

.btn-add-profile {
  font-size: 20px;
  margin-bottom: 20px;
}
.btn-add-profile:hover {
  color: var(--white);
  background-color: var(--blue-light);
}
`;

export default Styled;
