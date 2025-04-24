import React from 'react'
import DisplayHome from './displayhome'
import Displayalbum from './displayalbum';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function () {
  return (
    <>
    <div className='text green'>My sangit</div>
    <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path="/" element={<DisplayHome/>}/>
            <Route path="/album/:id" element={<Displayalbum/>}/>
        </Routes>

    </div>
    </>
  )
}
