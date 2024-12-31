import IsrailogullariSahit from '../Informations/IsrailogullariSahit'
import Intro from '../components/Intro'

const HomePage = () => {
  return (
    <div className='flex flex-col md:justify-center md:items-center p-3'>
        <Intro/>
        <IsrailogullariSahit/>
    </div>
  )
}

export default HomePage