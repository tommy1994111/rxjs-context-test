import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { fromEvent } from "rxjs";
import { share } from 'rxjs/operators';

const ScrollContext = createContext({ scrollObserver: undefined })

function RenderCounter(props) {
  const { name } = props
  const { scrollObserver } = useContext(ScrollContext)
  const [positionY, setPositionY] = useState()

  useEffect(() => {
    console.log('subscribe')
    const subscription = scrollObserver.subscribe(() => setPositionY(window.scrollY))

    return () => {
      console.log('unsubscribe')
      subscription.unsubscribe()
    }
  }, [scrollObserver, name])
  return (
    <div>name: {name}; scrollY: {positionY}</div>
  )
}

function App() {
  const [counterAmount, setCounterAmount] = useState(10)
  const scrollObserver = useMemo(() => fromEvent(window, 'scroll'), []).pipe(share())

  console.log('render')

  return (
    <ScrollContext.Provider value={{ scrollObserver }}>
      <div className="App" style={{ minHeight: 1000 }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => setCounterAmount(amount => amount + 1)}>add one counter</button>
          <button onClick={() => setCounterAmount(amount => amount - 1 < 1 ? 1 : amount - 1)}>remove one counter</button>
          {[...Array(counterAmount)].map((_, index) => <RenderCounter name={index} key={index} />)}
        </header>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
