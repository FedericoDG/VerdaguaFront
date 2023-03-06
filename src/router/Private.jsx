// import {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'

import Balance from '../pages/Balance'
import GeneralContracts from '../pages/GeneralContracts'
import Home from '../pages/Home'
import IndividualContracts from '../pages/IndividualContract'
import IndividualContractsList from '../pages/IndividualContractsList'
import Institutions from '../pages/Institutions'
import Passengers from '../pages/Passengers'
import Payments from '../pages/Payments'
import Responsibles from '../pages/Responsibles'
import Users from '../pages/Users'
import Settings from '../pages/Settings'

/* const GeneralContracts = lazy(() => import('../pages/GeneralContracts'))
const Home = lazy(() => import('../pages/Home'))
const Institutions = lazy(() => import('../pages/Institutions'))
const Passengers = lazy(() => import('../pages/Passengers'))
const Responsibles = lazy(() => import('../pages/Responsibles'))
const Users = lazy(() => import('../pages/Users'))
const IndividualContracts = lazy(() => import('../pages/IndividualContract'))
const IndividualContractsList = lazy(() => import('../pages/IndividualContractsList'))
const Payments = lazy(() => import('../pages/Payments')) */

const Private = () => (
  /*  <Suspense fallback={<Spinner height="100vh" />}> */
  <Routes>
    <Route element={<Balance />} path="/balance" />
    <Route element={<GeneralContracts />} path="/general-contracts" />
    <Route element={<Home />} path="/" />
    <Route element={<IndividualContracts />} path="/individual-contracts-create" />
    <Route element={<IndividualContractsList />} path="/individual-contracts" />
    <Route element={<Institutions />} path="/institutions" />
    <Route element={<Passengers />} path="/passengers" />
    <Route element={<Payments />} path="/payments" />
    <Route element={<Responsibles />} path="/responsible-seniors" />
    <Route element={<Users />} path="/users" />
    <Route element={<Settings />} path="/settings" />
  </Routes>
  /*  </Suspense> */
)

export default Private
