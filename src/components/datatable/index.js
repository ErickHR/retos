import { useEffect, useRef, useState } from 'react'
import './../../styles/datatable.css'
import './../../styles/views.css'
import DatatableForm from './DatatableForm'
import DatatableList from './DatatableList'
import DatatablePagination from './DatatablePagination'

const Datatables = ( props ) => {

    const [ cantValueShow, setCantValueShow ] = useState( 10 )
    const [ dataRender, setDataRender ] = useState( [] )
    const [ dataOriginal, setDataOriginal ] = useState( [] )
    const [ pageInit, setPageInit ] = useState(0)
    const [ pageCurrent, setPageCurrent ] = useState(0)
    const [ pageEnd, setPageEnd ] = useState(0)

    const datatablePagination = useRef()

    const functCantValueShow = ( cantValueShow ) => {
        setCantValueShow( +cantValueShow )
        datatablePagination.current.funcCantValueShow( cantValueShow )
        setDataRender( oldValue => [ ...dataRender ] )
        // setDataOriginal( oldValue => [ ...dataRender ] )
    }

    const functSearchInput = ( searchInput ) => {
        if( !!searchInput ) {
            const regex = new RegExp( searchInput, 'gi')
            
            const newDataRender = props.data.filter( ( item ) => ( regex.test( item.name ) || regex.test( item.air_date ) || regex.test( item.episode ) || regex.test( item.created )  ) )

            setDataRender( oldValue => [ ...newDataRender ] )
            setDataOriginal( oldValue => [ ...newDataRender ] )
            return 
        }

        setDataRender( oldValue => [ ...props.data ] )
        setDataOriginal( oldValue => [ ...props.data ] )


    }

    const funcPagination = ( pageCurrentPagination ) => {
        const numDataShow = ( cantValueShow*pageCurrentPagination > props.data.length ) ? 
                                        props.data.length : cantValueShow*pageCurrentPagination
        const dataProps = [ ...props.data ]
        // setDataOriginal( [ ...dataProps ] )
        const newDataRender = dataProps.splice( cantValueShow*(pageCurrentPagination-1), numDataShow )
        setDataRender( newDataRender )
    }

    useEffect( () => {
        setDataRender( props.data )
        setDataOriginal( props.data )
    }, [ props.data ] )
    
    return (
        <div className="datatable__wrapper">
            <DatatableForm 
                functCantValueShow={ functCantValueShow }
                functSearchInput={ functSearchInput }
            />
            <DatatableList 
                columns={ props.columns } 
                dataRender={ dataRender }
                cantValueShow={ cantValueShow }
            />
            <DatatablePagination 
                dataRenderLength = { dataOriginal.length }
                // cantValueShow = { cantValueShow }
                funcPagination = { funcPagination }
                ref = { datatablePagination }
            />
        </div> 
    )

}

export default Datatables