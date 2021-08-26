import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      countDown: 10,
      darkClass: 'darkMon'  // default - blacked out
    }
  }

  fetchPokemon() {
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
        // this.lightMon();
      })
      .catch((err) => console.log(err))
  }

  // ***** MY SHIT BELOW *****
  // ***** MY SHIT BELOW *****

  lightMon() {
    const d = new Date();
    console.log("start", d.getTime());
    setTimeout(
      function() {
      this.setState({ darkClass: 'lightMon' });
      console.log("end", d.getTime());
      }.bind(this),
      10000 // 10 seconds
    );
  }

   // ***** MY SHIT ABOVE *****
   // ***** MY SHIT ABOVE *****

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <img className={`pokeImg ${this.state.darkClass}`} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;