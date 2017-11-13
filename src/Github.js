import React, { Component } from 'react';
import Profile from './Profile';
import Search from './Search';

const API = 'https://api.github.com/users'
class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: 'RohitThorat95',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: ''
    };
  }

  gProfile(username){
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json() )
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      })
    })
    .catch((error) => console.log('THere was a problem in fetching data'))
  }

  componentDidMount(){
    this.gProfile(this.state.username);
  }

  render(){
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.gProfile.bind(this)} />
          <Profile userData={this.state}/>
        </section>
      </div>
    );
  }
}

export default Github;
