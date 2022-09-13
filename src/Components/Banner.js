import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Banner = (props) => {

    return (
        <div className='banner'>
            <></>
            <h1 className='title'>Memory</h1>
            <select className='difficulty' id='difficulty' onChange={props.handleChange}>
              <option value="easy">easy</option>
              <option value="medium">medium</option> 
              <option value='hard'>hard</option>
              <option value='infinite'>infinite</option>
            </select>
        </div>
    )
}

export default Banner