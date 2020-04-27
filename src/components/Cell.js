import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Cell = props => {
  const [classname, setClass] = useState('off');
  const { selectedInstrument, row, col } = props;

  useEffect(() => {
    selectedInstrument(classname, row, col);
  }, [classname, selectedInstrument, row, col]);

  function toggleClass() {
    (classname === 'off') ? setClass('on') : setClass('off');
  }

  return (
    <CellWrapper 
      active={classname}
      currentColumn={props.currentColumn}
      onClick={toggleClass}>
    </CellWrapper>
  );
}

export default Cell;

const CellWrapper = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  display: inline-block;
  border: 1px solid ${(props) => props.currentColumn};
  margin: 2px;
  box-sizing: border-box;
  border-radius: 20%;
  background-color: ${(props) => props.active ===  'on' ? 'grey' : 'white'};
`;