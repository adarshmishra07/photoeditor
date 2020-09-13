import React from 'react'

function ImageUpload({setImage}) {
    return (
        <div className="wrapper">
        <h1 className="title">Photo Editor Ultra Lite Pro Max</h1>
        <label className="largeFile">
            <input type="file" id="file" onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))} accept="image/*"/>
        </label>
        </div>
    )
}

export default ImageUpload
