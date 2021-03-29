import { useEffect, useState } from "react"
import { Card } from "../models/card"
import { getInitialCards } from "../utils/cards"
import CardBox from "./CardBox"

const GameBoard = (() => {
    const [cards, setCards] = useState<Card[]>([])
    const [isFrozen, setIsFrozen] = useState<boolean>(false)
    const [isGameActive, setIsGameActive] = useState<boolean>(true)
    const [points, setPoints] = useState<number>(0)
    const [topScore, setTopScore] = useState<number | null>(null)

    const numberOfCards = 16;
    const numberOfRows = Math.ceil(numberOfCards / 4);

    useEffect(() => {
        const initialCards = getInitialCards(numberOfCards);
        setCards(initialCards);
    }, [])

    const handleClick = (card: Card) =>
    {
        // if move is ongoing, do nothing.
        if (isFrozen)
            return;       

        // checks if any card has already been flipped.
        const activeCard = cards.find(card => card.isActiveCard);

        if (activeCard)
        {
            let newCards: Card[] = [];
            let newPoints: number = points;

            // checks if the card that is flipped has same color as the already flipped card
            if (card.color === activeCard.color)
            {
                newCards = cards.map(c => {
                    if(c.id === card.id || c.id === activeCard.id)
                        return {...c, isActiveCard: true, isCardWon: true}
                    else
                        return {...c, isActiveCard: false};
                    }
                );

                newPoints = points + 1;    
            }
            else {
                newCards = cards.map(c => {
                    if(c.id === card.id)
                        return {...c, isActiveCard: true}
                    else
                        return c;
                    }
                );

                newPoints = points - 1;
            }

            setCards(newCards);
            setIsFrozen(true);
            
            // wait two seconds before unfreezing and flipping cards.
            setTimeout(function () {
                setCards(newCards.map(c => {
                        return {...c, isActiveCard: false};
                    }
                ));
                setIsFrozen(false);
                setPoints(newPoints);
                
                // check if all cards has been won
                const isRoundWon = !newCards.find(card => !card.isCardWon);
                if (isRoundWon)
                {
                    setIsGameActive(false);
                    if(topScore === null || newPoints > topScore)
                        setTopScore(newPoints);

                    return;
                }   
            }, 2000);       
        }
        else {
            setCards(cards.map(c => {
                if(c.id === card.id)
                    return {...c, isActiveCard: true}
                else
                    return c;
                }
            ))
        }
    }

    const newGame = () =>
    {
        if(!isFrozen)
        {
            const initialCards = getInitialCards(numberOfCards);
            setCards(initialCards);
            setPoints(0);
            setIsFrozen(false);
            setIsGameActive(true);
        }
    }

    const createRows = () =>
    {
        let rows: any = [];

        for (let i = 0; i < numberOfRows; i++)
        {
            const startingNumber = i * 4;
            const cardSliced = cards.slice(startingNumber, startingNumber + 4);

            rows.push(
                <div key={i} className="row">
                    {cardSliced.map(card => {
                        return (
                            <span key={card.id} onClick={() => handleClick(card)}>
                                <CardBox card={card} handleClick={handleClick}/>
                            </span>
                        )})}
                </div>
            )
        }

        return rows;
    }
   
    return (
        <>
            <div className="container">
                <div className="header">
                    <img src="/logo.png" alt="logo" />
                </div>
                <div className="nav-bar">
                    <div className="nav-bar-container">
                    <span onClick={newGame}>
                        NEW GAME
                    </span>
                    {topScore !== null && 
                    <span>
                        TOP SCORE: {topScore}
                    </span>}

                    <span>
                        POINTS: {points}
                    </span></div>
                </div>
                <div className="board">
                    {isGameActive ? 
                    createRows() :
                    <>
                        <h1>Game won! Try again?</h1>
                        <div className="button" onClick={newGame}>NEW GAME</div>
                    </>}
                </div>
            </div>
        </>
    )
})

export default GameBoard;