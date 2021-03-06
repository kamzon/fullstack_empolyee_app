import react,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";

import {Button, ButtonToolbar } from "react-bootstrap";
import {AddEmpModal} from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";



export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }
    
    refreshList(){
        fetch('https://localhost:44319/api/employee').
        then(Response => Response.json())
        .then(data => {
            this.setState({emps:data});

        });
    }

    componentDidUpdate(){
        this.refreshList();
    }


    render(){
        const {emps,empid,empname,empdep,empmail,empdate} = this.state;
        let addModelClose = () => this.setState({addModalShow:false});

        let editModelClose = () => this.setState({editModalShow:false});

        return(
            <div>
            <Table className="m-5" striped bordred hover size="sm">
                <thead>
                    <tr>
                        <th>EmployeeID</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>MailID</th>
                        <th>Date of joinin</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {emps.map(emp=>
                        <tr key = {emp.EmployeeID}> 
                            <td>{emp.EmployeeID}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.MailID}</td>
                            <td>{emp.DOJ}</td>
                            <td>
                            <ButtonToolbar>
                                <Button className="mr-5" variant="info"
                                onClick={()=> this.setState({editModalShow:true,empid:emp.EmployeeID,empname:emp.EmployeeName,empdep:emp.Department,empmail:emp.MailID,empdate:emp.DOJ})}
                                > Edit</Button>

                                <EditEmpModal
                                show={this.state.editModalShow}
                                onHide={editModelClose}
                                empid = {empid}
                                empname = {empname}
                                empdep = {empdep}
                                empmail = {empmail}
                                empdate = {empdate}
                                />
                            </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button className="m-5" variant="primary"
                onClick={()=> this.setState({addModalShow:true})}
                > Add Employee</Button>

                <AddEmpModal
                show={this.state.addModalShow}
                onHide={addModelClose}
                />
            </ButtonToolbar>
            </div>  
        )
    }
}