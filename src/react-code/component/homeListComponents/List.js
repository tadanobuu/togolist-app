import React from 'react'
import "./List.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const List = ({ displayList , deleteItem }) => {

    const completeTask = (id) => {
        deleteItem(id);
    }

    return (
        <div className='listArea'>
            {displayList.length === 0 ? 
            ""
            : 
            displayList.map((item) => {
                let postDateTime = item.postDateTime.toDate();

                // 期間の表示
                let date = "ALL Date" // "1970-01-01"~"2999-12-31"の場合"ALL Date"
                if(item.startDate !== "1970-01-01" && item.endDate !== "2999-12-31" ){
                    date = (
                        item.startDate.replaceAll("-", "/") + 
                        " ~ " +
                        item.endDate.replaceAll("-", "/")
                    )
                }else if(item.startDate !== "1970-01-01" && item.endDate === "2999-12-31"){
                    date = (
                        item.startDate.replaceAll("-", "/") + 
                        " ~ "
                    )
                }else if(item.startDate === "1970-01-01" && item.endDate !== "2999-12-31"){
                    date = (
                        " ~ " +
                        item.endDate.replaceAll("-", "/")
                    )
                }

                return (
                    <div className='list' key={item.id} style={{background: 'rgba(200,200,200,0.6) url("' + item.imageUrl + '") 50% 50%/cover'}}>
                    <div className='chkbtn' onClick={() => completeTask(item.id)}><CheckIcon className='check' /></div>
                    <p className='placeName'>{item.placeName}</p>
                    <p className='addressNum'>
                        〒
                        {String(item.addressNum).substring(0,3)}
                        -
                        {String(item.addressNum).substring(3,7)}
                    </p>
                    <p className='address'>{item.address}</p>
                    <p className='date'><CalendarMonthIcon />
                        {date}
                    </p> 
                    <div className='postInfo'>
                        <p className='userName'>
                            <RecordVoiceOverIcon />
                            {item.userName}
                        </p>
                        <p className='postDateTime'>
                            <AccessTimeIcon />
                            {
                            String(postDateTime.getFullYear()) 
                            + 
                            "/" 
                            + 
                            String(postDateTime.getMonth() + 1).padStart(2, '0')
                            +
                            "/"
                            +
                            String(postDateTime.getDate()).padStart(2, '0')
                            +
                            " "
                            +
                            String(postDateTime.getHours()).padStart(2, '0')
                            +
                            ":"
                            +
                            String(postDateTime.getMinutes()).padStart(2, '0')
                            }
                        </p>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List;