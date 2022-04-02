
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react';

import DataTable from 'react-data-table-component';
import './../../styles/views.css'
import timeConver from './../../utils/time'

const RickyAndMortyList = () => {

    const columns = [
        
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Air Date',
            selector: row => row.air_date,
        },
        {
            name: 'Episode',
            selector: row => row.episode,
        },
        {
            name: 'Created',
            selector: row => {
                let dataTime = new Date( row.created )
                return dataTime.toLocaleString()
            },
        },
        {
            name : 'Available Time',
            selector: row => {
                const timeObject = timeConver( row.air_date, row.created )
                return (
                    <div>
                        <span> { timeObject.diffDate } </span>
                        <br/>
                        <span> { timeObject.time }</span>
                    </div>
                )
            },
        }
    ];
    
    const [data, setData] = useState([])
    const [dataOriginal, setDataOriginal] = useState([])
    const [nextUrl, setNextUrl] = useState( true )
    const [url, setUrl] = useState( 'https://rickandmortyapi.com/api/episode' )
    const [ searchInputName, setSearchInputName ] = useState('')
    
    const ExpandedComponent = ({ data }) => <pre>{  data.characters.map( ( character, index ) => <div key={`expanded-component-${index}`}>{character}</div> ) }</pre>;
    
    // const axiosData = ( url ) => {
    //     return axios.get( 'https://rickandmortyapi.com/api/episode' )
    // }

    const getListData = async () => {

        try {

                const response = await axios.get( url )
                setData( valueOld => [ ...valueOld, ...response.data.results ] )
                setDataOriginal( valueOld => [ ...valueOld, ...response.data.results ] )

                const response1 = await axios.get( response.data.info.next )
                
                setData( valueOld => [ ...valueOld, ...response1.data.results ] )
                setDataOriginal( valueOld => [ ...valueOld, ...response1.data.results ] )

                const response2 = await axios.get( response1.data.info.next )
                
                setData( valueOld => [ ...valueOld, ...response2.data.results ] )
                setDataOriginal( valueOld => [ ...valueOld, ...response2.data.results ] )
            
        } catch (error) {
            console.log(error)
        }

    }

    const filterDataList = async () => {

        setData( oldValue => [ ...dataOriginal ] )

        if( searchInputName == "" ) return
            

        let regex = new RegExp( searchInputName, 'gi' )

        let newData = data.filter( ( item ) =>  ( regex.test( item.name ) || regex.test( item.air_date ) || regex.test( item.episode ) || regex.test( item.created )  ) )

        setData( newData )

    }

    useEffect( () => {
        getListData()
    }, [] )
    
    return (
        <div className="container">
            
            <div className='datatable-component' >
                <div className='datatable-component__search'>
                    <input className='datatable-component__input-search' value={searchInputName} onChange={ ( {target:{value}} ) => setSearchInputName( value ) }/>
                    <button className='datatable-component__button-search' onClick={filterDataList}>Search</button>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    direction="auto"
                    responsive
                    subHeader
                    subHeaderAlign="right"
                    subHeaderWrapsubHeader={true}
                />
            </div>
        </div>
    )

}

export default RickyAndMortyList
