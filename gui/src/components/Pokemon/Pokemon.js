import React, {Component} from 'react'
import classes from './Pokemon.module.css'
import {TYPE_COLOR} from './PokemonConstants'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Pokemon  extends Component { 

    componentDidMount(){
        this.props.onLoadPokemon(this.props.match.params.id)
    }

    render(){
        let card = <p>Loading</p>
        if(!this.props.loading && this.props.pkm){
            card = (
                <div className={classes.Card}> 
                <div className={classes.CardHeader}> 
                    <div className={classes.Row}>
                        <div className={classes.Col2}>
                            <div className={classes.Id}>
                            <h5>{this.props.pkm.id}</h5>
                            </div>
                        </div>
                        <div className={classes.Col10}>
                            <div className={classes.Types}>
                                {this.props.pkm.types.map((type) => (
                                    <span
                                    key={type}
                                    className='badge badge-primary badge-pill mr-1'
                                    style={{backgroundColor: `${TYPE_COLOR[type]}`}}
                                    >
                                        {type.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))}
                                    </span>
                                ))
                                }
                            </div>
                        </div>                            
                    </div>                 
                </div>
                <div className="card-body">                
                    <div className="row align-items-center" >
                        <div className="col-md-3">
                            <img  src={this.props.pkm.imageURL} className='card-img-top rounded mx-auto mt-2' alt="" />
                        </div>
                        <div className="col-md-9">
                                <h4 className="mx-auto">{this.props.pkm.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))}</h4>                       
                                {this.props.pkm.stats.map((stat,key) =>                                
                             <div key ={key} className="row align-items-center">
                             <div className="col-md-3">
                                 <p>{stat.stat.name}</p>
                            </div>                               
                            <div className="col-md-9">
                                     <div className="progress">
                                         <div className="progress-bar"
                                        //  role="progressBar"
                                         style={{
                                             width: `${stat.base_stat}%`
                                         }}
                                         aria-valuenow="50"
                                         aria-valuemin="0"
                                         aria-valuemax="100"
                                         >
                                         <small>
                                             {stat.base_stat}
                                         </small>
                                         </div>
                                     </div>
                                </div>                           
                             </div>                  
                             )}                   
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col-6 ">
                                        <br/>
                                        <strong>Attributes</strong>
                                        <p>Height: {this.props.pkm.height}</p>
                                        <p>Weight: {this.props.pkm.weight}</p>                                   
                                </div>
                                <div className="col-6">
                                    <strong>Abilities</strong>
                                        {this.props.pkm.abilities.map((ability,key) =>{
                                        return <p key={key}>{ability.ability.name}</p>
                                        })}
                                    <p>Base Experience: {this.props.base_experience}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
            )
        }
        return (
            <div className={classes.Pokemon}>
                {card}
            </div>          
        )
    }
   
}
const mapStateToProps = state =>{
    return {
        pkm : state.pokemon.pokemon,
        loading: state.pokemon.loading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadPokemon: (id) => dispatch(actions.fetchPokemonById(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pokemon)
