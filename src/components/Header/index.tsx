// import styled from 'styled-components';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import Styled from './style';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: '100px',
//   backgroundColor: '#efefef',
//   marginLeft: 0,
//   width: '55%'
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: '0 15px',
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: 'black',
//   opacity: '41%',
//   svg: {
//     width: '20px',
//     height: '20px'
//   }
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   width: '100%',
//   color: '#959595',
//   '& .MuiInputBase-input': {
//     padding: '10px',
//     // vertical padding + font size from searchIcon
//     paddingLeft: '40px',
//     fontSize: '16px'
//   },
//   'input::placeholder': {
//     color: 'black',
//     opacity: '41%',
//     fontStyle: 'italic',
//     fontSize: '16px'
//   }
// }));

// export default function Header() {
//   return (
//     <Styled>
//       <div className="header">
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase placeholder="Tìm kiếm..." inputProps={{ 'aria-label': 'search' }} />
//         </Search>

//         <ul>
//           <li>
//             <a href="">GIỚI THIỆU</a>
//           </li>
//           <li>
//             <a href="">THỐNG KÊ</a>
//           </li>
//           <li>
//             <a href="">TRANG CHỦ</a>
//           </li>
//         </ul>
//       </div>
//     </Styled>
//   );
// }
