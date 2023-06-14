import React, {useCallback} from 'react';
import {
	Box,
	Container,
	Divider,
	Heading, IconButton, useColorMode,
	VStack,
} from "@chakra-ui/react";

import {SunIcon,MoonIcon} from '@chakra-ui/icons'

import {useToDoStore} from "../../data/stores/useToDoStore";
import InputPlus from "../components/InputPlus";
import TaskItem from "../components/TaskItem";

const App: React.FC = () => {
	const [tasks, createTask, updateTask, deleteTask] = useToDoStore(state => [
		state.tasks,
		state.createTask,
		state.updateTask,
		state.deleteTask
	])
	const { colorMode, toggleColorMode } = useColorMode()

	const onAdd = useCallback((title: string) => {
		if (title) {
			createTask(title)
		}
	}, [createTask])


	return (
		<Container maxW='4xl'>
			<Box
				boxShadow='lg'
				pos={'relative'}
				mt={100}
				borderWidth='1px'
				borderRadius='lg'
				py='6'
				px='16'>
				<Box pos="absolute" top="5" left="5">
				<IconButton aria-label={'toggle theme'} onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}/>
				</Box>
				<VStack>
					<VStack w={'full'} mb={'4'}>
						<Heading as='h1' mb={4}>
							To Do App
						</Heading>
						<InputPlus onAdd={onAdd}/>
					</VStack>
					<Divider mb={'4'}/>

					<VStack w={'100%'}>

						{
							tasks?.length !== 0 ?
								tasks?.map(task=><TaskItem
									key={task.id}
									id={task.id}
									title={task.title}
									onDone={deleteTask}
									onEdited={updateTask}
									onRemoved={deleteTask}
								/>)

								:
								<Heading
									size={'md'}
									userSelect={'none'}
									pointerEvents={'none'}
									sx={{px: '2', py: '1', rounded: 'lg', bg: 'blue.500',color:'white'}}>
									The task list is empty

								</Heading>


						}

					</VStack>

				</VStack>
			</Box>
		</Container>
	);
};

export default App;
