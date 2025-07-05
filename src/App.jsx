import { useState, useEffect } from 'react'

import './App.css'






function App() {
const [Colors,setColor] = useState({
  1:[0,0,0],
  2:[0,0,0],
  3:[0,0,0],
  4:[0,0,0],
  5:[0,0,0],
})


function Generate(){
    var url = "https://corsproxy.io/?http://colormind.io/api/";
var data = {
	model : "default",
	input : ["N","N","N","N","N"]
}

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
    setColor(palette)
    console.log(palette);
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));

}


useEffect(() => {
  const handleKeyDown = (e) => {
    console.log(e.code);
    Generate();
  };
  Generate()
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);




const divs = Object.entries(Colors).map(([key, value]) => {
 const hex = "#" + [value[0], value[1], value[2]]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
    new ClipboardJS('.color');
  return (
    <div className='color' data-clipboard-target={"#color"+key} style={{ backgroundColor: `rgb(${value[0]},${value[1]},${value[2]})` }} key={key}>
      <div className='labeldiv' id={"color"+key}>{hex}</div>
    </div>
  );
});

  return (
    <>
      <h1>Color Palette Generator</h1>
      <div className="Palette" tabIndex={0} onKeyDown={(e)=>console.log("OK",e)} style={{
      }}>
        {divs}
      </div>
      <button onClick={Generate} style={{margin:"10px"}}>Generate</button>
      <p className='note-label'>Or Just Click SPACE To Generate</p>
            <p className='note-label'>Click on Any Color To Copy</p>
    </>
  )
}

export default App
