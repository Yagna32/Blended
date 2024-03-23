import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/black_logo.png'
import github_icon from '../Assets/icons8-github-48.png'
import email_icon from '../Assets/icons8-email-48.png'
import linkedin_icon from '../Assets/icons8-linkedin-48.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>BLENDED</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-socials-icon">
            <div className="footer-icon-container">
            <a href="https://github.com/Yagna32" target='_blank' rel='noreferrer'><img src={github_icon} alt="" /></a>
            </div>
            <div className="footer-icon-container">
            <a href="https://www.linkedin.com/in/yagna-patel-828425230/" target='_blank' rel='noreferrer'><img src={linkedin_icon} alt="" /></a>
            </div>
            <div className="footer-icon-container">
                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=yagnapatelhirenk@gmail.com" target='_blank' rel='noreferrer'><img src={email_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2023 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer