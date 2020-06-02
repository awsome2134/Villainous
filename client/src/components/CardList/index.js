import React from "react";
import Axios from "axios";
import Card from "../Card";
import "./index.css";

class CardList extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            deck: [],
            fateDeck: [],
            hand: [],
            discardPile: [],
            handSize: 0,
            position: 0
        };

        //used to allow for R/W of this.state
        this.make=this.make.bind(this);
        this.end=this.end.bind(this);
        this.options=this.options.bind(this);
    }

    make(event){
        let deck=this.state.deck;
        let fateDeck= this.state.fateDeck;

        //connect to database of decks
        Axios.get(`/api/${event.target.value}`)
        .then((processed) =>{
            //shuffle cards indescriminately
            let data=processed.data.sort(function(a, b){return 0.5 - Math.random()});
            data.map((v) => {
                //add to deck or fate deck depending on type of card
                if(v.type1 === "Deck"){
                    deck.push(v);
                }else{
                    fateDeck.push(v);
                }
            });

            //update deck(s) states and pick up first hand
            this.setState({deck, fateDeck});
            this.pickUp();
            });
    }

    pickUp(){
        let hand= this.state.hand;
        let deck= this.state.deck;
        let i=this.state.handSize;
        
        //readjust deck to always have cards to pick up
        if(deck.length <= 3){
            let discardPile=this.state.discardPile;
            
            discardPile.sort(function(a, b){return 0.5 - Math.random()})
            .map((v) =>{
                deck.push(v);
            });

            //reset discard pile, readjust states
            discardPile=[];
            this.setState({discardPile, deck});
        }

        //add cards from deck to hand
        for(i; i<4; i++){
            let card=deck.pop();
            hand.push({"id":i, "name":card.name, "description":card.description, "type1":card.type1, "type2":card.type2, "play":card.play});
        }
        this.setState({hand, deck, handSize: i});
    }

    discard(id){
        let discardPile= this.state.discardPile;
        let hand=this.state.hand;
        
        //remove card from hand then add to discard pile
        let temp=hand.splice(id, 1);
        discardPile.push(temp[0]);
        
        //adjust hand size/amount of cards in hand
        let handSize=this.state.handSize;
        handSize -= 1;

        //update
        this.setState({hand, handSize});
    }

    //end of turn
    end(){
        let list=document.getElementById("board"+this.state.position);

        //checks if first turn or not
        if(this.state.position !== 0)
            //reenable any/up to 4 options on board for future use
            for(let x=0; x<list.options.length; x++){
                if(list.options[x].disabled === true){
                    list.options[x].disabled= false;
                }
            }

        //reset hand to 4 cards
        this.pickUp();

        //decide on next board movement/position
        let position=prompt("Where will you move next? (1-4)");
        this.setState({position});
    }

    //list of available actions to perform based on location
    options(event){
        event.preventDefault();

        let selected= document.getElementById("board"+this.state.position);
        let x=0;
        
        while(selected.value !== selected.options[x].value){
            x++;
        }

        //after action is performed disables action until turn is over
        selected.options[x].disabled= true;
    }

    render(){
        return(
            <div className="screen">
                <div className="cardList">    
                    {this.state.handSize !== 0 || this.state.deck.length > 0 ?
                        <>
                        {this.state.hand.map((v, index) =>
                            <Card key={index} id={index} name={v.name} description={v.description} type1={v.type1} type2={v.type2} play={v.play} discard={(id) => this.discard(id)}/>
                        )}
                        <div className="board">
                            {this.state.position === "1" ?
                            <span className="first">
                                <select id="board1">
                                    <option value="move">move</option>
                                    <option value="play">play</option>
                                    <option value="fate">fate</option>
                                    <option value="1">1</option>
                                </select>
                            </span>
                            : this.state.position === "2" ?
                            <span className="second">
                                <select id="board2">
                                    <option>move</option>
                                    <option>play</option>
                                    <option>discard</option>
                                    <option>2</option>
                                </select>
                            </span>
                            : this.state.position === "3" ?
                            <span className="third">
                            <select id="board3">
                                    <option>play</option>
                                    <option>discard</option>
                                    <option>play</option>
                                    <option>3</option>
                                </select>
                            </span>
                            : this.state.position === "4" ?
                            <span className="fourth">
                                <select id="board4">
                                    <option>play</option>
                                    <option>fate</option>
                                    <option>vanquish</option>
                                    <option>1</option>
                                </select>
                            </span>
                            :
                            <span id="board0"></span>
                            }
                            <button onClick= {this.options}>Select</button>
                        </div>
                        <p>Click end turn first</p>
                        </>
                    : <>
                        <button value="QOH" onClick={this.make}>Queen of Hearts</button>
                        <button value="maleficent" onClick={this.make}>Maleficent</button>
                        <button value="prince" onClick={this.make}>Prince John</button>
                        <button value="hook" onClick={this.make}>Captain Hook</button>
                    </>
                    }
                </div>  
                <button value="endTurn" onClick={this.end}>End Turn</button>
            </div>
        );
    }
}

export default CardList;