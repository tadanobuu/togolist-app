import './App.css';
import Home from './react-code/main/Home/Home';
import AddNewPlace from './react-code/addNewPlace/AddNewPlace';
import { Routes , Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './react-code/login/Login';

function App() {

  const [ isAuth , setIsAuth ] = useState(sessionStorage.getItem("isAuth"));

  // 認証確認メソッド
  // → 認証されていない場合、ログインページにリダイレクト
  const RequireAuth = ( props ) => {
    const myAuthority = sessionStorage.getItem("isAuth");
    // 権限が「GENERAL」の場合、渡されたコンポーネントをレンダリング
    if(myAuthority !== null){
      return props.component;
    }
    // 権限がない場合、ログインページへリダイレクト
    setIsAuth(null);
    document.location = "/login";
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<RequireAuth component={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />} />
        <Route path='/post' element={<RequireAuth component={<AddNewPlace isAuth={isAuth} setIsAuth={setIsAuth} />} />} />
        <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
      </Routes>
    </>
  );
}

export default App;
