// Displays all the words in their own card style.

const Card = (props) => {


  
    return (
      <div className="cardHolder">
        {props.wordArray.map((word, index) =>{
            
          return <div className="card"  key={index}>
            <p className="word">{word}</p>
            </div>
        })}
      </div>
    );
  }

  export default Card