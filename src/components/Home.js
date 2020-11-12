import React,{Component} from 'react'

import Vub from '../vub-logo.png'
import '../App.css'

export class Home extends Component {
    
    render(){
        return(
            <div className="m-5 container" >

            <div className="m-4 d-flex justify-content-center">
            < img src={Vub} alt="Vub"  height="145"/>
            </div>

                <h3 className= "m-3 d-flex justify-content-center">Welcome!</h3>
                <h5 className="m-3 d-flex justify-content-center" >Student Web Service</h5>

                 
                
                
                
                 
            </div>
        )
    }

}