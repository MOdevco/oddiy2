import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api } from '../components/api/apis'

export const useFetch = (url:any) => {
    const [data , setData] = useState(null)


    useEffect(() => {
        axios.get(`${api}${url}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setData(res.data)
        })

    },[])

    return {data}
 
}
