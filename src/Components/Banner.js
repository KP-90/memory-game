import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Banner = (props) => {
    const nav = useNavigate()

    const handleRoute = (e) => {
        if(e.target.value === "infinite" && window.location.pathname != "memory-game/infinite") {
            nav("./infinite")
            return
        }
        else if (window.location.pathname != "/memory-game") {
            nav("/memory-game")
        }
        else {
            props.handleChange(e)
        }
    }

    // Set the difficulty selector to have 'infinite' selected
    useEffect(() => {
        console.log(window.location.pathname)
        if(window.location.pathname === "/memory-game/infinite") {
            document.querySelector("#difficulty").value = "infinite"
        }
    }, [window.location.pathname])

    return (
        <div className='banner'>
            <></>
            <h1 className='title'>Memory</h1>
            <select className='difficulty' id='difficulty' onChange={handleRoute}>
              <option value="easy">easy</option>
              <option value="medium">medium</option> 
              <option value='hard'>hard</option>
              <option value='infinite'>infinite</option>
            </select>
        </div>
    )
}

export default Banner