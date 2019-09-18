import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class ModalPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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



  render() {
    return (
      //{this.props.fields.map( e => alert(e.nome))}
      <div>
        <Button variant="primary" onClick={this.openModal}>
        {this.props.title}
      </Button>

      <Modal centered show={this.state.modalIsOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  onSubmit={() => { alert('Formulário enviado com sucesso')}}>

              {[].map.call(this.props.fieldForms, function(e){
                if(e.name != '') {
                return ( <>
                <Form.Group controlId={e.name}>
                <Form.Label key={e.name + e.type} >{e.name}</Form.Label>
                <Form.Control key={e.name + e.type} type={e.type} placeholder={e.placeholder}></Form.Control>
                <Form.Text key={e.name + e.type}  className="text-muted">{e.description}</Form.Text>
                </Form.Group>  
                </>
                )
                }
            }, null)}
            
          

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default ModalPopup;
