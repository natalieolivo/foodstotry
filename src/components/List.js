import React, { useState } from "react";
import "./List.css";

let cardCounter = 0;

function List(props) {   

    function removeList(idx) {
        props.remove(idx); // call parent remove
    }

    function addListCard(listIdx, cardId) {
        props.addCard(listIdx, cardId);
    }

    function removeListCard(listIdx, cardIdx) {        
        props.removeCard(listIdx, cardIdx);
    }
    
    function updateCardTitle(event, listIdx, cardIdx) {
        props.editCardTitle(event, listIdx, cardIdx);
    }

    function toggleBg(event) {
        let el = event.target;        

        if(el.style.backgroundColor === "rgb(255, 255, 255)") {
            event.target.style.backgroundColor = "rgba(236, 234, 217, 0.904)";
            event.target.style.fontWeight = "bold";
        } else {
            event.target.style.backgroundColor = "rgb(255, 255, 255)";
            event.target.style.fontWeight = "normal";
        }
        
    }

    if(props.list === null || (props.list && props.list.length === 0)) {
        return <p>Uh, oh. No Food here! Add a list to begin!</p>
    } else {        
        return ( 
            <ul className="List">
                {props.list.map((item, listIdx) => (
                    <li key={listIdx} className="List-item">
                        <section>
                            <h3 className="List-item-header">{item.name}<span className="List-remove-link" onClick={event => { removeList(listIdx) }}>[-]</span></h3>                                                
                                {item.cards && item.cards.map((card, cardIdx) => (
                                    <div key = {cardIdx} className="Card">
                                        <span>
                                            <input className="Card-title" 
                                                     type="textarea"
                                                     value={card.title} 
                                                     placeholder="Enter a title"
                                                     onFocus={ toggleBg }
                                                     onBlur={ toggleBg } 
                                                     onChange={(e)=>{ updateCardTitle(e, listIdx, cardIdx) } } />                                            
                                        </span>
                                        <span className="Card-remove-link" onClick={ event => removeListCard(listIdx, cardIdx) }>[-]</span>
                                        <div>{card.description}</div>
                                    </div>
                                ))}                        
                            <div className="List-add-card-link" onClick={ event => addListCard(listIdx, cardCounter++) }>Add Card [+] </div>
                        </section>
                    </li>
                    )
                )}
            </ul>       
        )
    }    
}

export default List;