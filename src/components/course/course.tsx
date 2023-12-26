import { Box, Button, FormControl, FormLabel, Heading, Input, background } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'
  import Select from 'react-select';
import { useState ,useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../api/apis'
import { useToast } from '@chakra-ui/react'

import { Link } from 'react-router-dom'


const options = [
    { value: 'active', label: 'Holati active' },
    { value: 'inactive', label: 'Holati inactive' },
  ];
const Course = ({handleFile,obj}:any) => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [courseFor , setCourseFor] = useState([])
    const [courseType , setCourseType] = useState([])
    const [courseTypeValue , setCourseTypeValue] = useState({id: ''})
    const [courseForValue , setCourseForValue] = useState({id: ''})
    const [value , setValue] = useState({name: '' , description: '' , status: ''})
    const [id1, setId1] = useState('');
    const [id2, setId2] = useState('');
    const [id3, setId3] = useState('');
    
    
    const toast = useToast()
    useEffect(() => {
        axios.get(`${api}api/course/` , {
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
        axios.get(`${api}api/course-for/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setCourseFor(res.data.data)
        })
    } , [])
    useEffect(() => {
        axios.get(`${api}api/course-type/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setCourseType(res.data.data)
        })
    } , [])
   
    const handleSubmit = (e:any) => {
        e.preventDefault()
        if(value.name.length===0) {
            toast({
                description: `Maydon to'lmagan`,
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } else {
            const formData = new FormData()
            formData.append("forId",  courseForValue.id)
            formData.append("preview", obj.photo )
            formData.append("typeId", courseTypeValue.id )
            formData.append("name",  value.name)
            formData.append("description",  value.description)
            formData.append("status",  value.status)
            axios.post(`${api}api/course/new` ,formData ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/course/` , {
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
                setValue({name: '' , description: '' , status: ''})
            }).catch((err) => {
                toast({
                    description: `${err.response.data.message}`,
                    status: 'error',
                    duration: 2000,
                    position: 'top-right',
                    isClosable: true,
                })
            })
        }
    }

    const customStyles = {
        // control: (provided, state) => ({
        //   ...provided,
        //   backgroundColor: 'transparent',
        //   // Set your desired background color here
        // }),
        // option: (provided, state) => ({
        //     ...provided,
        //     backgroundColor: state.isSelected ? '#0000' : '#000',
        //      // Change the background color as needed
        //   }),
        // singleValue: (provided, state) => ({
        //     ...provided,
        //     color: state.isSelected ? 'black' : 'white',
        //      // Change the text color for the selected option
        // }),
        // value: (provided, state) => {
        //     background: 'red'
        // }
        
      };
    //   console.log(id2.value); id olish
      
  return (
   <Box mt={5}>
        <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Mavjud kurs</Heading>
            </Box>
            <Box display={'flex'} gap={5} alignItems={'flex-end'}>
                <FormControl isRequired>
                    <FormLabel>Kurs qo'shish</FormLabel>
                    <Input value={value.name} onChange={(e) => setValue({...value,name: e.target.value})}  type='text' placeholder="nom qo'shish..."></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Ma'lumot qo'shish</FormLabel>
                    <Input value={value.description} onChange={(e) => setValue({...value,description: e.target.value})}  type='text' placeholder="ma'lumot..."></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Kim uchun?</FormLabel>
                    <Select defaultValue={id1} onChange={setId1} placeholder='kim uchun'
                    options={courseFor.map((option, index) => ({
                        value: option.id,
                        label: option.name
                    }))}>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Kim holati</FormLabel>
                    <Select defaultValue={id2} onChange={setId2} styles={customStyles} 
                    options={options.map((option, index) => ({
                        value: index,
                        label: option.label
                    }))}>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Yonalish</FormLabel>
                    <Select defaultValue={id3} onChange={setId3} styles={customStyles} placeholder='yonalish tanlash' 
                    options={courseType.map((option, index) => ({
                        value: option.id,
                        label: option.name
                    }))}>
                    
                    </Select>
                </FormControl>
                <Box >
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
                <Button onClick={handleSubmit} bg={'green'} _hover={{bg: ''}} width={'300px'} color={'white'}>Qo'shish</Button>
            </Box>

            
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
                        <Th>Kurs nomi</Th>
                        <Th>Havola</Th>
                        <Th>Kurs turi</Th>
                        <Th>Ma'lumot</Th>
                        <Th>Havola</Th>
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.name}</Td>
                            <Td>{<Link target='_blank' to={`http://192.168.2.66:8080/api/image/?id=${item.previewPhoto.id}`} className='linkColor'>Link</Link>}</Td>

                            <Td>{item.courseType.name}</Td>
                            <Td>{item.courseType.description}</Td>
                            <Td>{<Link target='_blank' to={`http://192.168.2.66:8080/api/image/?id=${item.courseType.photo.id}`} className='linkColor'>Link</Link>}</Td>


                            <Td>{String(item.courseType.date).slice(0,10)}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>}
            </Box>
        </Box>
   </Box>
  )
}

export default Course