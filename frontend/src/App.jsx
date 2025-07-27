import { Route, Routes } from 'react-router'
import Create from './pages/Create'
import Detail from './pages/Detail'
import Home from './pages/Home'

function App() {
	return (
		<div className='relative h-screen w-full'>
			<div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000000_65%,#61ff538b_100%)]' />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/create' element={<Create />} />
			</Routes>
		</div>
	)
}

export default App
