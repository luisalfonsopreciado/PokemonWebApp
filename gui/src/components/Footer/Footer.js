import React from 'react'
import classes from './Footer.module.css'
import youtube from '../../resources/logos/youtube.png'
import mail from '../../resources/logos/mail.png'
import twitter from '../../resources/logos/twitter.png'
import instagram from '../../resources/logos/instagram.png'
import github from '../../resources/logos/github.png'
import snapchat from '../../resources/logos/snapchat.png'
const logoWidth=40
const Footer = (props) => {
    return (
        <React.Fragment>
             <div className={classes.Footer}>
        
        <div className={classes.IconContainer}> 
            <ul className={classes.Icons}>
                <li className="link d-inline-block"><a href="https://youtube.com/devoncrawford" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={youtube} width={logoWidth} alt="yotube"className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://twitter.com/DevonCrawford13" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={twitter} width={logoWidth} alt="twitter" className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://www.snapchat.com/add/luis_preciado" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={snapchat} width={logoWidth} alt="snapchat" className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://www.instagram.com/luispre99/" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={instagram} width={logoWidth} alt="instagram" className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://github.com/luigi199922" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={github} width={logoWidth} alt="github" className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://discord.gg/sU2fur9" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={twitter} width={logoWidth} alt="twitter" className="jsx-3670029443"/></a></li>
                <li className="link d-inline-block"><a href="https://patreon.com/devoncrawford" rel="noopener noreferrer" className="LinkU" target="_blank"><img src={mail} width={logoWidth} alt="mail" className="jsx-3670029443"/></a></li>
            </ul>
        </div>
        </div>
        </React.Fragment>
       
    )
}
export default Footer