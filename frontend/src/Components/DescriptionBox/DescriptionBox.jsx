import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-nav">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Eum quis assumenda laboriosam ratione, molestias obcaecati, 
                laborum commodi molestiae iure inventore corporis. 
                Architecto, perspiciatis ullam harum quo maxime et facere iusto?
            </p>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ut, 
                nesciunt officia voluptates commodi praesentium placeat, alias quae 
                maxime possimus ex odit! Soluta nemo, 
                quidem laudantium perferendis suscipit ratione nulla.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox