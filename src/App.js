import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { fromEvent } from "rxjs";

const ScrollContext = createContext({ scrollObserver: undefined })

let counter = 0;

function RenderCounter(props) {
  const { name } = props
  const { scrollObserver } = useContext(ScrollContext)
  useEffect(() => {
    console.log('subscribe')
    const subscription = scrollObserver.subscribe(e => console.log(`${name} counter`, e))

    return () => {
      console.log('unsubscribe')
      subscription.unsubscribe()
    }
  }, [scrollObserver, name])
  counter = counter + 1
  return (
    <div>{name} counter: {counter}</div>
  )
}

function App() {
  const [, reRender] = useState()
  const scrollObserver = useMemo(() => fromEvent(window, 'scroll'), [])

  return (
    <ScrollContext.Provider value={{ scrollObserver }}>
      <div className="App" style={{ height: 1000 }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => reRender({})}>click re-render</button>
          <RenderCounter name={'1'} />
          <RenderCounter name={'2'} />
        </header>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
