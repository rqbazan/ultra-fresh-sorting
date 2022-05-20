import * as React from 'react'
import { createLocalDB } from '../lib/local-db'

export function usePersistenceState({ initialValue, ...dbOptions }) {
  const [localDB] = React.useState(() => createLocalDB(dbOptions))
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(localDB.get())
  }, [localDB])

  React.useEffect(() => {
    localDB.save(value)
  }, [localDB, value])

  return [value, setValue]
}
