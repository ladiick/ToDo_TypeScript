import ReactDOM from 'react-dom/client'
import App from '../src/views/App'
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ChakraProvider theme={theme}>
		<App/>
	</ChakraProvider>
)
