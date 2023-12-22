import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'
import { useState ,useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../api/apis'
import { useToast } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Employee = ({handleFile , obj}:any) => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [value , setValue] = useState({startDate: '' , endDate: '' ,practice:''})
    const toast = useToast()
    const [faceId , setFaceId] = useState([])    
    const [stuffId , setStuffId] = useState([])    
    const [getFaceId , setGetFaceId] = useState({id: ''})    
    const [getStuffId , setGetStuffId] = useState({id: ''})    
    

    const dateBirthday = value.startDate
    const dateYear = dateBirthday.slice(0,4)
    const dateMonth = dateBirthday.slice(5,7)
    const dateDay = dateBirthday.slice(8,10)

    const dateBirthday2 = value.startDate
    const dateYear2 = dateBirthday2.slice(0,4)
    const dateMonth2 = dateBirthday2.slice(5,7)
    const dateDay2 = dateBirthday2.slice(8,10)

    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    

    useEffect(() => {
        axios.get(`${api}api/employee/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setData(res.data.data)
            setLoader(false)
        })
    } , [])
    useEffect(() => {
        axios.get(`${api}api/stuff/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setStuffId(res.data.data)
        })
    } , [])
    useEffect(() => {
        axios.get(`${api}api/face/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setFaceId(res.data.data)
        })
    } , [])

    const handleSubmit = () => {
            const formDate = new FormData()
            formDate.append('stuffId' ,getStuffId.id)
            formDate.append('faceId' ,getFaceId.id)
            formDate.append('startDate' ,`${dateDay}-${dateMonth}-${dateYear} ${h}:${m}`)
            formDate.append('endDate' ,`${dateDay2}-${dateMonth2}-${dateYear2} ${h}:${m}`)
            formDate.append('practice ' ,value.practice)
            formDate.append('photo ' ,obj.photo)
            axios.post(`${api}api/employee/new`,formDate ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/employee/` , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    setData(res.data.data)
                    setLoader(false)
                })
                toast({
                    description: `${res.data.message}`,
                    status: 'success',
                    duration: 2000,
                    position: 'top-right',
                    isClosable: true,
                })
                setValue({startDate: '' , endDate: '' ,practice:''})
            })
        
    }

  return (
   <Box mt={5}>
        <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Hodimlar</Heading>
            </Box>
            <Box display={'flex'} gap={5} alignItems={'center'}>
                <FormControl isRequired>
                    <FormLabel>Lavozim</FormLabel>
                    <Select onChange={(e) => setGetStuffId({...getStuffId, id: e.target.value})}>
                        {stuffId.map((item:any , i) => (
                            <option style={{background: '#37414B'}}value={item.id} >{item.name}</option>
                        ))}
                    </Select>
                </FormControl>  
                <FormControl isRequired>
                    <FormLabel>Jismoniy sahs</FormLabel>
                    <Select  onChange={(e) => setGetFaceId({...getFaceId, id: e.target.value})}>
                        {faceId.map((item:any , i) => (
                            <option style={{background: '#37414B'}}value={item.id} >{item.firstname}</option>
                        ))}
                    </Select>
                </FormControl>  
              
                <FormControl isRequired>
                    <FormLabel>Boshlagan sana</FormLabel>
                    <Input value={value.startDate} onChange={(e) => setValue({...value, startDate: e.target.value})} type='date'/>
                </FormControl>
                <FormControl >
                    <FormLabel>Tugaydigan sana</FormLabel>
                    <Input value={value.endDate}  onChange={(e) => setValue({...value, endDate: e.target.value})} width={'100%'} type='date' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Tajriba</FormLabel>
                    <Input value={value.practice} onChange={(e) => setValue({...value, practice: e.target.value})} type='text' placeholder='tajriba...' />
                </FormControl>
                <FormControl >
                    <Box></Box>
                    <Box mt={7}>
                        <form action="" >
                            <input  className='input-field'   hidden type="file" accept='image/*' onChange={handleFile}/>
                        </form>
                        <Button
                        onClick={() => document.querySelector('.input-field').click()}
                        bg={"blue.500"}
                        color={"#fff"}
                        _hover={{ bg: "" }}
                        _active={{ bg: "" }}
                        >
                        Rasm tanlash
                        </Button>
                    </Box>
                </FormControl>

            </Box>
            <Button mt={5} onClick={handleSubmit} width={'220px'} bg={'green'} _hover={{bg: ''}} color={'white'}>Qo'shish</Button>

            
            <Box bg={'#37414B'} mt={5} py={5} display={'flex'} rounded={'10px'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                {loader && <Box>
                    <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    />
                </Box>}
               { !loader &&<Table variant='simple' color={'white'} >
                    <Thead >
                    <Tr >
                        <Th>№</Th>
                        <Th>Ism</Th>
                        <Th>Familiya</Th>
                        <Th>Lavozim</Th>
                        <Th>Passport</Th>
                        <Th>Ish boshlagan sana</Th>
                        <Th>Telefon1</Th>
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.face.firstname}</Td>
                            <Td>{item.face.lastname}</Td>
                            <Td>{item.stuff.name}</Td>
                            <Td>{item.face.passport}</Td>
                            <Td>{String(item.startDate).slice(0,10)}</Td>
                            <Td>{item.face.tel1}</Td>
                            <Td>{String(item.face.date).slice(0,10)}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>}
            </Box>
        </Box>

   </Box>
  )
}

export default Employee