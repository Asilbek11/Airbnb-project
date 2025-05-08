import React from 'react'
export default function CreateDescription() {
  return (
    <div className="description-content">
        <div className="title" data-aos="fade-up" data-aos-delay='500'>
            <h1>Now, let's give your apartment a title</h1>
            <p>Short titles work best. Have fun with it—you can always change it later.</p>
        </div>
        <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
            <div>
                <textarea cols="10" rows="5"></textarea>
            </div>
        </div>
    </div>
  )
}
