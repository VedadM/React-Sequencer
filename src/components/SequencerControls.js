import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faMinus, faPause } from '@fortawesome/free-solid-svg-icons'

const SequencerControls = (props) => {
  return (
    <ControlBox>
      <ControlLabel htmlFor="rownumber">
        Rows:
      </ControlLabel>
      <ControlInput 
        name="rownumber"
        onChange={props.onChange}
        value={props.rowNumbers}
      />
      <ButtonWrapper
        onClick={() => { props.playColumn(); props.setButton(props.button === 'pause' ? 'play': 'pause') }}
      >
        <FontAwesomeIcon icon={props.button === 'pause' ? faPlay : faPause} />
      </ButtonWrapper>
      <TempoBoxWrapper>
        <ControlLabel htmlFor="tempo">
            Tempo:
        </ControlLabel>
        <ButtonWrapper onClick={() => { props.decreaseTempo(); props.setButton('lowertempo')}}>
            <FontAwesomeIcon icon={faMinus} />
        </ButtonWrapper>
        
        <ControlInput 
            name="tempo"
            value={props.tempo}
            readOnly
        />

        <ButtonWrapper onClick={() => { props.increaseTempo();  props.setButton('increasetempo')}}>
            <FontAwesomeIcon icon={faPlus} />
        </ButtonWrapper>
      </TempoBoxWrapper>

    </ControlBox>
  )
}

export default SequencerControls;

const ControlBox = styled.div`
  border: 1px solid grey;
  max-width: 480px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  border-radius: 12px;
`;

const ControlLabel = styled.label`
  font-family: Source Sans Pro;
  font-size: 15px;
  margin-right: 5px;
`;

const ControlInput = styled.input`
  height: 24px;
  width: 30px;
  font-size: 15px;
  text-align: center;
  font-family: Source Sans Pro;
  border-radius: 5px;
  vertical-align: top;
`;

const ButtonWrapper = styled.button`
  font-size: 1.2rem;
  line-height: 1;
  text-align: center;
  border: 1px solid gray;
  padding: 2px 10px;
  margin: 0px 7px;
  border-radius: 4px;
  height: 29px;
`;

const TempoBoxWrapper = styled.div`
  float: right;
`