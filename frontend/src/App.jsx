import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div className="container mt-5">
      <h1>Comunicarros</h1>
      <p>Marketplace automotivo.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App