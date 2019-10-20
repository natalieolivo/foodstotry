import React, {useEffect, useState } from "react";
import List from "./List";

let ls = window.localStorage;

function Board(props) {       
    const initialList = JSON.parse(ls.getItem('list')) ? JSON.parse(ls.getItem('list')) : []; 
    const [list, setList] = useState(initialList);        
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {             
        if(list) {
            ls.setItem('list', JSON.stringify(list));
            console.log(ls.getItem('list'));
        }
        
        if(list.length > 0) {
            setModalVisible(false);
        }

    },[list]);

    function addCardToList(listIdx, id) {
        console.log(list[listIdx]);
        
        list[listIdx].cards.push({
            title: `title--${id}`,
            description: "description"
        });

        return list;
    }

    function addNewCard(listIdx, id) {        
        addCardToList(listIdx, id);
        setList([...list]);
    }

    function updateCardTitle(event, listIdx, cardIdx) {
        list[listIdx].cards[cardIdx].title = event.target.value;
        setList([...list]);
    }

    function removeCardFromList(listIdx, cardIdx) {
        list[listIdx].cards.splice(cardIdx, 1);
        setList([...list]);
    }

    function removeCard(listIdx, cardIdx) {
        removeCardFromList(listIdx, cardIdx);
    }    

    function addNewList(event, selector) {     
        
        let value = getElementByFieldName(event.target.parentNode, "text").value;        
        if(value) {            
            // expand in place, append length every time
            setList([...list, { name:  value, id: 2, cards: [] }]);
        }
    }    

    function removeList(idx) {      
        list.splice(idx, 1);
        setList([...list]);        
    }

    function getElementByFieldName(parent, fieldName) {        
        if(!parent.childNodes) return;
        let el = null;

        for(let i = 0; i < parent.childNodes.length; i++) {
            if(parent.childNodes[i].type === "text") {
                el = parent.childNodes[i];
            }
        }        
        return el;        
    }

    return (
        <div className="Board">
            <h1 className="Board-header">My Food Experience</h1>
            {          
                <List list={list} editCardTitle={updateCardTitle} remove={removeList} addCard={addNewCard} removeCard={removeCard} />
            }
            <div className="Board-create-link" onClick={ () => { setModalVisible(true) } }>Create new list [+]</div>
            <section className={`Board-create-modal-screen ${modalVisible ? 'show' : ''}`} onClick={() => { setModalVisible(false) }}></section>            
            <section className={`Board-create-modal ${modalVisible ? 'show' : ''}`}>
                <input className="Board-text-title" onFocus={(event) => { event.target.value = "" }} type="text" placeholder="title"/>
                <div className="Board-create-link" onClick={(event) => { addNewList(event, "Board-create-modal") } }>
                    Create new list [+]            
                </div>                
            </section>
        </div>
    );
}

export default Board;