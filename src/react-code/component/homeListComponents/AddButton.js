import React from 'react'
import "./AddButton.css"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddButton = () => {
    //ボタンクリックで投稿画面へ移動

    const navigate = useNavigate();

    return (
        <div className='post-btn'>
            <button className='btn' onClick={() => navigate('/post')}><AddIcon /></button>
        </div>
    )
}

export default AddButton;