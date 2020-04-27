import React from 'react';
import styled from 'styled-components';
import { resource } from  '../resources/resource';

import AudioFiles from './AudioFiles';
import Cell from './Cell';
import SequencerControls from './SequencerControls';

const rows = 7;
const initalCols = 10;
const tempoIncrease = 10;
const initialTemp = 150;

class App extends React.Component {
  state = {
    cols: 10,
    currentColumn: 0,
    selectedElements: [...Array(rows)].map(e => Array(initalCols).fill({instrument: null, selected: null})),
    instrument: {},
    tempo: initialTemp,
    button: 'pause',
    interval: 60000 / initialTemp,
  }

  loopit = 0;

  renderGrid = () => {
    let { cols, currentColumn } = this.state;
    let elements = [];

    for (let row = 0; row < rows; row++){
      let rowID = `row-${row}`;
      let colArray = [];

      for (let col = 0; col < cols; col++){
        let colID = `cell-${col}-${row}`;
        colArray.push(<Cell 
          key={colID} 
          id={colID} 
          col={col} 
          row={row}
          instrument={resource[row].instrument}
          selectedInstrument={this.selectedInstrument}
          currentColumn={(currentColumn === col ? 'red' : 'grey')} />
        );
      }

      elements.push(<Row 
        key={row}
        id={rowID}
        numElements={this.state.cols}>
          <Instrument
            key={`image-${row}`}
            src={resource[row].image}
            alt=""
          />
          {colArray}
      </Row>)
    }

    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    );
  }

  selectedInstrument = (selected, row, col) => {
    let { selectedElements } = this.state;

    this.setState({
      instrument:{
        playSound: row,
        selected,
      },
      selectedElements: [...selectedElements, selectedElements[row][col] = {instrument: row, selected: selected }].slice(0, rows)
    }, () => this.resetSound());
  }
  
  onElementChange = event => {
    let col = parseInt(event.target.value) || 1;

    if (event.target.value <= 100) {
      this.setState({
        cols: col,
        selectedElements: [...Array(rows)].map(e => Array(col).fill({instrument: 0, selected: 'off'})),
        currentColumn: -1,
        button: 'pause',
        instrument: {},
      });

      clearInterval(this.loopit);
    }
  }

  playColumn = () => {
    const { cols } = this.state;
    let tempColumn = this.state.currentColumn;

    tempColumn++;

    if (tempColumn > cols - 1) {
      tempColumn = 0;
    }

    this.setState({
      currentColumn: tempColumn
    })
  }

  resetSound = () => {
    this.setState({
      instrument: {},
    });
  }

  increaseTempo = () => {
    let currentTempo = this.state.tempo

    this.setState({
      tempo: (this.state.tempo >= 200) ? 200 : currentTempo += tempoIncrease,
      interval: 60000 / this.state.tempo,
    });
  }

  decreaseTempo = () => {
    let currentTempo = this.state.tempo

    this.setState({
      tempo: (this.state.tempo <= 100) ? 100 : currentTempo -= tempoIncrease,
      interval: 60000 / this.state.tempo,
    });
  }

  setButton = (value) => {
    this.setState({
      button: value
    }, () => {this.sequencePlayPause()} )
  }

  sequencePlayPause = () => {
    clearInterval(this.loopit);

    if (this.state.button === 'play' || this.state.button === 'lowertempo' || this.state.button === 'increasetempo') {
      this.setState({button: 'play'});
      this.loopit = setInterval(this.playColumn, this.state.interval);
    } else {
      clearInterval(this.loopit);
      this.loopit = 0;
    }
  }

  render() {
    return (
      <div className="App">
        <AudioFiles
          playColumn={this.state.selectedElements}
          playInstrument={this.state.instrument}
          currentColumn={this.state.currentColumn}
          button={this.state.button}
        />
        {this.renderGrid()}
        <SequencerControls 
          onChange={this.onElementChange}
          playColumn={this.sequencePlayPause}
          rowNumbers={this.state.cols}
          increaseTempo={this.increaseTempo}
          decreaseTempo={this.decreaseTempo}
          tempo={this.state.tempo}
          setButton={this.setButton}
          button={this.state.button}
        />
      </div>
    );
  };
}

export default App;

const Row = styled.div`
  position: relative;
  display: flex;
  width: ${(props) => `${props.numElements * 50 + 50}px`};
`;

const Instrument = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20%;
  margin: 2px;
`;
