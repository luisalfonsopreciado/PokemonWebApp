import React from "react"
import Footer from '../../components/Footer/Footer'
import MainContainer from '../../components/MainContainer/MainContainer'
import BaseRouter from '../../routes'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const Layout = () => {
    return (
        <React.Fragment>
            <Toolbar />
                <MainContainer>
                <BaseRouter />  
                </MainContainer>    
            <Footer />
        </React.Fragment>
    )
}

export default Layout;