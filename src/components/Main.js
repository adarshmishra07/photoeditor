import React,{useState} from 'react'
import ImageUpload from './ImageUpload'
import Editor from './Editor'
 
function Main() {
    const [image , setImage] = useState()
    return (
        <>        
            {!image && <ImageUpload setImage={setImage}/>}
            {image && <Editor image={image} setImage={setImage}/>}
        </>
    )
}

export default Main
