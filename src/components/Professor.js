import React,{Component} from 'react'
import {Table} from 'react-bootstrap'

import {Button,ButtonToolbar} from 'react-bootstrap'
import {AddProfModal} from './AddProfModal';
import {EditProfModal} from './EditProfModal';

export class Professor extends Component {

    constructor(props){
        super(props);
        this.state={Professor:[],addModalShow:false, editModalShow:false}
    }

componentDidUpdate(){
    this.refreshList();
}

// GET API methode
    refreshList(){
        
       fetch ('https://localhost:44353/service/professor')
       .then(response=> response.json())
       .then(data =>{
           this.setState({Professor:data});
       
       }
       );
    }

    // Refresh bootstrap grid on changes
    componentDidUpdate(){
        this.refreshList();
    }

    // Delete methode 
    deleteProf(professorid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch ('https://localhost:44353/service/professor/' +professorid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'applocation/json'
            }

            })
        }
    }
    
    render(){
      
    const {Professor,professorid,professorname,professorsurname,professorsubject,date} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-2" striped bordered hover size ="sm">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th>Surname</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {Professor.map(professor=>
                    <tr>  {professor.ProfessorID}
                    <td>{professor.ProfessorName}</td>
                    <td>{professor.ProfessorSurname}</td>
                    <td>{professor.ProfessorSubject}</td>
                    <td>{professor.Date_Time}</td>
                    <td>
             <ButtonToolbar>
            <Button
            className="mr-2" variant="primary" onClick={()=> this.setState({editModalShow:true,professorid:professor.ProfessorID,
                professorname:professor.ProfessorName,professorsurname:professor.ProfessorSurname,
                professorsubject:professor.ProfessorSubject,date:professor.Date_Time})}
            >
                Edit
            </Button>

            <Button className="mr-2" onClick={()=> this.deleteProf(professor.ProfessorID)} variant="danger">
                Delete
            </Button>

            <EditProfModal
            show = {this.state.editModalShow}
            onHide = {editModalClose}
            professorid = {professorid}
            professorname = {professorname}
            professorsurname ={professorsurname}
            professorsubject = {professorsubject}
            date ={date}


            />
             </ButtonToolbar>
                    </td>

                    </tr>
                        )}
                </tbody>

            </Table>

            <ButtonToolbar>
                <Button  variant='danger' onClick={()=> this.setState({addModalShow:true})}>
                    Add Professor
                </Button>

                <AddProfModal
                show={this.state.addModalShow}
                onHide={addModalClose}
                />
            </ButtonToolbar>
            </div>
        )
    }

}