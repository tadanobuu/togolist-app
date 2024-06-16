import React, { useEffect, useState } from 'react'
import { provider } from '../firebase';
import { signInWithPopup, getAuth } from 'firebase/auth';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';
import "./Login.css"
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Login = ({ isAuth , setIsAuth }) => {

    const auth = getAuth();
    const navigate = useNavigate();

    const [ errorMsg , setErrorMsg ] = useState("");
    const [ keyWord , setKeyWord ] = useState("");

    useEffect(() => {
        document.title = 'Todo Login'

        sessionStorage.clear();
        setIsAuth(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loginInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            setIsAuth(true);
        })
    }

    const login = () => {
        if(isAuth){
            const q = query(collection(db, "keyWords"), orderBy("ID", "asc"));
        
            const getList = async() => {
                const data = await getDocs(q);
                return data.docs.map((doc) => ({ ...doc.data() , docID : doc.id }));
            };

            getList().then((result) => {
                const array = result.filter((item) => item.kw === keyWord);
                if(array.length === 1){
                    sessionStorage.setItem("isAuth" , true);
                    sessionStorage.setItem("id" , array[0].ID);
                    navigate("/");
                }else{
                    setErrorMsg("該当するKeyWordがありません")
                }
            })
        }else{
            setErrorMsg("Googleアカウントを選択してください")
        }
    }

    return (
        <div className='login'>
            <div className='google' onClick={() => loginInWithGoogle()}><LoginIcon />{isAuth ? auth.currentUser.displayName : "Google account"}</div>
            <div className='inputKey'><KeyIcon /><input type='password' onChange={(e) => setKeyWord(e.target.value)}></input></div>
            <button className='loginBtn' onClick={login}>ログイン</button>
            <p className='errormsg'>{errorMsg ? errorMsg : ""}</p> 
        </div>
    )
}

export default Login;