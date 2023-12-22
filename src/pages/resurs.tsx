import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import WhoCourse from '../components/whoCourse/whoCourse'
import AvanaibelCourse from '../components/avanaibelCourse/avanaibelCourse'
import CourseTags from '../components/courseTags/courseTags'
import Course from '../components/course/course'
import {useState  } from "react";
import Stuff from '../components/stuff/stuff'
import PhisicalFace from '../components/phisicalFace/phisicalFace'
import Employee from '../components/employee/employee'
import PriceCourse from '../components/priceCourse/priceCourse'
import News from '../components/news/news'
const Resurs = () => {
    const [obj , setObj] = useState({photo: ''})
    console.log(obj);

    const handleFile = (e:any) => {
        setObj({...obj, photo: e.target.files[0]})
    }
  return (
    <Box color={'white'} ml={'200px'} px={5} mt={'70px'}>
        <Box pb={4}>
            <Heading>Resurslar</Heading>
        </Box>
        <Tabs variant='unstyled' colorScheme='green'>
            <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Mavjud taglar</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Mavjud kurs turlari</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Xodimlar</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Ynagilikalr</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Mentor</Tab>
            </TabList>

            <TabPanels >
                <TabPanel>
                    <CourseTags />
                </TabPanel>
                <TabPanel>
                    <WhoCourse />
                    <AvanaibelCourse handleFile={handleFile} obj={obj} />
                    <Course handleFile={handleFile} obj={obj}  />
                    <PriceCourse />
                </TabPanel>
                <TabPanel>
                    <Stuff />
                    <PhisicalFace />
                    <Employee  handleFile={handleFile} obj={obj} />
                </TabPanel>
                <TabPanel>
                    <News   handleFile={handleFile} obj={obj}  />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
  )
}

export default Resurs