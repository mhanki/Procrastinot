import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const DropdownInput = ({ values, handleClick, selectedValue }) => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle caret>
        {selectedValue}
      </DropdownToggle>
      <DropdownMenu>
        {values.map(value => (
          <DropdownItem key={value} onClick={() => handleClick('tags', value)}>
            {value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownInput;