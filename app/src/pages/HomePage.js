import React from 'react'
import SurasList from '../components/SurasList'

const HomePage = () => {
  return (
    <div className='flex flex-col md:justify-center md:items-center p-3'>
        <SurasList/>
        <p>Home Page</p>
    </div>
  )
}

export default HomePage