import { useEffect, useState } from 'react'
import './../styles/datatable.css'
import './../styles/views.css'

const Datatables = ( props ) => {

    const [ pageShowSelect, setPageShowSelect ] = useState([10, 20, 50])
    const [ pageShowSelected, setPageShowSelected ] = useState( 10 )
    const [ searchInput, setSearchInput ] = useState("")
    const [ dataOriginal, setDataOriginal ] = useState([])
    const [ data, setData ] = useState([])
    const [ pageInit, setPageInit ] = useState(0)
    const [ pageCurrent, setPageCurrent ] = useState(0)
    const [ pageEnd, setPageEnd ] = useState(0)

    const filterData = () => {
        try {
            setDataOriginal( [ ...props.data ] )

            if( searchInput == "" ) {
                return
            }

            const regex = new RegExp( searchInput, 'i')
            
            const newDataOriginal = dataOriginal.filter( ( item ) => ( regex.test( item.name ) || regex.test( item.air_date ) || regex.test( item.episode ) || regex.test( item.created )  ) )
            setDataOriginal( newDataOriginal )
            // return newDataOriginal
            // return newDataOriginal.splice( 0, pageShowSelected+0 )
        } catch (error) {
            console.log(error)
        }

    }

    
    const renderBodyTr = ( filter = false ) => {
        // console.log(filter)
        // if( filter )
        //     return filterData()

        // if( dataOriginal.length == 0 ) return []
        
        let renderTr =  dataOriginal.map( ( dataObject, indexObject ) => {

            return (
                <tr key={ indexObject } className="datatable__tr">
                    {
                        props.columns.map( ( itemColumns, indexBody ) => {

                            return (
                                <td className="datatable__td" key={indexBody}>
                                    { itemColumns.selector( dataObject ) }
                                </td>
                            )
                        } )
                    }
                </tr>
            )

        } )

        // return renderTr
        return renderTr.splice( 0, pageShowSelected+0 )

    }

    // const prevPage = () => {
    //     // if( pageCurrent > pageInit )
    //     //     setPageCurrent( pageCurrent - 1 )

    //     const numData = ( pageShowSelected*pageCurrent <  ) ? props.data.length : pageShowSelected*pageCurrent
    //     const dataProps = [ ...props.data ]

    //     const newDataOriginal = dataProps.splice( pageShowSelected*(pageCurrent-1), numData )
    //     console.log( pageShowSelected*(pageCurrent-1), numData )
    //     setDataOriginal( newDataOriginal )

    // }

    const nextPage = () => {
        // // if( pageCurrent < pageEnd )
        // setPageCurrent( pageCurrent + 1 )

        const numData = ( pageShowSelected*pageCurrent > props.data.length ) ? props.data.length : pageShowSelected*pageCurrent
        const dataProps = [ ...props.data ]

        const newDataOriginal = dataProps.splice( pageShowSelected*(pageCurrent-1), numData )
        console.log( pageShowSelected*(pageCurrent-1), numData )
        setDataOriginal( newDataOriginal )
        
    }

    const definePagination = () => {

        setPageEnd( Math.ceil( props.data.length / pageShowSelected ) )
        setPageInit( 1 )
        setPageCurrent( 1 )

    }

    useEffect( () => {
        setDataOriginal( props.data )
        definePagination()
    }, [ props.data ] )

    useEffect( () => {
        nextPage()
    }, [ pageCurrent ] )

    useEffect( () => {
        definePagination()
    }, [pageShowSelected])

    useEffect( () => {
    }, [] )

    return (
        <div className="datatable__wrapper">
            <div className="datatable__form" >
                <div className="datatable__select-wrapper">
                    <select value={pageShowSelected} onChange={ ({target:{value}}) => setPageShowSelected( value ) }>
                        {
                            pageShowSelect.map( ( paseShowSelectItem, paseShowSelectIndex ) => <option key={paseShowSelectIndex} value={paseShowSelectItem}>{paseShowSelectItem}</option> )
                        }
                    </select>
                </div>
                <div /* className="datatable__search-wrapper"*/>
                    <input className='datatable-component__input-search' value={searchInput} onChange={ ( {target:{value}} ) => setSearchInput( value ) }/>
                    <button className='datatable-component__button-search' type="button" onClick={ () => { filterData() } } > Searchs </button>
                </div>
            </div>
            <table className="datatable">
                <thead className="datatable__thead">
                    <tr className="datatable__tr--thead">
                        {
                            props.columns.map( (item, index) => <th className='datatable__th' key={index}>{ item.name }</th> )
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
                    <button onClick={ () => {
                        if( pageCurrent > pageInit )
                            setPageCurrent( pageCurrent - 1 )
                    } }> &lt; </button>
                    <span>{ pageInit }</span>
                    <span>&ndash;</span>
                    <span>{ pageCurrent }</span>
                    <span>&ndash;</span>
                    <span>{ pageEnd }</span>
                    <button onClick={ () => {
                        if( pageCurrent < pageEnd )
                            setPageCurrent( pageCurrent + 1 )
                    } }> &gt; </button>
                </div>
            </div>
            
        </div> 
    )

}

export default Datatables