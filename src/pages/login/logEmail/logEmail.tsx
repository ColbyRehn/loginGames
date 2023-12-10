import React from "react";
import './logEmail.scss';
import { useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom'


const LogEmail:React.FC = () => {
  const numRows = 10;
  let logEmail = localStorage.getItem('regEmail')
  let numCols = 0
  if (logEmail) {
    numCols = logEmail.length
  }

  const [gridEelements,setGridElements] = useState<Array<string>>(Array(numRows * numCols).fill(""))
  const [trackingcoordinate,setTrackingCoordinate] = useState<[number, string]>([0, "🤡"])
  const [aquiredEmails, setaquiredEmails] = useState<string>("")
  const [freeToMove,setupFreeToMove] = useState<Boolean>(true)
  const shuffle = (word:string) => {
      const a = word.split(""),
          n = a.length;

      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      return a.join("");
  }

  useEffect(() => {
    // Toggle free to move
    const intervalId = setInterval(() => {
        setupFreeToMove(prevInput => !prevInput);
    },1000);
    return () => clearInterval(intervalId);
}, [freeToMove])


  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedGredElements = Array(numRows * numCols).fill("")
    //   for (let i = gridEelements.length -1; i >= 0 ; i--) {
    //     if (gridEelements[i] !== "") {
    //       if (i + numCols >= gridEelements.length || gridEelements[i + numCols] !== "") {
    //         updatedGredElements[i] = gridEelements[i]
    //       } else {
    //         updatedGredElements[i + numCols] = gridEelements[i];
    //     }
    //   }
    
    // Clear + drop logic
      for (let y = numRows -1 ; y >= 0 ; y--) {
        let dropped = false
        let filled = true
        let word = ""
        for (let x = numCols -1; x >= 0; x--) {
            const index = x + y * numCols
            if (gridEelements[index] !== "") {
                if (index + numCols >= gridEelements.length || gridEelements[index + numCols] !== "") {
                  updatedGredElements[index] = gridEelements[index]

                  word = word.concat(gridEelements[index])
                } else {
                  updatedGredElements[x + numCols] = gridEelements[index];
                  dropped = true
                } 
            } else {
                filled = false
            }
        }
        if (dropped === false && filled === true){
            setaquiredEmails(word.split('').reverse().join(''));
            console.log(word.split('').reverse().join(''))
        }

      }
      // drop the tracking coordinates
      if (trackingcoordinate[0] + numCols >= gridEelements.length || gridEelements[trackingcoordinate[0] + numCols] !== "") {
        // settle down
        updatedGredElements[trackingcoordinate[0]] = trackingcoordinate[1]
        if (updatedGredElements[0] !== "") {
          window.alert("Game Over! Refresh the page to enter your email");
          
        }
          setTrackingCoordinate([0,shuffle(logEmail?logEmail:"?")[0]])

      } else {
        setTrackingCoordinate(prevState => [prevState[0] + numCols, prevState[1]]);
      }
      setGridElements(updatedGredElements)
        
    },400);
    return () => clearInterval(intervalId);
}, [gridEelements, aquiredEmails])

const handleKey = useCallback((e:any) => {
  console.log(`user has pressed ${e.key}`);
  console.log(freeToMove)
  if(freeToMove){
    if (e.key === 'ArrowRight') {
      setTrackingCoordinate(prevState => [( (gridEelements[prevState[0] + 1] === "")?prevState[0] + 1:prevState[0] ), prevState[1]]);
    }
    if (e.key === 'ArrowLeft') {
      setTrackingCoordinate(prevState => [( (gridEelements[prevState[0] - 1] === "")?prevState[0] - 1:prevState[0] ), prevState[1]]);
    }
  }
}, [freeToMove,trackingcoordinate]);

useEffect(() => {
  document.addEventListener('keydown', handleKey);
  return () => document.removeEventListener('keydown', handleKey);
}, [handleKey]);

    return (
        <section id="logEmail-section">
          <h1>Login: Email</h1>
          <p>Email: {logEmail}<br/>Time for tetris. Score a filled row to input the letters in that order. Make sure it mmatches your email.<br/>
          Use arrow keys Left & Right to move the block. You are not allowed to move the block when it is blue</p>
          {/* <div id="Grid">
            {gridEelements.map((char, index) =>
              <div key={index} className="box" style={{flex: 1 0 eval(1 / numCols)};}}>{char}</div>
            )}
          </div> */}

          {/* <div id = "tetrisContaineer">
            {Array(7).fill("").map((_,index)=>(
            <p>{index}</p>
            ))}
          </div> */}
          <div id="tetrisContainer">
            {Array(numRows).fill("").map((_, y) => (
                <div id="row" key={y}>
                  {Array(numCols).fill("").map((_, x) => (
                      <>
                        { trackingcoordinate[0] ===  x + y* numCols ?
                          (freeToMove ?
                          <div className="box-heighlight" key={x}>{trackingcoordinate[1]}</div>
                          :
                          <div className="box-block" key={x}>{trackingcoordinate[1]}</div>
                          )
                          :
                          <div className="box" key={x}>{gridEelements[x + y* numCols]}</div>
                        }
                      </>
                  ))}
                </div>
            ))}
            </div>
          <p>Your scored email: {aquiredEmails}</p>
          <>
            {aquiredEmails === logEmail?
              <Link to={`/login/captcha`} className="link" >Next</Link>
              :
              <p>You're nearly there I think 😏</p>
            }
            
          </>
          

        </section>
    );
}

export default LogEmail;