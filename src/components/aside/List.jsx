import {Divider, Typography} from '@mui/material'
import {NavLink} from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal'
import ApartmentIcon from '@mui/icons-material/Apartment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import SettingsIcon from '@mui/icons-material/Settings'
import TaskIcon from '@mui/icons-material/Task'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const styles = {
  active: {
    backgroundColor: '#ede4f5',
    // color: '#1976D2',
    display: 'flex',
    textDecoration: 'none',
  },
  inactive: {color: 'unset', display: 'flex', textDecoration: 'none'},
}

export const mainListItems = (
  <>
    <NavLink style={({isActive}) => (isActive ? styles.active : styles.inactive)} to="/dashboard/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>
    <Divider />
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/passengers"
    >
      <ListItemButton>
        <ListItemIcon>
          <AirlineSeatLegroomNormalIcon />
        </ListItemIcon>
        <ListItemText primary="Pasajeros" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/responsible-seniors"
    >
      <ListItemButton>
        <ListItemIcon>
          <EscalatorWarningIcon />
        </ListItemIcon>
        <ListItemText primary="Responsables" />
      </ListItemButton>
    </NavLink>
    <Divider />
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/general-contracts"
    >
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos Generales" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/individual-contracts-list"
    >
      <ListItemButton>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos individuales" secondary="Listar/Editar" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/individual-contracts"
    >
      <ListItemButton>
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos individuales" secondary="Crear" />
      </ListItemButton>
    </NavLink>
    <Divider />
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/payments"
    >
      <ListItemButton>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Cargar un Pago" />
      </ListItemButton>
    </NavLink>
  </>
)

export const adminListItems = (
  <>
    <ListSubheader inset component="div">
      <Typography color="primary" sx={{fontWeight: 'bold'}} variant="caption">
        ADMINISTRADOR
      </Typography>
    </ListSubheader>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/institutions"
    >
      <ListItemButton>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Colegios/Instituciones" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/balance"
    >
      <ListItemButton>
        <ListItemIcon>
          <RequestQuoteIcon />
        </ListItemIcon>
        <ListItemText primary="Caja/Balance" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={({isActive}) => (isActive ? styles.active : styles.inactive)}
      to="/dashboard/users"
    >
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
    </NavLink>
  </>
)

export const superListItems = (
  <NavLink
    style={({isActive}) => (isActive ? styles.active : styles.inactive)}
    to="/dashboard/tour-packages"
  >
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Parámetros del sitio" />
    </ListItemButton>
  </NavLink>
)
