import React, {Component} from 'react';
import  {Modal,Button,Row,Col,Form} from 'react-bootstrap';


import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/SnackBar';

export class AddProfModal extends Component{
    constructor(props){
        super(props);


        this.state={snackbaropen:false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();

    //    Post metoda
        fetch('https://localhost:44353/service/professor',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProfessorID:null,
                ProfessorName: event.target.ProfessorName.value,
                ProfessorSurname: event.target.ProfessorSurname.value ,
                ProfessorSubject: event.target.ProfessorSubject.value ,
                Date_Time:event.target.Date_Time.value 
                
            })
        })
        .then(res=> res.json())
        .then((result) =>
        {
            //alert(result);
            this.setState({snackbaropen:true,snackbarmsg:result});
        },
        (error)=>{
           // alert('Failed')
           this.setState({snackbaropen:true,snackbarmsg:'Failed'});
        })
    }


    render(){
        return(
            <div className="container">

    <Snackbar
    anchorOrigin={{vertical:'center', horizontal:'center'}}
    open = {this.state.snackbaropen}
    autoHideDuration = {3000}
    onClose = {this.snackbarClose}


        message = {<span id="message-id">{this.state.snackbarmsg}</span>}
    action = {[
    <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
        x
    </IconButton>
    ]}
    />


            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-danger">
         Profesor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {/* Add form fields ,dodavanje gumba za novog profesora ...*/}   
            
        <Row>

        <Col sm={6}>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="ProfessorName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" name="ProfessorName" required placeholder="ProfessorName"/>
        </Form.Group>

        <Form.Group controlId="ProfessorSurname">
        <Form.Label>Surname:</Form.Label>
        <Form.Control type="text" name="ProfessorSurname" required placeholder="ProfessorSurname"/>
         </Form.Group>


         <Form.Group controlId="ProfessorSubject">
         <Form.Label>Subject:</Form.Label>
         <Form.Control type="text" name="ProfessorSubject" required placeholder="ProfessorSubject"/>
        </Form.Group>

        <Form.Group controlId="Date_Time">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="text" name="Date_Time" required placeholder="Date_Time"/>
        </Form.Group>

       
       
       
       


        <Form.Group>
        <Button variant="danger" type="submit">Add Professor</Button>
        </Form.Group>
        </Form>
        </Col>
        </Row>


        

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>
        );
    }
}