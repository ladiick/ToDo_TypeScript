import {IconButton, Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, {useCallback, useState} from "react";


interface InputPlusProps {
	onAdd: (title: string) => void
}

const InputPlus: React.FC<InputPlusProps> = React.memo(({onAdd}) => {

	const [inputValue, setInputValue] = useState('')

	const addTask = useCallback(() => {
		if (onAdd) {
			onAdd(inputValue)
			setInputValue('')
		}
	}, [inputValue])

	const addPressEnter = (e:React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter') {
			addTask()
		}
	}

	return (
		<InputGroup width={'60%'} boxShadow='lg' rounded={'md'}>
			<Input
				type='text'
				placeholder='Create new task'
				value={inputValue}
				onKeyDown={addPressEnter}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<InputRightAddon p={0} width={'16'}>
				<IconButton
					colorScheme={"blue"}
					onClick={addTask}
					width={'full'}
					borderLeftRadius="0"
					aria-label={'add task'}
					icon={<AddIcon/>}/>
			</InputRightAddon>
		</InputGroup>
	);
});


export default InputPlus;
