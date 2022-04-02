
import axios from 'axios'
import { useEffect, useState } from 'react';
import Datatables from '../../components/datatable/index.js';

const RickyAndMortyList = () => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Episode',
            selector: row => row.episode,
        },
        {
            name: 'Air Date',
            selector: row => row.air_date,
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
                let airDate = new Date( row.air_date )
                let created = new Date( row.created )
                let diffDate = airDate.getTime() - created.getTime()
                
                return -1*diffDate
            },
        }
    ];
    
    const [ dataList, setDataList ] = useState([])
    const [ url, setUrl ] = useState("")

    const getListData = async () => {

        try {

            const response = await axios.get( 'https://rickandmortyapi.com/api/episode' )
            setDataList(oldArray => [...oldArray, ...response.data.results]);

            const response1 = await axios.get( response.data.info.next )
            setDataList(oldArray => [...oldArray, ...response1.data.results]);
            
            const response2 = await axios.get( response1.data.info.next )
            setDataList(oldArray => [...oldArray, ...response2.data.results]);
            
        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect( () => {
        getListData()
    }, [] )
    
    return (
        <div className="form-ricky-and-morty">
            <Datatables 
                columns = { columns }
                data = { dataList }
            />
        </div>
    )

}

export default RickyAndMortyList
