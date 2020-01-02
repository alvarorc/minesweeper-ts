import React, { useState } from 'react'
import Clock from './Clock'
import useInterval from '../helpers/interval.hook'

const Timer: React.FC = function() {
  const [time, setTime] = useState(0)

  useInterval(() => {
    setTime(time + 1000)
  }, 1000)

  const minutes = new Date(time).getMinutes()
  const seconds = new Date(time).getSeconds()

  return (
    <Clock
      minutes={
        minutes < 10 ? '0'.concat(minutes.toString()) : minutes.toString()
      }
      seconds={
        seconds < 10 ? '0'.concat(seconds.toString()) : seconds.toString()
      }
    />
  )
}

export default Timer
