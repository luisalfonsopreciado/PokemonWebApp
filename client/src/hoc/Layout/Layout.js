import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import MainContainer from "../../components/MainContainer/MainContainer";
import BaseRouter from "../../routes";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: true,
  };

  sideDrawerCloser = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloser}
        />
        <MainContainer>
          <BaseRouter />
        </MainContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
