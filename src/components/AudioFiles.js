import React, { useRef, createRef, useEffect } from 'react';
import { resource } from  '../resources/resource';

const AudioFiles = (props) => {
  const elRef = useRef([...Array(resource.length)].map(() => createRef()));

  useEffect(() => {
    // Trigger only on click
    if(Object.entries(props.playInstrument).length > 0) {
      if (props.playInstrument.playSound !== null && props.playInstrument.selected === "on") {
        elRef.current[props.playInstrument.playSound].current.currentTime = 0;
        elRef.current[props.playInstrument.playSound].current.play();
      };
    }

    // Play the whole Column
    if (props.button === 'play' && props.currentColumn >= 0){
      props.playColumn.forEach((instrument, i) => {
        if (instrument[props.currentColumn].playSound !== null && instrument[props.currentColumn].selected === "on") {
          elRef.current[instrument[props.currentColumn].instrument].current.currentTime = 0;
          elRef.current[instrument[props.currentColumn].instrument].current.play();
        }
      })
    }
  });

  return (
    <React.Fragment>
      {resource.map((audio, i) => (
        <audio
          id={`audio-${audio.instrument}`}
          key={`audio-${audio.instrument}`}
          preload="auto"
          ref={elRef.current[i]}
        >
          <source src={audio.sound} type="audio/mp3" />
        </audio>
      ))}
    </React.Fragment>
  );
}

export default AudioFiles;