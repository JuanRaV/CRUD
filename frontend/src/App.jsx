import{BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import  {Login}  from './paginas/Login'
import {Registrar} from './paginas/Registrar'
import {ConfirmarCuenta} from './paginas/ConfirmarCuenta'
import AdministrarPacientes from './paginas/AdministrarPacientes'

import {AuthProvider} from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {

  return (
    
      <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            <Routes>
              <Route path='/' element={<AuthLayout/>}> {/*Cuando el usuario visite la diagonal cargamos el componente de AuthLayout*/}
                
                {/* Todas las rutas que esten dentro tendran a AuthLayout como su componente padre */}
                <Route index element ={<Login/>}/> {/* Cargamos otra pagina */}
                <Route path='registrar' element ={<Registrar/>}/>
                <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
              
              </Route>

              {/* Request Autenticados: */}
              <Route path='/admin' element={<RutaProtegida/>}>
                <Route index element ={<AdministrarPacientes/>}/>
              </Route>

            </Routes>
          </PacientesProvider>
        </AuthProvider>
      </BrowserRouter>
    
  )
}

export default App
