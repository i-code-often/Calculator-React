import './Calculator.css';
import { useState } from 'react';

function Calculator() {

  const [screenText, setScreenText] = useState(0);
  const [operator, setOperator] = useState(null);
  const [prevNum, setPrevNum] = useState('');
  const [nextNum, setNextNum] = useState('');

  const operatorClickHandler = (event) => {
    if(nextNum) return;
    setOperator(event.target.textContent);
    setScreenText(0);
  };
  
  const numberClickHandler = (event) => {
    const num = event.target.textContent;
    if(operator){
      setScreenText(nextNum + num);
      setNextNum(n=>n+num);
    }
    else{
      setScreenText(prevNum + num);
      setPrevNum(n=>n+num);
    }
  };

  const calculateHandler = () => {
    console.log(prevNum, nextNum, operator);
    let result;

    if(!operator) return;

    if(operator==='+') result = +prevNum + +nextNum;
    else if(operator==='-') result = +prevNum - +nextNum;
    else if(operator==='*') result = +prevNum * +nextNum;
    else if(operator==='/') result = +prevNum / +nextNum;

    setOperator(null);
    setPrevNum(String(result));
    setNextNum('');
    setScreenText(result);
  };

  const clearHandler = () => {
    if(operator){
      setScreenText(nextNum.slice(0, -1));
      setNextNum(n=>n.slice(0, -1));
    } else{
      setScreenText(prevNum.slice(0, -1));
      setPrevNum(n=>n.slice(0, -1));
    }
  };


  return (
    <div className="container">
      <div className="screen"><span className="op">{operator ? `(${operator})` : ''}</span>{screenText ? screenText : '0'}</div>
      <div className="keys">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(ele=>{
          return <button onClick={numberClickHandler}>{ele}</button>;
        })}
        <button onClick={operatorClickHandler}>*</button>
        <button onClick={operatorClickHandler}>/</button>
        <button onClick={operatorClickHandler}>+</button>
        <button onClick={operatorClickHandler}>-</button>
        <button onClick={calculateHandler} className="equals-to-btn">=</button>
        <button onClick={clearHandler} className="remove">DEL</button>
      </div>
    </div>
  )
}

export default Calculator;