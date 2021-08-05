import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/tracker-entity-instance">
      Tracker Entity Instance
    </MenuItem>
    <MenuItem icon="asterisk" to="/generation">
      Generation
    </MenuItem>
    <MenuItem icon="asterisk" to="/event">
      Event
    </MenuItem>
    <MenuItem icon="asterisk" to="/signature">
      Signature
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
