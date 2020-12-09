import React from 'react';
import './landing.css';
import {withRouter} from 'react-router-dom';

import querystring from "querystring";

import SpotifyWebApi from "spotify-web-api-js";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var client_secret = "ffdf9085c89a4cdebb7012ebdac175b4"; // Your secret
var redirect_uri = "http://localhost:3000/hostroom/"; // Your redirect uri
var scope = 'user-read-private user-read-email user-read-playback-state';
const spotifyApi = new SpotifyWebApi();

class Landing extends React.Component {
    nextPath(path) {
        this.props.history.push(path);
      }

      constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
          spotifyApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
        };
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

      login() {
        var redirect =
          "https://accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "token",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
          });
        return redirect;
        }

    render() {
        return (
            <section>
                <div id="titleText" title="titleText" class="titleText">AllTunes</div><br></br><br></br>
                <div id="bodyText" title="bodyText" class="bodyText">Please choose whether you will like to create a new room as a DJ, or join a room as a Listener.</div><br></br><br></br>
                <div class="button_cont" align="center"><a type="button" class="buttoncss" href="" target="_blank" rel="nofollow noopener" href={this.login()}>Host a room</a></div><br></br>
                <div class="button_cont" align="center"><a type="button" class="buttoncss" href="" target="_blank" rel="nofollow noopener">Join a room</a></div>
            </section>
        );
        
    }
}

export default withRouter(Landing)