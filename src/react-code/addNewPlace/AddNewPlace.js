import React, { useEffect, useState } from 'react'
import FestivalIcon from '@mui/icons-material/Festival';
import Place from '@mui/icons-material/Place';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import "./AddNewPlace.css"
import Header from '../component/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const AddNewPlace = ({ isAuth , setIsAuth }) => {

    const { normalize } = require('@geolonia/normalize-japanese-addresses') // 緯度経度設定用
    const navigate = useNavigate();
    const auth = getAuth();

    const [ image , setImage ] = useState(null);
    const [ imagefile , setImageFile ] = useState(null);

    useEffect(() => {
        document.title = 'ToGo NewPost'
    },[]);

    const [ values , setValues ] = useState({
        placeName : "",
        addressNum1 : "",
        addressNum2 : "",
        address : "",
        startDate : "",
        endDate : "",
        prefecture : "",
        userName : auth.currentUser.displayName,
        id : Number(sessionStorage.getItem("id"))
    })

    // 画像の取り込み
    const onFileInputChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl); // firebase用画像URL
        setImageFile(file); // 投稿画面用画像ファイル
    }

    const changehandle = (e , targetKey) => {
        const key = targetKey;
        const val = e.target.value;

        switch(key){
            // 日付変更用(str型に変換)
            case "startDate":
            case "endDate":
                if (e.target.value === ""){
                    setValues({ ...values , [key] : ""})
                }else{
                    let dateVal = new Date(e.target.value);
                    setValues({
                        ...values, 
                        [key]: 
                            dateVal.getFullYear() + "-" +
                            String(dateVal.getMonth() + 1).padStart(2, '0') + "-" +
                            String(dateVal.getDate()).padStart(2, '0')
                    });
                }
                break;
            default:
                setValues({ ...values, [key]: val });
        }
    };

    const sentForm = async(newPost) => {

        const imageUpload = async(newPost) => {
            const storageRef = ref(storage, "image/" + imagefile.name);
            return (
                await uploadBytes(storageRef, imagefile).then(() => {
                    return (
                    getDownloadURL(storageRef).then((url)=> {
                        return newPost = { ...newPost , "imageUrl": url}
                    }).catch(() => {
                        return newPost = { ...newPost , "imageUrl": ""}
                    })
                    )
                }).catch(() => {
                    return newPost = { ...newPost , "imageUrl": ""}
                })
            )
        };

        const searchPrefecture = (newPost) => {
            return normalize(newPost.address).then((result) => result)
        };

        const addDocment = async(newPost, addressInfo) => {
            // 検索の便宜上 startDate endDate が空白の場合日付を設定
            if(newPost.startDate === ""){
                newPost = { ...newPost , startDate: "1970-01-01"}
            }
            if(newPost.endDate === ""){
                newPost = { ...newPost , endDate: "2999-12-31"}
            }
            
            let post = { 
                ...newPost, 
                "prefecture": addressInfo.pref,
                "lat": addressInfo.lat,
                "lng": addressInfo.lng,
                "postDateTime": serverTimestamp(),
                "addressNum": newPost.addressNum1 + "" + newPost.addressNum2,
            }
            await addDoc(collection(db, "list"), post);
        }

        const _newPost = imagefile === null ? newPost : await imageUpload(newPost); // 画像url追加
        const addressInfo = await searchPrefecture(newPost); // 都道府県、緯度経度の追加
        await addDocment(_newPost , addressInfo); // firebaseへ投稿

        navigate('/'); //リスト画面へ移行
    }

    return (
        <>
            <Header inputDisp={false} isAuth={isAuth} setIsAuth={setIsAuth} />
            <h2 className='title'>New Place</h2>
            <div className='newPlaceForm' style={{backgroundImage: `url(${image})`}}>
                <div className='newPlaceName'>
                    <FestivalIcon />
                    <input type='text' className='input1' maxLength={12} value={values.placeName} onChange={(e) => changehandle(e , "placeName")}/>
                </div>
                <div className='newAddressNum'>
                    <em className='yubin_icon'>〒</em>
                    <input type='number' className='input2-1' value={values.addressNum1} onChange={(e) => changehandle(e , "addressNum1")} />
                    -
                    <input type='number' className='input2-2' value={values.addressNum2} onChange={(e) => changehandle(e , "addressNum2")} />
                </div>
                <div className='newAddress'>
                    <Place />
                    <input type='text' className='input3' maxLength={30} value={values.address} onChange={(e) => changehandle(e , "address")} placeholder='都道府県から記載' />
                </div>
                <div className='newDate'>
                    <CalendarMonth />
                    <input type='date' className='input4-1' value={values.startDate} onChange={(e) => changehandle(e , "startDate")} />
                    ~
                    <input type='date' className='input4-2' value={values.endDate} onChange={(e) => changehandle(e , "endDate")} />
                    <em className='guidance'>※未入力の場合ALL Date</em>
                </div>
            </div>
            <div className='otherGroup'>
                <div className='newPicture'>
                    <button className='newPictureButton' variant="contained" component="label" onClick={() => document.getElementById('imageInput').click()}>
                        <AddPhotoAlternateIcon />
                        <em>背景画像を設定</em>
                    </button>
                </div>
                <input id='imageInput' type='file' hidden accept='image/*' onChange={onFileInputChange} />{/* 非表示のinputタグ */}
                <div className='sentFormButton'>
                    <button className='sendButton' onClick={() => sentForm(values)}><SendIcon /><em>投稿する</em></button>{/* クリックで投稿後リスト画面へ移動 */}
                </div>
                <div className='pageBack'>
                    <button className='pageBackButton' onClick={() => navigate('/')}><ArrowBackIcon /><em>リストに戻る</em></button>{/* クリックでリスト画面へ移動 */}
                </div>
            </div>
        </>
    )
}

export default AddNewPlace