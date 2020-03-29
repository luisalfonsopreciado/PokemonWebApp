import React from 'react'
import axios from 'axios'
import spinner from './spinner.gif'
import styled from 'styled-components';
import Button from '../../components/UI/Button/Button'

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

export default class PokeCard extends React.Component{
    state ={
        img: '',
        pokemon:'', 
        imageLoading: true,  
        toManyRequests: false,   
    }

    componentDidMount(){
        axios.get(this.props.url).then(res=>{
            this.setState({
                pokemon: res.data,  
                img: res.data.sprites,
                id: res.data.id
            })      
        })
    }
    
    render(){
        return(
            <div className="col-md-3 col-sm-6 mt-5" >
                <div className="card bg-light" >
                    <h5 className="card-header bg-danger font-weight-bold">{this.state.pokemon.id}</h5>
                        
                        {this.state.imageLoading ? (
                            <img  src={spinner} style={{width: '100px', height: '100px' }} className="card-img-top mx-auto rounded d-block mt-2" alt=""></img>
                        ): null 
                        }
                        <Sprite
                         className="card-img-top rounded mx-auto mt-2"
                         alt="Pokemon"
                         src={this.state.img.front_default}
                         style={
                            this.state.toManyRequests
                              ? { display: 'none' }
                              : this.state.imageLoading
                              ? null
                              : { display: 'block' }
                          }
                         onLoad={()=>this.setState({imageLoading:false})}
                         onError={() => this.setState({ toManyRequests: true })}
                         />
                       
                       
                        <div className="card-body mx-auto text-center">
                            <h3 className="card-title">
                                {this.props.pokemon.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))}
                            </h3>
                            <div className="mt-3">
                                <Button clicked={this.props.showModal} btnType="Info">Quick View</Button>
                                <Button clicked={this.props.pokemonSelect} btnType="Danger">Detail View</Button>
                            </div>
                        </div>
                </div>
                
            </div>
        );
    }
}













