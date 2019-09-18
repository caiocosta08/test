import React from 'react';
import './FormAddUser.css';

class FormEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      modalIsOpen: false,
      users: [],
      loadingUsers: true,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editUser = this.editUser.bind(this);
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
    alert('The update was succesfully completed!');
    this.refreshPage();
  }

  refreshPage(){
    window.location.reload();
  }

  cleanState(){
    this.setState({
      id: '',
      name: '',
      email: '',
      password: ''
    })
  }

  getStateValues(){
    return this.state;
  }

  editUser(newUserData){
    let url = 'http://localhost:8000/update';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: newUserData.id,
        name: newUserData.name.toUpperCase(),
        email: newUserData.email.toUpperCase(),
        password: newUserData.password.toUpperCase()
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON == null) console.log('Error')
      else console.log(responseJSON)
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
    this.getUsers()
    .then(this.setState({loadingUsers: false}))
    .then(() => { 
      this.setState({
        id: this.state.users[0].id,
        name: this.state.users[0].name,
        email: this.state.users[0].email,
        password: this.state.users[0].password,
      })
    })
  }      

  render() {
    if(this.state.loadingUsers) return (<div>Loading...</div>)
    else
        return (
          <div>
            <select value={this.state.id} onChange={
              (event) => {
                let currentId = event.target.value;
                this.setState({id: currentId.toString()})
                this.state.users.forEach(user => {
                  if(currentId.toString() === user.id.toString()){
                    this.setState({
                      name: user.name,
                      email: user.email,
                      password: user.password
                    })
                  }else{
                  }
                })
              } 
            }
            >
              {
                this.state.users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }
            </select>
          <h1>Edit user {this.state.id}</h1>
          <input value={this.state.name} type='text' placeholder='Name' onChange={(event) => {this.setState({name: event.target.value})}} />
          <br /><br />
          <input value={this.state.email} type='text' placeholder='Email' onChange={(event) => {this.setState({email: event.target.value})}} />
          <br /><br />
          <input value={this.state.password} type='password' placeholder='Password' onChange={(event) => {this.setState({password: event.target.value})}} />
          <br /><br />
          
          <button onClick={() => {
            this.editUser(this.getStateValues())
          }
          }>Save</button>
        </div>
      );
  }
}

export default FormEditUser;
