import React from "react";
import memesData from "./memesData";

function Meme(){

    let [meme, setMeme] = React.useState({
        imageUrl:"http://i.imgflip.com/1bij.jpg",
        topText:"",
        bottomText:""
    })

    let [allMemes, setAllMemes] = React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function getRandomImage(e){
        e.preventDefault()
        let randomIndex = Math.floor(Math.random() * allMemes.length)
        let image = allMemes[randomIndex].url
        setMeme(prev => {
            return {
                ...prev,
                imageUrl:image
            }
        })
    }

    function handleMeme(event){
        let {name,value} = event.target
        setMeme(prev => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    return (
        <div>
            <div className="flex-container">
            <form>
                
                <div className="input-buttons">
                    <input type="text" placeholder="Enter Text1" name="topText" value={meme.topText} onChange={handleMeme}/>
                    <input type="text" placeholder="Enter Text2" name="bottomText" value={meme.bottomText} onChange={handleMeme}/>
                </div>
                <button className="select-image-button" onClick={getRandomImage}>Select Image</button>
            </form>
            <div className="meme">
            <img className="meme-image" src={meme.imageUrl} alt="" />
            <h3 className="first-txt">{meme.topText}</h3>
            <h3 className="second-txt">{meme.bottomText}</h3>
            </div>
            </div>
        </div>
    )
}

export default Meme;