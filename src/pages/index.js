import Head from 'next/head'
import * as React from 'react'
import { SortViewer } from '../components/sort-viewer'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>SuperFreshSorting</title>
      </Head>
      <SortViewer />
    </React.Fragment>
  )
}
