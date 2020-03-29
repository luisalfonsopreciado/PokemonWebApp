import React , { setState, useEffect }from 'react'
import axios from '../../axios'
import spinner from './spinner.gif'
import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const PokemonListCard = props => {
    const [pokemonImage, setPokemonImage] = setState('')
    const [pokemonId, setPokemonId] = setState('1')
    const [isLoading, setIsLoading] = setState(true)
    const [toManyRequests, setToManyRequests] = setState(false)

    
    // useEffect(() => {
    //     axios.get(props.url).then(res=>{
    //         setPokemonImage(res.data.sprites.front_default)
    //         setIsLoading(false)
    //         setPokemonId(res.data.id)
    //     })
    // }, 
    // [pokemonImage,
    //  pokemonId,
    //  props.url,
    //  setPokemonImage,
    //  setIsLoading,
    //  setPokemonId])

    return (
            <div className="col-md-3 col-sm-6 mt-5" onClick={props.clicked}>
                1
                {/* <div className="card bg-light" style={{border: '2px solid black'}}>
                    <h5 className="card-header bg-danger font-weight-bold">{pokemonId}</h5> 
                        {isLoading? (
                            <img src={spinner} style={{width: '100px', height: '100px' }} className="card-img-top mx-auto rounded d-block mt-2" alt=""></img>
                        ): null 
                        }
                        <Sprite
                         className="card-img-top rounded mx-auto mt-2"
                         alt="Pokemon"
                         src={pokemonImage}
                         style={
                            toManyRequests
                              ? { display: 'none' }
                              : isLoading
                              ? null
                              : { display: 'block' }
                          }
                         onLoad={()=> setIsLoading(false)}
                         onError={() => setToManyRequests(true)}
                         />                
                        <div className="card-body mx-auto">
                            <h3 className="card-title">
                                {props.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))}
                            </h3> 
                            
                        </div>
                </div> */}
            </div>
    )
}
export default PokemonListCard