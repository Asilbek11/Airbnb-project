import React from 'react'
import { ImFilesEmpty } from "react-icons/im";
export default function Empty() {
  return (
    <div className='empty-wrapper'>
        <ImFilesEmpty />
        <span>Looks a bit empty in here.</span>
    </div>
  )
}
