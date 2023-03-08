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
import Report from '../pages/Report'

// const GeneralContracts = lazy(() => import('../pages/GeneralContracts'))

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
    <Route element={<Report />} path="/general-contracts/report/:id" />
  </Routes>
  /*  </Suspense> */
)

export default Private
