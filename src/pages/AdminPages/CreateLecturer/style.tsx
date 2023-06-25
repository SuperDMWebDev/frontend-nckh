import styled from "styled-components";

const Styled = styled.div`
.title-header {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
}

.input-style {
  width: 400px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  outline: none;
  font-family: 'Courier New', Courier, monospace;
}

.input-style:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form {
  display: flex;
  gap: 20px;
}

.form span {
  font-family: 'Courier New', Courier, monospace;
  font-size: 17px;
  margin-right: 10px;
}

.input-dateofbirth {
  width: 160px;
  height: 45px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
}

.form-input {
  display: flex;
  justify-content: center;
}

.border-data {
  width: 100%;
  height: auto;
  background-color: #efeeee;
  padding: 30px;
  border-radius: 20px;
}

.btn-create {
  font-family: monospace;
  background-color: #f3f7fe;
  color: #3b82f6;
  border: 0.5px solid #3b82f6;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: .3s;
}

.btn-create:hover {
  background-color: #3b82f6;
  box-shadow: 0 0 0 5px #3b83f65f;
  color: #fff;
}

.btn-herder {
  display: flex;
  justify-content: space-between;
}

`

export default Styled;