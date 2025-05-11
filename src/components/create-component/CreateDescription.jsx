import React from 'react'
export default function CreateDescription() {
  return (
    <div className="description-content">
        <div className="title" data-aos="fade-up" data-aos-delay='500'>
            <h1>Create your description</h1>
            <p>Share what makes your place special.</p>
        </div>
        <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
            <div>
                <textarea cols="10" rows="5" value="You'll have a great time at this comfortable place to stay."></textarea>
            </div>
        </div>
    </div>
  )
}
