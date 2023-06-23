import React, { useState } from 'react'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';

const SwapLoader: React.FC = () => {
  return (
        <Player
        autoplay={!false}
        loop={!false}
        controls={false}
        src="https://assets10.lottiefiles.com/packages/lf20_lrjha2vi.json"
        style={{ height: '270px', width: '270px' }}
      />
  )
}

export default SwapLoader
