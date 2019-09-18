import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {Dados, Restaurantes} from '../data/dados.js';
import cep from 'cep-promise';
import { existsTypeAnnotation } from '@babel/types';

class ModalNewRestaurante extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loading: true,
      restaurantes: [],
      categorias: [],
      nomeR: '',
      categoriaR: '',
      descricaoR: '',
      cepR: '',
      ruaR: '',
      bairroR: '',
      cidadeR: '',
      estadoR: '',
      numeroR: '',
      complementoR: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addRestaurante = this.addRestaurante.bind(this);
  }

  

  UNSAFE_componentWillMount(){

    async function getCategorias() 
    {
      let url = 'http://localhost:8080/projetos/projeto-delivery/lista-categorias.php';
      let response = await fetch(url);
      //console.log(response)
      let data = await response.json()
      //console.log(data)
      return data;
    }
    async function getRestaurantes() 
   {
     let url = 'http://localhost:8080/projetos/projeto-delivery/lista-restaurantes.php';
     let response = await fetch(url);
     //console.log(response)
     let data = await response.json()
     //console.log(data)
     return data;
   }

   getRestaurantes()
      .then(data => {
        
        data.forEach(element => {
          this.setState(state => {
            state.restaurantes.push(element)
          })
        });
        //console.log(data)
      })
      getCategorias()
         .then(data => {
           
           data.forEach(element => {
             this.setState(state => {
               state.categorias.push(element)
             })
           });
           //console.log(data)
         })

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  addRestaurante(nomeRes, descricaoRes, cepRes, categoriaRes, ruaRes, bairroRes, cidadeRes, estadoRes, numeroRes, complementoRes){
    
    if(nomeRes == '' || descricaoRes == '' || cepRes == '' || categoriaRes == '' || ruaRes == '' || bairroRes == '' || cidadeRes == '' || estadoRes == '' || numeroRes == ''){
      alert('O formulário não foi preenchido corretamente.');
      return;
    }else{
      alert('tudo certo')
    }
    
    let url = 'http://localhost:8080/projetos/projeto-delivery/add-restaurante.php';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        nome: nomeRes,
        cep: cepRes,
        id_categoria: categoriaRes,
        descricao: descricaoRes,
        rua: ruaRes,
        bairro: bairroRes,
        cidade: cidadeRes,
        estado: estadoRes,
        numero: numeroRes,
        complemento: complementoRes
      })
    })
    //.then(r =>r.json())
    .then(res => console.log(res))
    .then(console.log('sucesso'))
    .catch(e => console.log('error: ' + e))
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.openModal}>
        {this.props.title}
      </Button>

      <Modal centered show={this.state.modalIsOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            
        <Form  onSubmit={(e) => { e.preventDefault(); alert('Formulário enviado com sucesso')}}>
            
            <Form.Group controlId="exampleForm.RestauranteName">
              <Form.Label>Nome</Form.Label>
              <Form.Control onChange={(e) => this.setState({nomeR: e.target.value})} type="text" placeholder="Digite o nome do restaurante"/>
              <Form.Text className="text-muted">
                Nome do restaurante que irá aparecer para os usuários
              </Form.Text>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.RestauranteName">
              <Form.Label>Descrição</Form.Label>
              <Form.Control onChange={(e) => this.setState({descricaoR: e.target.value})} type="text" placeholder="Digite a descrição do seu restaurante"/>
              <Form.Text className="text-muted">
                Descreva o seu restaurante! Especialidades, horários e tudo que achar importante para o seu cliente.
              </Form.Text>
            </Form.Group>
            
            <Form.Group controlId="exampleForm.RestauranteName">
              <Form.Label>CEP</Form.Label>
              <Form.Control onChange={(e) => {
                let cep_digitado = e.target.value;
                cep(cep_digitado)
                .then(res => {
                  if(res) console.log(res)
                  console.log('Rua: ' + res.street)
                  console.log('Bairro: ' + res.neighborhood)
                  console.log('Cidade: ' + res.city)
                  console.log('Estado: ' + res.state)
                
                  this.setState({
                    cepR: cep_digitado,
                    ruaR: res.street,
                    bairroR: res.neighborhood,
                    cidadeR: res.city,
                    estadoR: res.state
                  })

                })
                .catch(error => {
                  this.setState({
                    //cepR: '',
                    ruaR: '',
                    bairroR: '',
                    cidadeR: '',
                    estadoR: ''
                  })
                })
                }
                  
                  } type="text" placeholder="Digite o CEP"/>
                  <Form.Text className="text-muted">
                    Endereço baseado no CEP / Digite o da sua residência, caso o restaurante funcione apenas com delivery
                  </Form.Text>
              <Form.Text className="text-muted">
                  Rua: {this.state.ruaR} / Bairro: {this.state.bairroR} / Cidade: {this.state.cidadeR} / Estado: {this.state.estadoR}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.RestauranteName">
              <Form.Label>Nº</Form.Label>
              <Form.Control onChange={(e) => this.setState({numeroR: e.target.value})} type="text" placeholder="Digite a descrição do seu restaurante"/>
            </Form.Group>

            <Form.Group controlId="exampleForm.RestauranteName">
              <Form.Label>Complemento</Form.Label>
              <Form.Control onChange={(e) => this.setState({complementoR: e.target.value})} type="text" placeholder="Digite a descrição do seu restaurante"/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Categoria</Form.Label>
              <Form.Control onChange={(e) => this.setState({categoriaR: e.target.value})} value={this.state.categoria} as="select">
                {this.state.categorias.map(item => (
                  <option value={item.id} key={item.id}>{item.nome}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                  Selecione uma categoria que representa a maioria dos seus produtos
              </Form.Text>
            </Form.Group>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => 
            this.addRestaurante(this.state.nomeR, this.state.descricaoR, this.state.cepR, this.state.categoriaR, this.state.ruaR, this.state.bairroR, this.state.cidadeR, this.state.estadoR, this.state.numeroR, this.state.complementoR)
            }>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default ModalNewRestaurante;
