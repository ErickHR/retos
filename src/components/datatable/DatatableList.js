import { useEffect, useState } from 'react'
import './../../styles/datatable.css'
import './../../styles/views.css'

const DatatableList = ( props ) => {

    const [ cantValueShow, setCantValueShow ] = useState(0)
    const [ dataRender, setDataRender ] = useState([])



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

        return renderTr.splice( 0, cantValueShow+0 )
        // return renderTr

    }

    const renderHeadTh = () => {
        return props.columns.map( (item, index) => <th className='datatable__th' key={index}>{ item.name }</th> )
    }

    useEffect( () => {
        setDataRender( props.dataRender )
    }, [ props.dataRender ] )

    useEffect( () => {
        setCantValueShow( props.cantValueShow )
    }, [ props.cantValueShow ] )

    return (
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
            
    )

}

export default DatatableList