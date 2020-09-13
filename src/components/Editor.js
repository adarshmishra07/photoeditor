import React, { useState } from "react";
import Sliders from "./Sliders";
import Options from "./Options";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    icon: "https://img.icons8.com/ios/000000/brightness-settings.png",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    icon: "https://img.icons8.com/ios-filled/000000/contrast.png",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    icon: "https://img.icons8.com/ios-filled/000000/dew-point.png",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    icon: "https://img.icons8.com/ios-filled/000000/grayscale.png",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    icon: "https://img.icons8.com/ios/000000/circled-s.png",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    icon: "https://img.icons8.com/officel/000000/rgb-circle-3.png",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    icon: "https://img.icons8.com/dotty/50/000000/blur.png",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function Editor({ image,setImage } ) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  function download() {
    var canvas = document.querySelector("#image");
    canvas.height = document.getElementById("dataImage").height;
    canvas.width = document.getElementById("dataImage").width;
    var ctx = canvas.getContext("2d");
    const { filter } = getImageStyle();
    ctx.filter = filter;
    var img = document.getElementById("dataImage");
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    var x = canvas.width / 2 - (img.width / 2) * scale;
    var y = canvas.height / 2 - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    var dt = canvas.toDataURL("image/jpeg");
    document.querySelector("#download").href = dt;
  }

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }

  return (
    <div className="editor">
      <div className="image__container">
        <img src={image} alt="" style={getImageStyle()} id="dataImage" />
      </div>
      <center>
    {/* eslint-disable-next-line */}
        <a id="download" download onClick={download}>
          Download image
        </a>
      </center>
      <div className="white">
        <Sliders
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
        <div className="options">
          {options.map((option, index) => {
            return (
              <Options
                key={index}
                name={option.name}
                icon={option.icon}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            );
          })}
        </div>
      </div>
      <canvas id="image"></canvas>
    </div>
  );
}

export default Editor;
