import React from "react";
import "./index.css";
import image from "./cardborder.png";

class Card extends React.Component{
    render (){

        return(
            <div className="card">
                <h3>{this.props.name}</h3>
                <img src={image} />
                <p>{this.props.description}</p>
                <h6>{this.props.type2}</h6>
            </div>
        );
    }
}

export default Card;