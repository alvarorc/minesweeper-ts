import React from 'react'

interface Props {
  minutes: string
  seconds: string
}

const Clock: React.FC<Props> = function({ minutes, seconds }) {
  return (
    <div>
      {minutes} : {seconds}
    </div>
  )
}

export default Clock
