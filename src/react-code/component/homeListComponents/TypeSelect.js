import React, { useState } from 'react'
import "./TypeSelect.css"
import Options from './Options';

const TypeSelect = ({ targetValues , setTargetValues , dispType , setDispType , toGoList }) => {

    const [flg , setFlg] = useState(false);

    const selectChange = (val) => {
        setDispType(val);
        
        if(val === "map"){
            setFlg(false);
        }
    }

    return (
        <>
        <div className='selectArea'>
            <label className='selectbox'>
                <select value={dispType} onChange={(e) => selectChange(e.target.value)}>
                    <option value="list">List</option>
                    <option value="map">Map</option>
                </select>
                {dispType === "list" ? <button className='selectAreaButton' onClick={() => setFlg(!flg)}>詳細検索</button> : <button className='through'>詳細検索</button>}
            </label>
        </div>
        <div>
            {flg ? <Options setFlg={setFlg} targetValues={targetValues} setTargetValues={setTargetValues} toGoList={toGoList} /> : <div></div>}
        </div>
        </>
    )
}

export default TypeSelect;