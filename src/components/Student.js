import React,{Component} from 'react'
import {Table} from 'react-bootstrap'

import {Button,ButtonToolbar} from 'react-bootstrap'
import {AddStuModal} from './AddStuModal';
import {EditStuModal} from './EditStuModal';

export class Student extends Component {


    constructor(props){
        super(props);
        this.state={Student:[],addModalShow:false, editModalShow:false}
    }

    componentDidUpdate(){
        this.refreshList();
    }

    // GET API methode
    refreshList(){
        
        fetch ('https://localhost:44353/service/student')
        .then(response=> response.json())
        .then(data =>{
            this.setState({Student:data});
        
        }
        );
     }

      // Refresh bootstrap grid on changes
    componentDidUpdate(){
    this.refreshList();
    }

     // Delete methode 
 deleteStu(stuid)
 {
     if(window.confirm('Are you sure?'))
     {
         fetch ('https://localhost:44353/service/student/' +stuid,{
             method: 'DELETE',
             header:{'Accept':'application/json',
             'Content-Type':'applocation/json'
         }
         })
     }
 }

    render(){

        const {Student,stuid,stujmbag,stuname,stusurname,stugender,stucity,studirection,stuyearofcollage} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(

            <div>
            <Table className="mt-4" striped bordered hover size ="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>JMBAG</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Direction</th>
                        <th>Year of Collage</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {Student.map(stu=>
                    <tr>  {stu.StudentID}
                    <td>{stu.StudentJMBAG}</td>
                    <td>{stu.StudentName}</td>
                    <td>{stu.StudentSurname}</td>
                    <td>{stu.StudentGender}</td>
                    <td>{stu.StudentCity}</td>
                    <td>{stu.StudentDirection}</td>
                    <td>{stu.YearOfCollage}</td>
                    <td>
             <ButtonToolbar>
            <Button
            className="mr-4" variant="primary" onClick={()=> this.setState({editModalShow:true, stuid:stu.StudentID,stujmbag:stu.StudentJMBAG,
                stuname:stu.StudentName,stusurname:stu.StudentSurname,stugender:stu.StudentGender,stucity:stu.StudentCity,
                studirection:stu.StudentDirection,stuyearofcollage:stu.YearOfCollage
            
            })}
            >
                Edit
            </Button>
            <Button className="mr-3" onClick={()=> this.deleteStu(stu.StudentID)} variant="danger">
                Delete
            </Button>


            <EditStuModal
            show = {this.state.editModalShow}
            onHide = {editModalClose}
            stuid = {stuid}
            stujmbag = {stujmbag}
            stuname ={stuname}
            stusurname = {stusurname}
            stugender = {stugender}
            stucity = {stucity}
            studirection = {studirection}
            stuyearofcollage = {stuyearofcollage}
            />

             </ButtonToolbar>
                    </td>
                    </tr>
                        )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='danger' onClick={()=> this.setState({addModalShow:true})}>
                    Add Student
                </Button>
                <AddStuModal
                show={this.state.addModalShow}
                onHide={addModalClose}
                />
            </ButtonToolbar>
            </div>

        )
    }
}