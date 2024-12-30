import React from 'react'
import SurasList from '../components/SurasList'
import IsrailogullariSahit from '../Informations/IsrailogullariSahit'

const HomePage = () => {
  return (
    <div className='flex flex-col md:justify-center md:items-center p-3'>
        <SurasList/>
        <p>Home Page</p>
        <IsrailogullariSahit/>
    </div>
  )
}

export default HomePage