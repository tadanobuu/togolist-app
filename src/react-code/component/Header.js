import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = ({searchWord , setSearchWord , inputDisp , setIsAuth }) => {

    const navigate = useNavigate();

    // ログアウト処理後、ログイン画面へ移動
    const logout = () => {
        sessionStorage.clear();
        setIsAuth(false);
        navigate("/login");
    }

    // "ToGoApp"をクリックで画面最上部へ移動
    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className='header'>
            <h1 onClick={() => returnTop()}>ToGoApp</h1>
            {!inputDisp ? <div className='search_box' style={{backgroundColor: "#e5e7eb"}}></div> : 
                <div className='search_box'>
                    <SearchIcon />
                    <input
                        className="search_input" 
                        placeholder='検索' 
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                    />
                </div>
            }          
            <div className='icons'>
                <div className='logout' onClick={() => logout()}><LogoutIcon />ログアウト</div>
            </div>
        </div>
    )
}

export default Header;