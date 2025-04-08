import React from 'react'
import Hero from '../../components/Hero/Hero'
import Testimonials from '../../components/Testimonials/Testimonials'
import Contact from '../../components/Contact/Contact'

const Home = ({setLogin}) => {
  return (
    <div>
      <Hero setLogin={setLogin}/>
      <Testimonials/>
      <Contact/>
      
    </div>
  )
}

export default Home
