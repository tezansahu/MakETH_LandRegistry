import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'


function RegDiv(props){
    if (!props.show_reg){
        return(
            <div id="contest">
                [Options to contest for this land]  
            </div>
        )
    }

    return(
        <div id="register_details">
            [Options to regsiter this land]  
        </div>
    )
}
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           // state variables
           acc: "",
           land_addr:"",
           land_area:0,
           show_reg:false,
        }

        this.handleShowReg = this.handleShowReg.bind(this)
  
        if(typeof web3 != 'undefined'){
           console.log("Using web3 detected from external source like Metamask")
           this.web3 = new Web3(web3.currentProvider)
        }else{
           console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
           this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
        
        
        const land_reg_contract = web3.eth.contract(
            [
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_landAddress",
                            "type": "bytes"
                        },
                        {
                            "name": "_area",
                            "type": "uint256"
                        }
                    ],
                    "name": "registerLand",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_arg",
                            "type": "uint256"
                        }
                    ],
                    "name": "setValueMultiplier",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "_landAddress",
                            "type": "bytes"
                        },
                        {
                            "indexed": false,
                            "name": "_area",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "registerLandEvent",
                    "type": "event"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_landAddress",
                            "type": "bytes"
                        },
                        {
                            "name": "_area",
                            "type": "uint256"
                        }
                    ],
                    "name": "checkLandAvailable",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "lands",
                    "outputs": [
                        {
                            "name": "landAddress",
                            "type": "bytes"
                        },
                        {
                            "name": "area",
                            "type": "uint256"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        )
        this.state.land_reg_contract_instance = land_reg_contract.at("0x908302fc53858390f1c98a2d57a2302ad7d51b13")
        
    }

    componentDidMount(){
        
        this.updateState()
        this.setupListeners()
        
        // setInterval(this.updateState.bind(this), 7e3)
    }

    updateState(){
        web3.eth.getAccounts((err, resp)=>{
            if (resp != null){
                this.setState({
                    acc:resp[0]
                })
                console.log(resp)
            }

        })
    }

    handleShowReg(){
        this.setState({show_reg: true})
    }

    setupListeners(){
        let check_btn = this.refs['available_btn']
        check_btn.addEventListener('click', event => {
            let addr = this.refs["land_addr"].value
            let area = this.refs["land_area"].value
            console.log(addr, area)
            this.state.land_reg_contract_instance.checkLandAvailable(addr, area, (err, resp)=>{
                console.log(err, resp)
                if (err == null){
                    if (resp == true){
                        alert("This land is available!!")
                        this.handleShowReg()
                    }
                    else{
                        alert("This land is NOT available!!")
                    }
                }
            })
            
        })
    }


    render(){
        return(
            
            <div>
                
                <div id="acc_info">
                    <b>Account: </b> {this.state.acc}
                </div>
                <br></br>
                <div className="col-lg-12">
                    <label>
                        <b>Land Address: </b><input ref="land_addr" type="text" placeholder={this.state.land_addr}></input>
                    </label>
                    <br></br>
                    <label>
                        <b>Land Area: </b><input ref="land_area" type="number" placeholder={this.state.land_area}></input> km<sup>2</sup>
                    </label> 
                    <br>
                    </br>   
                    <button className="check_avail_btn" ref="available_btn">Check Availability</button>
                    <br></br>
                    <hr />
                    <RegDiv show_reg = {this.state.show_reg} />
                    
                        
                </div>


            </div>
            
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
 )
