import AddButton from "../../component/homeListComponents/AddButton";
import Header from "../../component/Header";
import List from "../../component/homeListComponents/List";
import TypeSelect from "../../component/homeListComponents/TypeSelect";
import { collection, deleteDoc, getDocs, query, doc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Map from "../../component/homeMapComponents/Map";
import "./Home.css"

const Home = ({ isAuth , setIsAuth }) => {

    const [ toGoList , setToGoList ] = useState([]);
    const [ searchWord , setSearchWord ] = useState("");
    const [ targetValues , setTargetValues ] = useState({
        targetDate1 : "",
        targetDate2 : "",
        targetUserName : "ALL",
        targetDateTime1 : "",
        targetDateTime2 : "",
        targetPlace : "ALL"
    });
    const [ dispType , setDispType ] = useState("list");

    useEffect(() => {
        document.title = 'ToGo List'

        // firestoreからIDが一致する全てのリストを取得
        const q = query(collection(db, "list"), where("id", "==", Number(sessionStorage.getItem('id'))));
        
        const getList = async() => {
            const data = await getDocs(q);
            const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) 
            setToGoList(list.sort((a, b) => b.postDateTime - a.postDateTime)); // postDateTime 降順
        };
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    // firestoreからチェックしたToGoを削除
    const deleteItem = async(id) => {
        await deleteDoc(doc(db, "list", id));
        setToGoList(toGoList.filter(item => item.id !== id));
    };

    // 検索条件に対してフィルター
    let displayList = toGoList.filter(item => item.placeName.indexOf(searchWord) !== -1)
    if(targetValues.targetDate1 !== ""){
        displayList = displayList.filter(item => new Date(item.startDate) >= new Date(targetValues.targetDate1) || new Date(item.endDate) >= new Date(targetValues.targetDate1) || item.startDate === "")
    };
    if(targetValues.targetDate2 !== ""){
        displayList = displayList.filter(item => new Date(item.endDate) <= new Date(targetValues.targetDate2) || new Date(item.startDate) <= new Date(targetValues.targetDate2) || item.endDate === "")
    };
    if(targetValues.targetUserName !== "ALL"){
        displayList = displayList.filter(item => item.userName === targetValues.targetUserName)
    };
    if(targetValues.targetDateTime1 !== ""){
        displayList = displayList.filter(item => new Date(item.postDateTime.seconds * 1000) >= new Date(targetValues.targetDateTime1))
    };
    if(targetValues.targetDateTime2 !== ""){
        displayList = displayList.filter(item => new Date(item.postDateTime.seconds * 1000) <= new Date(targetValues.targetDateTime2))
    };
    if(targetValues.targetPlace !== "ALL"){
        displayList = displayList.filter(item => item.prefecture === targetValues.targetPlace)
    };

    return (
        <div>
            <Header searchWord={searchWord} setSearchWord={setSearchWord} inputDisp={true} setIsAuth={setIsAuth} />
            <TypeSelect targetValues={targetValues} setTargetValues={setTargetValues} dispType={dispType} setDispType={setDispType} toGoList={toGoList} />
            { !isAuth ? "" :
                <>
                { dispType === "list" ?
                    <>
                        <List displayList={displayList} deleteItem={deleteItem} />
                        <footer />
                    </>
                    :
                    <Map displayList={displayList} />
                }
                <AddButton />
                </>
            }
        </div>
        
    )
}

export default Home;