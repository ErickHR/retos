import { useEffect, useState } from 'react'
import './../styles/datatable.css'
import './../styles/views.css'

const Datatables = ( props ) => {

    const [ dataRender, setDataRender ] = useState( [] )
    const [ cantValueShow, setCantValueShow ] = useState( 10 )
    const [ selectOptionCantPageShow, setSelectOptionCantPageShow ] = useState( [10, 20, 50] )
    const [ pageInit, setPageInit ] = useState(0)
    const [ pageCurrent, setPageCurrent ] = useState(0)
    const [ pageEnd, setPageEnd ] = useState(0)
    const [ searchInput, setSearchInput ] = useState("")


    const filterData = () => {
        try {
            setDataRender( [ ...props.data ] )

            if( searchInput == "" ) {
                return
            }

            const regex = new RegExp( searchInput, 'i')
            
            const newDataRender = dataRender.filter( ( item ) => ( regex.test( item.name ) || regex.test( item.air_date ) || regex.test( item.episode ) || regex.test( item.created )  ) )
            setDataRender( newDataRender )
        } catch (error) {
            console.log(error)
        }

    }

    const nextPage = () => {

        const numDataShow = ( cantValueShow*pageCurrent > props.data.length ) ? props.data.length : cantValueShow*pageCurrent
        const dataProps = [ ...props.data ]

        const newDataRender = dataProps.splice( cantValueShow*(pageCurrent-1), numDataShow )
        setDataRender( newDataRender )
        
    }

    const definePagination = () => {

        setPageEnd( Math.ceil( props.data.length / cantValueShow ) )
        setPageInit( 1 )
        setPageCurrent( 1 )

    }

    const renderBodyTd = ( dataObject ) => {
        return props.columns.map( ( itemColumns, indexBody ) => {

            return (
                <td className="datatable__td" key={indexBody}>
                    { itemColumns.selector( dataObject ) }
                </td>
            )
        } )
    }

    const renderBodyTr = () => {
        
        let renderTr =  dataRender.map( ( dataObject, indexObject ) => {

            return (
                <tr key={ indexObject } className="datatable__tr">
                    {
                        renderBodyTd( dataObject )
                    }
                </tr>
            )

        } )

        // const numDataShow = ( cantValueShow*pageCurrent > props.data.length ) ? props.data.length : cantValueShow*pageCurrent

        // return renderTr.splice( cantValueShow*(pageCurrent-1), numDataShow )
        return renderTr.splice( 0, cantValueShow+0 )

    }

    const renderSelectOption = () => {
        return selectOptionCantPageShow.map( ( paseShowSelectItem, paseShowSelectIndex ) => <option key={paseShowSelectIndex} value={paseShowSelectItem}>{paseShowSelectItem}</option> )
    }

    const renderHeadTh = () => {
        return props.columns.map( (item, index) => <th className='datatable__th' key={index}>{ item.name }</th> )
    }

    const buttonPrevClick = () => {
        if( pageCurrent > pageInit )
            setPageCurrent( pageCurrent - 1 )
    }

    const buttonNextClick = () => {
        if( pageCurrent < pageEnd )
            setPageCurrent( pageCurrent + 1 )
    }

    const renderShowPagination = () => {
        return (cantValueShow*pageCurrent > props.data.length ) ? props.data.length : cantValueShow*pageCurrent
    }

    useEffect( () => {
        setDataRender( props.data )
        definePagination()
    }, [ props.data ] )

    useEffect( () => {
        nextPage()
    }, [ pageCurrent ] )

    useEffect( () => {
        definePagination()

        if( searchInput == "" ){
            setDataRender( oldValue => [ ...props.data ] )
            return
        }
            
        filterData()
        // 
    }, [cantValueShow])

    useEffect( () => {
    }, [] )

    return (
        <div className="datatable__wrapper">
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
            <table className="datatable">
                <thead className="datatable__thead">
                    <tr className="datatable__tr--thead">
                        {
                            renderHeadTh()
                        }
                    </tr>
                </thead>
                <tbody className="datatable__tbody">
                    {
                        renderBodyTr()
                    }
                    
                </tbody>

            </table>

            <div className="datatable__pagination" >
                <div className="datatable__pagination-wrapper">
                    <button onClick={ buttonPrevClick } className="datatable__button-pagination" > &lt; </button>
                     Pag. { pageCurrent }
                    <button onClick={ buttonNextClick } className="datatable__button-pagination" > &gt; </button>
                    <span> &nbsp;&nbsp;&nbsp; </span>
                    { ( cantValueShow * ( pageCurrent - 1 ) ) + 1} - { renderShowPagination() }
                </div>
            </div>
            
        </div> 
    )

}

export default Datatables