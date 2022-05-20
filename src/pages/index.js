import Head from 'next/head'
import { resetServerContext } from 'react-beautiful-dnd'
import * as React from 'react'
import { SortViewer } from '../components/sort-viewer'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>UltraFreshSorting</title>
      </Head>
      <SortViewer />
    </React.Fragment>
  )
}

export function getServerSideProps() {
  resetServerContext()
  return { props: {} }
}
