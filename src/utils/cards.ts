import { Card } from "../models/card";
import { Colors } from "../models/colors";


export const getInitialCards = (numberOfCards: number) : Card[] =>
{
    const randomColorArray = getRandomColorArray(numberOfCards);
    let cards: Card[] = [];
    for(let i = 0; i < numberOfCards; i++)
    {
        cards.push({
            id: i,
            color: randomColorArray[i],
            isActiveCard: false,
            isCardWon: false
        })
    }

    return cards;
}

const getRandomColorArray = (arrayLength: number) : string[] =>
{   
    let colorArray: string[] = [];
    for(let i = 0; i * 2 < arrayLength; i++)
    {
        colorArray.push(Colors[i]);
        colorArray.push(Colors[i]);
    }

    return randomizeArray(colorArray);
}

const randomizeArray = (array: any[]) : any[] => 
{
    let i = array.length;
    let j = 0;
    var tempArray: any;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));

        tempArray = array[i];
        array[i] = array[j];
        array[j] = tempArray;
    }

    return array;
}