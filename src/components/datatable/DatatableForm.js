import { useEffect, useState } from 'react'
import './../../styles/datatable.css'
import './../../styles/views.css'

const DatatableForm = ( props ) => {

    const [ cantValueShow, setCantValueShow ] = useState( 10 )
    const [ selectOptionCantPageShow, setSelectOptionCantPageShow ] = useState( [10, 20, 50] )
    const [ searchInput, setSearchInput ] = useState("")

    const filterData = () => {
        props.functSearchInput( searchInput )

    }

    useEffect( () => {
        props.functCantValueShow( cantValueShow )
    }, [ cantValueShow ] )

    const renderSelectOption = () => {
        return selectOptionCantPageShow.map( ( paseShowSelectItem, paseShowSelectIndex ) => <option key={paseShowSelectIndex} value={paseShowSelectItem}>{paseShowSelectItem}</option> )
    }

    return (
        <div className="datatable__form" >
            <div className="datatable__select-wrapper">
                <select className='datatable__select' value={cantValueShow} onChange={ ({target:{value}}) => setCantValueShow( value ) }>
                    {
                        renderSelectOption()
                    }
                </select>
            </div>
            <div>
                <input className='datatable-component__input-search' value={searchInput} onChange={ ( {target:{value}} ) => setSearchInput( value ) }/>
                <button className='datatable-component__button-search' type="button" onClick={ filterData } > Searchs </button>
            </div>
        </div>
            
    )

}

export default DatatableForm