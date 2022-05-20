import * as React from 'react'

export function useUpdateEffect(effect, deps) {
  const mounted = React.useRef(false)

  React.useEffect(() => {
    if (mounted.current) {
      return effect()
    }
    mounted.current = true
  }, deps)
}
