import React from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';

const OverflowMenu = ({ items, size = '' }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="overflow-menu" direction="left" isOpen={dropdownOpen} toggle={toggle} options={items}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="span"
      >
        <div className={"overflow-menu-icon " + size}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        {items.map(item => (
          <DropdownItem onClick={item.action} key={item.name}>
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default OverflowMenu;