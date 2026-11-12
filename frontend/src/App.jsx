import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Oficina from './pages/Oficina'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Painel from './pages/Painel'

import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/oficina/:id" element={<Oficina />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/painel" element={<DashboardLayout />}>

            <Route index element={<Painel />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App