import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { getKeycloak, logout } from '../utils/keycloak.js'
import BannerUSA from './BannerUSA.jsx'

import './Header.css'
import logo from '../images/ffiec-logo.svg'

export const addActiveClass = (selected, current) => {
  if (selected === current) return 'active'
  return null
}

export const logOutHandler = e => {
  e.preventDefault()
  logout()
}

export const getLink = () => {
  if (getKeycloak().authenticated) return '/filing/2018/institutions'
  return '/filing/2018/'
}

export const makeNav = (props, page) => {
  let userHeader = (
    <ul className="nav-primary">
      <li>
        <Link to={getLink()} className="nav-link">
          Filing Home
        </Link>
      </li>
      {getKeycloak().authenticated ? (
        <li className="user">
          {getKeycloak().tokenParsed.name}
          <button className="nav-link" onClick={logOutHandler}>
            Logout
          </button>
        </li>
      ) : null}
    </ul>
  )

  if (page === 'oidc-callback') userHeader = null

  return <nav className="nav">{userHeader}</nav>
}

const Header = props => {
  const page = props.pathname.split('/').slice(-1)[0]

  return (
    <header className="Header header header-basic" id="header" role="banner">
      <BannerUSA />
      <section className="nav-container">
        <div className="logo" id="logo">
          <span className="logo-text">
            <Link
              className="nav-link"
              to={getLink()}
              title="Home"
              aria-label="Home"
            >
              <img src={logo} height="32px" alt="FFIEC" />
              HMDA Filing Platform
            </Link>
          </span>
        </div>
        {makeNav(props, page)}
      </section>
    </header>
  )
}

Header.propTypes = {
  //user: PropTypes.object,
  pathname: PropTypes.string
}

export default Header
