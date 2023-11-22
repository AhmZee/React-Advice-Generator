import React, { useState, useEffect } from 'react';
import patterndDividerM from './images/pattern-divider-mobile.svg';
import patterndDividerD from './images/pattern-divider-desktop.svg';
import diceIcon from './images/icon-dice.svg';
import './App.css';

function App() {
  const [id, setId] = useState('1');
  const [advice, setAdvice] = useState('Remember that spiders are more afraid of you, than you are of them.');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getAdvice = async () => {
    const url = "https://api.adviceslip.com/advice";
    const res = await fetch(url);
    const data = await res.json();
    setId(data.slip.id);
    setAdvice(data.slip.advice);
  };

  return (
    <div className="App">
      <div className="container">
        <h3 className='advice-number'>ADVICE #{id}</h3>
        <h2 className='advice'>"{advice}"</h2>
        <img
          src={screenWidth > 400 ? patterndDividerD : patterndDividerM}
          className='divider'
          alt='divider'
        />
        <br />
        <button onClick={getAdvice}>
          <img src={diceIcon} alt='dice-icon'/>
        </button>
      </div>
    </div>
  );
}

export default App;
