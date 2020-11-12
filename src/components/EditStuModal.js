import React, {Component} from 'react';
import  {Modal,Button,Row,Col,Form} from 'react-bootstrap';


import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/SnackBar';

export class EditStuModal extends Component{
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
        fetch('https://localhost:44353/service/student',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentID: event.target.StudentID.value,
                StudentJMBAG: event.target.StudentJMBAG.value,
                StudentName: event.target.StudentName.value,
                StudentSurname:event.target.StudentSurname.value ,
                StudentGender: event.target.StudentGender.value,
                StudentCity: event.target.StudentCity.value,
                StudentDirection:event.target.StudentDirection.value ,
                YearOfCollage: event.target.YearOfCollage.value
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
        }
        )
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
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {/* Add form fields ,dodavanje gumba za novog studenta ...*/}   
            
        <Row>

     <Col sm={6}>
     <Form onSubmit={this.handleSubmit}>

     <Form.Group controlId="StudentID">
     <Form.Label>ID:</Form.Label>
     <Form.Control type="text" name="StudentID"
     disabled defaultValue={this.props.stuid}
     placeholder="StudentID"/>
     </Form.Group>       

    <Form.Group controlId="StudentJMBAG">
    <Form.Label>JMBAG:</Form.Label>
    <Form.Control type="text" name="StudentJMBAG" required
    disabled defaultValue={this.props.stujmbag}
    placeholder="StudentJMBAG"/>
    </Form.Group>

    <Form.Group controlId="StudentName">
    <Form.Label>Name:</Form.Label>
    <Form.Control type="text" name="StudentName" required
    defaultValue={this.props.stuname}
    placeholder="StudentName"/>
    </Form.Group>

    <Form.Group controlId="StudentSurname">
    <Form.Label>Surname:</Form.Label>
    <Form.Control type="text" name="StudentSurname" required 
    defaultValue={this.props.stusurname}
    placeholder="StudentSurname"/>
    </Form.Group>

    <Form.Group controlId="StudentGender">
    <Form.Label>Gender:</Form.Label>
    <Form.Control type="text" name="StudentGender" required 
    defaultValue={this.props.stugender}
    placeholder="StudentGender"/>
    </Form.Group>

    <Form.Group controlId="StudentCity">
    <Form.Label>City:</Form.Label>
    <Form.Control type="text" name="StudentCity" required
    defaultValue={this.props.stucity}
    placeholder="StudentCity"/>
    </Form.Group>

    <Form.Group controlId="StudentDirection">
    <Form.Label>Direction:</Form.Label>
    <Form.Control type="text" name="StudentDirection" required 
    defaultValue={this.props.studirection}
    placeholder="StudentDirection"/>
    </Form.Group>

    <Form.Group controlId="YearOfCollage">
    <Form.Label>Year of Collage:</Form.Label>
    <Form.Control type="text" name="YearOfCollage" required
    defaultValue={this.props.stuyearofcollage}
    placeholder="YearOfCollage"/>
    </Form.Group>


    <Form.Group>
    <Button variant="danger" type="submit">Update Student</Button>
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