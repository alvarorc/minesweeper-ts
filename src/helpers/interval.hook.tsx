import { useEffect, useRef } from 'react'

function useInterval(callback: Function, delay: number): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const savedCallback = useRef<Record<string, any>>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (
        savedCallback.current &&
        typeof savedCallback.current === 'function'
      ) {
        savedCallback.current()
      }
    }

    const id = setInterval(tick, delay)

    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
