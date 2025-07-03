import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testiminials = () => {
  return (
    <div>
      <h1 className='mb-12 sm:mb-20 text-center text-2xl  md:text-3xl  lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'>Customer Testimonials</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>
        {testimonialsData.map((testimonial, index) => (
           <div className='bg-white rounded-xl p-6 drop-shadow-md max-w-lg mx-auto hover:scale-105 transition-all duration-700' key={index}>
                <p className='text-4xl text-gray-500'>❞</p>
                <p className='text-sm text-gray-600'>{testimonial.text}</p>
                <div className='mt-5 flex items-center gap-3'>
                    <img className='rounded-xl w-9' src={testimonial.image} alt="" />
                    <div className='flex flex-col '>
                        <p className='font-semibold'>{testimonial.author}</p>
                        <p className='text-sm text-gray-700'>{testimonial.jobTitle}</p>
                    </div>
                </div>
           </div>
        ))}
      </div>
    </div>
  )
}

export default Testiminials
