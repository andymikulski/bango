import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState() || {
      fontZoom: 2,
      fonts: [
        'luckiest-guy',
        'press-start-2p',
        'lilita-one',
        'slackey',
        'mclaren',
      ],
      selectedFont: 0,
      bingo: {},
    }
  }

  saveState() {
    localStorage.setItem('bango-state', JSON.stringify(this.state));
  }

  getState() {
    return JSON.parse(localStorage.getItem('bango-state') || 'null');
  }

  componentDidUpdate() {
    this.saveState();
  }

  render() {
    const {
      fontZoom,
      selectedFont,
      fonts,
    } = this.state;

    let i = 0;
    let boxes = [];
    'BINGO'.split('')
      .forEach((letter, idx)=>{
        boxes[idx] = [];
        const bingoLetters = this.state.bingo[letter];

        for(i; i < (idx + 1) * 15; i++){
          const isSelected = bingoLetters && bingoLetters[i];

          const letterIndex = i;
          boxes[idx].push(
            <div
              key={i}
              className={`letter ${letter} ${i+1} ${isSelected ? 'is-selected' : ''}`}>
                <span onClick={()=>{
                this.setState({
                  bingo: {
                    ...this.state.bingo,
                    [letter]: {
                      ...this.state.bingo[letter],
                      [letterIndex]: this.state.bingo[letter] && this.state.bingo[letter].hasOwnProperty(letterIndex) ?
                      !this.state.bingo[letter][letterIndex] : true,
                    },
                  },
                })
              }}>{ (i+1) }</span>
            </div>
          );
        }
      })

    return (
      <div className={`App font-${fonts[selectedFont]}`}>
        <div className="App-header">
          <Motion defaultStyle={{ scale: 0 }} style={{ scale: spring(1, {stiffness: 120, damping: 5}) }}>
            {
              ({scale})=>
                <h2 style={{transform: `scale(${scale})`}}>BINGO!</h2>
            }
          </Motion>
        </div>
        <div>
          <button
            onClick={()=>{ this.setState({ bingo: {} }); }}
          >Clear Board</button>
        </div>
        <div>
          <button
            onClick={()=>{
              const numFonts = this.state.fonts.length;
              let nextFont = this.state.selectedFont + 1;
              if (nextFont >= numFonts) {
                nextFont = 0;
              }
              this.setState({
                selectedFont: nextFont,
              });
            }}
          >Change Font</button>
        </div>
        <div>
          <button
            disabled={this.state.fontZoom <= 1}
            onClick={()=>{
              this.setState({
                fontZoom: this.state.fontZoom - 1,
              });
            }}
          >&ndash; Zoom Out</button>

          <button
            disabled={this.state.fontZoom >= 3}
            onClick={()=>{
              this.setState({
                fontZoom: this.state.fontZoom + 1,
              });
            }}
          >+ Zoom In</button>
        </div>
        <div className="wrapper" style={{ fontSize: `${fontZoom}vw` }}>
          {
            boxes.map((letter, idx) =>
              <div key={idx} className="letter-group">
                <div className="letter header">{ 'BINGO'[idx] }</div>
                { letter.map(box => box) }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
