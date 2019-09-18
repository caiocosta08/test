import React from 'react';

class Dados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listitems: ['item 1', 'item 2', 'item3'],
        restaurantes: [],
        loading: true,
    };

    this.getRestaurantes = this.getRestaurantes.bind(this);
  }

  getRestaurantes(){
    return this.state.restaurantes;
    }

  UNSAFE_componentWillMount(){
    let url = 'http://localhost:8080/projetos/projeto-delivery/lista-de-pedidos.php';

    fetch(url)
    .then(res => res.json())
    .then(item => {
      console.log(item)
      item.forEach(element => {
          this.setState(state => {
              //const restaurantes = state.restaurantes.push(element)
              state.restaurantes.push(element)
          });
          this.setState({loading: false})
      });
    })
    .catch(e => alert('Erro: ' + e))

  }

  componentDidMount(){
      if(!this.state.loading){

      }

    
  }
}

export function Restaurantes(props) {

    let url = 'http://localhost:8080/projetos/projeto-delivery/lista-de-pedidos.php';
    let rest = [];
    fetch(url)
    .then(res => res.json())
    .then(item => {
      console.log(item)
      item.forEach(element => {
          rest.push(element)
          //this.setState({loading: false})
      });
    })
    .catch(e => alert('Erro na função Restaurantes: ' + e))
    return rest;
  }

export default {
    Dados,
    Restaurantes,
};
