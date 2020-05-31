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
            handSize: 0
        };

        this.temp=this.temp.bind(this);
    }

    temp(event){
        this.make(event.target.value);
    }

    make(character){
        let deck=this.state.deck;
        let fateDeck= this.state.fateDeck;

        Axios.get(`/api/${character}`)
        .then((processed) =>{
            let data=processed.data.sort(function(a, b){return 0.5 - Math.random()});
            data.map((v) => {
                if(v.type1 === "Deck"){
                    deck.push(v);
                }else{
                    fateDeck.push(v);
                }
            });

            this.setState({deck, fateDeck});
            this.pickUp();
            });
    }

    pickUp(){
        let hand= this.state.hand;
        let deck= this.state.deck;
        let i=this.state.handSize;
        
        if(deck.length === 0){
            let discardPile=this.state.discardPile;
            discardPile.sort(function(a, b){return 0.5 - Math.random()})
            .map((v) =>{
                deck.push(v);
            });
            discardPile=[];
            this.setState({discardPile, deck});
        }

        for(i; i<4; i++){
            let card=deck.pop();
            hand.push({"id":i, "name":card.name, "description":card.description, "type1":card.type1, "type2":card.type2, "play":card.play});
        }
        this.setState({hand, deck, handSize: i});
    }

    discard(id){
        let discardPile= this.state.discardPile;
        let hand=this.state.hand;
        let temp=hand.splice(id, 1);
        discardPile.push(temp[0]);
        let handSize=this.state.handSize;
        handSize -= 1;
        this.setState({hand, handSize}, ()=>{this.pickUp()});
    }

    render(){
        return(
            <div className="cardList">
                {this.state.handSize !== 0 ?
                    this.state.hand.map((v, index) =>
                    <Card key={index} id={index} name={v.name} description={v.description} type1={v.type1} type2={v.type2} play={v.play} discard={(id) => this.discard(id)}/>)
                : <>
                    <button value="QOH" onClick={this.temp}>Queen of Hearts</button>
                    <button value="maleficent" onClick={this.temp}>Maleficent</button>
                    <button value="prince" onClick={this.temp}>Prince John</button>
                    <button value="hook" onClick={this.temp}>Captain Hook</button>
                </>
                }
            </div>  
        );
    }
}

export default CardList;