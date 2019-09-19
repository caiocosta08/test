import React from 'react';

class FormAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      modalIsOpen: false,
      users: []
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addUser = this.addUser.bind(this);
    this.redirectSuccess = this.redirectSuccess.bind(this);
    this.cleanState = this.cleanState.bind(this);
    this.getStateValues = this.getStateValues.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }


  openModal(){
    this.setState({modalIsOpen: true});
  }

  afterOpenModal(){
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  redirectSuccess(){
    alert('The register was succesfully completed!');
    this.refreshPage();
  }

  refreshPage(){
    window.location.refresh();
  }

  cleanState(){
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  getStateValues(){
    return this.state;
  }

  addUser(newUserData){
    let url = 'http://localhost:8000/register';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: newUserData.name.toUpperCase(),
        email: newUserData.email.toUpperCase(),
        password: newUserData.password.toUpperCase()
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON == null) console.log('Error')
      this.cleanState();
      this.redirectSuccess();
    })
    .catch(error => console.log('Error: ' + error))
  }

  getUsers(){
    let url = 'http://localhost:8000/users';
    
    let i = fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
      responseJSON.forEach(element => {
          this.setState(state => {
            state.users.push(element)
          });
        });
        this.setState({loadingUsers: false})
        return responseJSON;
      })
      .catch(e => alert(e))
      return i; 
      
  }

  UNSAFE_componentWillMount(){
  }

  render() {
        return (
          <div>
          <h1>Add new user</h1>
          <input type='text' placeholder='Name' onChange={(event) => {this.setState({name: event.target.value})}}></input><br /><br />
          <input type='text' placeholder='Email' onChange={(event) => {this.setState({email: event.target.value})}}></input><br /><br />
          <input type='password' placeholder='Password' onChange={(event) => {this.setState({password: event.target.value})}}></input><br /><br />
          
          <button onClick={() => {
            this.addUser(this.getStateValues())
          }
          }>Add</button>
        </div>
      );
  }
}

export default FormAddUser;
