const Card = (props) => {

    return (
      <div className="cardHolder">
        {props.wordArray.map((word, index) =>{
            
          return <p className='card' key={index}>{word}</p>
        })}
      </div>
    );
  }

  export default Card