import React, { Component } from "react";
import { connect } from "react-redux";
import { setToken, fetchUser } from "../dataHandler/store/actions/spotify";
import CurrPlaying from "../containers/currPlaying/currPlaying";
import MainSection from "../containers/mainSection/mainSection";
import WebPlaybackReact from "../components/spotify/webPlayback";
import Top from "../components/topBar/Top";
import PlayBox from "../components/playBox/playBox";

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends React.Component {
  state = {
    playerLoaded: false,
    access_token: null,
  };

  componentDidMount() {
    const { roomKey, access_token } = this.getHashParams();
    this.setState({ ...this.state, access_token, roomKey });
    this.props.setToken(access_token);
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    let webPlaybackSdkProps = {
      playerName: "Alltunes App",
      playerRefreshRateMs: 1000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.access_token,
      onPlayerLoading: () => {},
      startStatePolling: () => {},
      onPlayerWaitingForDevice: () => {
        this.setState({ playerLoaded: true });
      },
      onPlayerError: (e) => {
        console.log(e);
      },
      onPlayerDeviceSelected: () => {
        this.setState({ playerLoaded: true });
      },
    };
    return (
      <div class="main">
        <WebPlaybackReact {...webPlaybackSdkProps}>
          <CurrPlaying />
          <MainSection />
        </WebPlaybackReact>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.sessionReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
