import { Box, FormLabel, Input, Text, Button, Heading, Thead, Tr, Th, Td, Tbody, Table } from '@chakra-ui/react'
import axios from 'axios';
import {useState, useEffect} from 'react'
import Select from 'react-select';
import { api } from '../api/apis';




const TopMentor = () => {
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '400px'
        }),
        menu: (provided) => ({
            ...provided,
            width: '400px',
            color: 'black'
          }),
      };
    const [selectedOption, setSelectedOption] = useState([]);
    const [course, setCourse] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [data, setData] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    useEffect(() => {
        axios.get(`${api}api/course/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setCourse(res.data.data)
        })
        
    }, []);
    useEffect(() => {
        axios.get(`${api}api/employee/teachers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setEmployee(res.data.data)
            
            
        })
        
    }, []);
    
    

    const handleSubmit = () => {
        axios.post(`${api}api/mentors/new`,{
                "courseIDs": ``,
                "employeeID": employeeId.value,
        } ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            axios.get(`${api}api/mentor/` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setData(res.data.data)
            })
        })
}
console.log(employeeId);
console.log(selectedOption);


  return (
    <Box>
            <Box pb={5}>
                    <Heading fontSize={'30px'}>Oqituvchi</Heading>
            </Box>
            <Box display={'flex'} gap={'2rem'} alignItems={'center'}>
            <Box>
                    <FormLabel>Hodim <span style={{color: 'red'}}>*</span></FormLabel>
                    <Select
                        defaultValue={employeeId}
                        onChange={setEmployeeId}
                        styles={customStyles}
                        options={employee.map((option, index) => ({
                            value: option.id,
                            label: `${option.face.lastname} | ${option.face.firstname} | ${option.face.middlename}`
                        }))}
                    />  
                </Box>
                <Box>
                    <FormLabel>Kurslar <span style={{color: 'red'}}>*</span></FormLabel>
                    <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={course.map((option, index) => ({
                    value: option.id,
                    label: `${option.name}`
                }))}
                styles={customStyles}
                isMulti={true}
            />
                </Box>
               
                
                <Box>
                    <FormLabel>SubMentor <span style={{color: 'red'}}>*</span></FormLabel>
                    <Input w={'400px'} placeholder={'subMentors'} />
                </Box>
                <Button mt={7} bg={"green"}
                            color={"#fff"}
                            _hover={{ bg: "" }}
                            _active={{ bg: "" }} onClick={handleSubmit}>Qoshish</Button>
            </Box>


            <Box pt={'50px'}>
                <Table variant='simple' rounded={'10px'} bg={'#37414B'} color={'white'}>
                    <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Kurs Nomi</Th>
                                <Th>Oqituvchi</Th>
                                <Th>SubMentor</Th>
                            </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>a</Td>
                            <Td>ssss</Td>
                            <Td>aaaaa</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
    </Box>
  )
}

export default TopMentor
