import React from "react";
import Axios from "axios";
import Card from "../Card";

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
    }

    componentDidMount(){
        let deck=this.state.deck;
        let fateDeck= this.state.fateDeck;

        Axios.get("/api/QOH")
        .then((processed) =>{
            let data=processed.data.sort(function(a, b){return 0.5 - Math.random()});;
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
        

        for(i; i<4; i++){
            hand.push(deck.pop());
        }
        this.setState({hand, deck, handSize: i});
    }

    render(){
        return(
            <div>
                {this.state.hand.map((v, index) =>
                    <Card key={index} name={v.name} description={v.description} type1={v.type1} type2={v.type2} play={v.play} />)}
            </div>  
        );
    }
}

export default CardList;