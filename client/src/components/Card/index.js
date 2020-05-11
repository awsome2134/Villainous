import React from "react";

class Card extends React.Component{
    render (){

        return(
            <div className="card">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
                <p>{this.props.type2}</p>
            </div>
        );
    }
}

export default Card;