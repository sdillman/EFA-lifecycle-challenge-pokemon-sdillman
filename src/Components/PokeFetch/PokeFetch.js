import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      countDown: 10, // starting value.
      darkClass: 'darkMon',  // default - blacked out
      toggleHideShow: 'hide'
    }
  }


  // TIMER METHODS
  // let's see if breaking these out makes things less gnarly

  checkCountDown() {
    if (this.state.countDown <= 0) {
      this.stopInterval();
      this.setState({
        toggleHideShow: 'show',
        darkClass: 'lightMon'
      });
    }
    if (this.state.countDown > 0) {
      this.setState({ countDown: this.state.countDown - 1 });
    }
  }
  // Kick off the 1 second timer.
  startInterval() {
    this.timer = setInterval(this.checkCountDown.bind(this), 1000);
  }
  // Kill the timer
  stopInterval() {
    clearInterval(this.timer);
  }


  fetchPokemon() {
    this.setState({ darkClass: 'darkMon', toggleHideShow: 'hide' });
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
        this.startInterval();
      })
      .catch((err) => console.log(err))
  }

  // countdown() {
  //   let counter = this.state.countDown;
  //   let interval = setInterval(this.countdown(), 1000);
  //   counter--;
  //   this.setState({countDown: counter})
  //   if (counter <= 0 ) {
  //     clearInterval(interval);
  //     this.setState({ darkClass: 'lightMon', toggleHideShow: 'show' });  //the reveal
  //   }
  // }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display {this.state.countDown}</h1>
        <div className={'pokeWrap'}>
          <img className={`pokeImg ${this.state.darkClass}`} src={this.state.pokeSprite} />
          <h1 className={`pokeName ${this.state.toggleHideShow}`}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;