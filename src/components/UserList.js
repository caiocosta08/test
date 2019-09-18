import React from 'react';
import './UserList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      users: [],
      loadingUsers: true,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchUsers = this.searchUsers.bind(this); 
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  searchUsers(){
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
    this.searchUsers()
    .then(this.setState({loadingUsers: false}))
  }

  render() {
      if(this.state.loadingUsers) 
      {
        return (
          <div>
            <h3>Loading...</h3>
        </div>
      );
    }
    else {
      if(!this.state.loadingUser)
      return (
        <div>
          <h1>User list</h1>
          <div> {this.state.users.map(item => (
            <h5 key={item.id}>{item.name}</h5>
          ))} 
          </div>
        </div>
      )
    }
  }
}

export default UserList;
