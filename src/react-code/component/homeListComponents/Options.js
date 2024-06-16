import React from 'react'
import "./Options.css"
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';

const Options = ({ setFlg, targetValues, setTargetValues , toGoList }) => {

    const changeTargetHandle = (e , targetKey) => {
        const key = targetKey;
        const val = e.target.value;
        setTargetValues({ ...targetValues, [key]: val })
    };

    const reset = () => {
        setTargetValues({
            targetDate1 : "",
            targetDate2 : "",
            targetUserName : "ALL",
            targetDateTime1 : "",
            targetDateTime2 : "",
            targetPlace : "ALL"
        })
    }

    const userNameList = toGoList.map(item => item.userName);
    const uniqueUserNameList = Array.from(new Set(userNameList));

    // セレクトボックス内選択肢として使用
    const prefectures = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
    "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
    "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
    "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
    ];

    return (
        <div className='options'>
            <div className='searchDate'>
                <CalendarMonthIcon />
                <input type='date' value={targetValues.targetDate1} onChange={(e) => changeTargetHandle(e , "targetDate1")} />
                ~
                <input type='date' value={targetValues.targetDate2} onChange={(e) => changeTargetHandle(e , "targetDate2")} />
            </div>
            <div className='searchUserName'>
                <RecordVoiceOverIcon />
                <select value={targetValues.targetUserName} onChange={(e) => changeTargetHandle(e , "targetUserName")} >
                    <option value="ALL">ALL</option>
                    {uniqueUserNameList.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })}
                </select>
            </div>
            <div className='searchPostDateTime'>
                <AccessTimeIcon />
                <input type='datetime-local' value={targetValues.targetDateTime1} onChange={(e) => changeTargetHandle(e , "targetDateTime1")} />
                ~
                <input type='datetime-local' value={targetValues.targetDateTime2} onChange={(e) => changeTargetHandle(e , "targetDateTime2")} />
            </div>
            <div className='searchPrectures'>
                <PlaceIcon />
                <select value={targetValues.targetPlace} onChange={(e) => changeTargetHandle(e , "targetPlace")}>
                    <option value="ALL">ALL</option>
                    {prefectures.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })}
                </select>
            </div>
            <button className='close' onClick={() => setFlg(false)}>閉じる</button>
            <button className='reset' onClick={() => reset()}>リセット</button>
        </div>
    )
}

export default Options;