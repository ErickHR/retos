import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './../../styles/datatable.css'
import './../../styles/views.css'

const DatatablePagination = forwardRef( ( props, ref ) => {

    const [ cantValueShow, setCantValueShow ] = useState( 10 )
    const [ pageInit, setPageInit ] = useState(0)
    const [ pageCurrent, setPageCurrent ] = useState(0)
    const [ pageEnd, setPageEnd ] = useState(0)

    const definePagination = ( cant = "", init = false ) => {
        let pageCeil = Math.ceil( props.dataRenderLength / ( cant? cant : cantValueShow ) )
        setPageEnd( pageCeil )
        setPageInit( 1 )
        let current = init ? 1 : pageCurrent
        setPageCurrent( current )

    }

    const buttonPrevClick = () => {
        if( pageCurrent > pageInit ){
            let page = pageCurrent - 1
            setPageCurrent( page )
            props.funcPagination( page )
        }
    }

    const buttonNextClick = () => {
        if( pageCurrent < pageEnd ){
            let page = pageCurrent + 1
            setPageCurrent( page )
            props.funcPagination( page )
        }
    }

    const renderShowPagination = () => {
        return (cantValueShow*pageCurrent > props.dataRenderLength ) ? props.dataRenderLength : cantValueShow*pageCurrent
    }

    useImperativeHandle( ref, () => (
        {
            funcCantValueShow( cant ){
                setCantValueShow( +cant*1 )
                definePagination( +cant*1 )

            }
        }
    ) )

    useEffect( () => {
        definePagination( "", true )
    }, [ props.dataRenderLength ] )

    // useEffect( () => {
    //     setCantValueShow( props.cantValueShow )
    //     definePagination()
    // }, [ props.cantValueShow ] )

    return (
        <div className="datatable__pagination" >
            <div className="datatable__pagination-wrapper">
                <button onClick={ buttonPrevClick } className="datatable__button-pagination" > &lt; </button>
                    Pag. { pageCurrent }
                <button onClick={ buttonNextClick } className="datatable__button-pagination" > &gt; </button>
                <span> &nbsp;&nbsp;&nbsp; </span>
                { ( cantValueShow * ( pageCurrent - 1 ) ) + 1} - { renderShowPagination() }
            </div>
        </div>
    )

} )

export default DatatablePagination