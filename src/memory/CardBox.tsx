import * as React from "react";
import { useState } from "react";
import { Card } from "../models/card";

export interface CardProps {
    card: Card;
    handleClick: (card: Card) => void;
}
const CardBox = (({card, handleClick} : CardProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    React.useEffect(() => {
        let element: HTMLElement | null = document.getElementById(card.id.toString());
        if (element)
        {
            if(card.isActiveCard)
            {
                const style = `background:${card.color};`;
                element.setAttribute("style", style);
            }         
            else if (card.isCardWon)
            {
                element.setAttribute("style", "");
                element.classList.remove("boxshadow");
            }
        }

        const img = new Image();
        img.src = "/card-background.png";
        setIsLoading(false);
    }, [isLoading, card])

    return (
        <>
            {!isLoading && (card.isActiveCard || card.isCardWon) ? 
                <span className="card no-hover boxshadow" id={card.id.toString()} key={card.id}></span> : 
                <img className="card boxshadow" src="/card-background.png" alt="memory" onClick={() => handleClick(card)}/>}
        </>)
})

export default CardBox;