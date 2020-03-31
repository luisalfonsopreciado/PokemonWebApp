import React, {Component} from "react"
import PageManager from '../../components/PageManager/PageManager'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import PokeCard from '../PokeCard/PokeCard'
import Modal from '../../components/Modal/Modal'
import Backdrop from '../../components/Backdrop/Backdrop'

class PokeList extends Component{
    state = {
        loading: true,
        displaymodal: false,
    }

    componentDidMount(){
        this.props.getPokemon(this.props.pkm.offset, this.props.pkm.limit)
    }

    pokemonSelectedHandler(name){
        this.props.history.push({pathname: '/pokemon/' + name})
    }

    onViewModal = (pokemon) =>{
        this.props.onQuickViewPokemon(pokemon)
        // this.setState({displayModal: true})
    }
    onRemoveModal = () =>{
        this.props.onRemoveModal()
        // this.setState({displayModal: false})
    }

    render(){
        let PokemonList = null
        if(this.props.pkm.pokemons){
            PokemonList = this.props.pkm.pokemons.map((pokemon, key) =>{
                return <PokeCard
                url={pokemon.url}
                pokemon={pokemon}
                key={pokemon.name}
                data={pokemon}
                pokemonSelect={()=>this.pokemonSelectedHandler(pokemon.name)}
                showModal={this.onViewModal}
                />
            })
        }
        return (
            <div>
                <div className="row container-fluid mx-auto">  
                    {PokemonList}       
                </div>  
                <PageManager 
                    lower={this.props.pkm.offset}
                    upper={964}
                    next={() => this.props.nextPage(this.props.pkm.offset, this.props.pkm.limit)}
                    previous={() => this.props.previousPage(this.props.pkm.offset, this.props.pkm.limit)}/>
                {this.props.displayModal ? <Modal closed={this.onRemoveModal} show={this.props.displayModal} pokemon={this.props.pkm.pokemon}/> : null}
                {this.props.displayModal ? <Backdrop show={this.props.displayModal} /> : null}
            </div>
        )
    }


}

const mapStateToProp = state =>{
    return{
        pkm : state.pokemon,
        displayModal : state.pokemon.displayModal,

    }
}
const mapDispatchToProps = dispatch =>{
    return{
        getPokemon: (upperBound, lowerBound) => dispatch(actions.fetchPokemon(upperBound, lowerBound)),
        nextPage: (upperBound, lowerBound) => dispatch(actions.nextPokemonPage(upperBound, lowerBound)),
        previousPage: (upperBound, lowerBound) => dispatch(actions.previousPokemonPage(upperBound, lowerBound)),
        onQuickViewPokemon : (pokemon) => dispatch(actions.addPokemonToState(pokemon)),
        onRemoveModal : () => dispatch(actions.removePokemonFromState()),
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(PokeList);