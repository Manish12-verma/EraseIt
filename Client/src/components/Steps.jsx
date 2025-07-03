import React from 'react'
import {  Upload } from 'lucide-react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      <h1 className='text-center text-2xl  md:text-3xl  lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background <br /> image in seconds</h1>
      <div className='flex items-start flex-wrap gap-14 mt-16 xl:mt-24 justify-center'>
        <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
           <div>
                   
                    <label className="inline-flex  gap-3 px-4 py-3 rounded-xl  bg-gradient-to-r from-blue-700 to-green-600 m-auto" >
                      <img width={23} src={assets.upload_btn_icon} alt="" />
                    </label>
            </div>
          <div>
            <p className='text-xl font-medium'>Upload Image</p>
            <p className='text-gray-600'>Upload your image here</p>
          </div>
        </div>
         <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
           <div>
                    
                    <label className="inline-flex gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-green-600 m-auto">
                      <img width={23}  src={assets.remove_bg_icon} alt="" />
                    </label>
            </div>
          <div>
            <p className='text-xl font-medium'>Remove Background</p>
            <p className='text-gray-600'>Remove the background</p>
          </div>
        </div>
         <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
           <div>
                    
                    <label className="inline-flex  gap-3 px-4 py-3 rounded-xl  bg-gradient-to-r from-blue-700 to-green-600 m-auto">
                      <img width={24} src={assets.download_icon} alt="" />
                    </label>
            </div>
          <div>
            <p className='text-xl font-medium'>Download Image</p>
            <p className='text-gray-600'>Dowload your from image here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps
