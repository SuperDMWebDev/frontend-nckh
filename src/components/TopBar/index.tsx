import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from 'styled-components';
import Styled from './style';

const PhoneStyled = styled('div')(({ theme }) => ({
  marginRight: '60px'
}));

function TopBar() {
  return (
    <Styled>
      <div className="top-bar">
        <ul className="topbar-left">
          <li className="phone">
            <PhoneEnabledIcon />
            <a href="tel:02862884499">
              <PhoneStyled>(028) 62884499</PhoneStyled>
            </a>
          </li>

          <li className="email">
            <MailOutlineIcon />
            <a href="mailto:info@hcmus.edu.vn">info@hcmus.edu.vn</a>
          </li>
        </ul>

        <ul className="topbar-right">
          <li className="account">
            <AccountCircleOutlinedIcon />
            <a href="">Admin</a>
          </li>
        </ul>
      </div>
    </Styled>
  );
}

export default TopBar;
