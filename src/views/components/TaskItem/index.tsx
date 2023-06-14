import React, {useState} from 'react';
import {Box, Checkbox, HStack, IconButton, Input, ScaleFade, Text, useColorMode} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'

interface TaskItemProps {
	id: string
	title: string
	onDone: (id: string) => void;
	onEdited: (id: string, title: string) => void
	onRemoved: (id: string) => void
}


const TaskItem: React.FC<TaskItemProps> = ({id, title, onDone, onEdited, onRemoved}) => {


	const [checked, setChecked] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [editValue, setEditValue] = useState(title)
	const { colorMode } = useColorMode()


	const handlerChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setChecked(e.target.checked)
			setTimeout(() => {
				onDone(id)
			}, 200)

		}
	}


	const removeTask = () => {
		if (confirm('Are you sure?')) {
			setChecked(true)
			setTimeout(() => {
				onRemoved(id)
			}, 200)
		}
	}

	const editTask = () => {
		setEditMode(true)
	}


	const saveEdit = () => {
		onEdited(id, editValue)
		setEditMode(false)
	}

	const saveEditPressKey = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter') {
			onEdited(id, editValue)
			setEditMode(false)
		}

		if (e.key === 'Escape') {
			setEditMode(false)
		}
	}

	return (
		<ScaleFade in={!checked} style={{width: '100%'}}>
			<Box
				boxShadow='lg'
				cursor={'pointer'}
				bg={colorMode !== 'light' ? 'gray.700' : 'blue.600'}
				w={'100%'}
				rounded={'md'}
				p={4}
				color={'Background'}>
				<HStack>
					<HStack flex={1}>
						<Checkbox colorScheme='green' size={'lg'} disabled={editMode} checked={checked} onChange={handlerChangeCheckbox}/>

						{editMode ?
							<Input mx={4} color={'white'} autoFocus={true} onKeyDown={saveEditPressKey} fontSize={'2xl'} variant='flushed' value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
							:
							<Text color={'white'} fontSize={'2xl'} ms={4}>
								{title}
							</Text>}
					</HStack>
					<HStack spacing={5}>

						{
							editMode ?
								<IconButton onClick={saveEdit} colorScheme={'green'} aria-label={'Save edit'} icon={<CheckIcon/>}/>
								:
								<IconButton onClick={editTask} colorScheme={'orange'} aria-label={'Edit'} icon={<EditIcon/>}/>}

						<IconButton onClick={removeTask} colorScheme={'red'} aria-label={'Remove'} icon={<DeleteIcon/>}/>
					</HStack>
				</HStack>
			</Box>
		</ScaleFade>
	);
};

export default TaskItem;
