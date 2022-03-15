import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Item = ({value, setSelectedValue}) => (
  <DropdownItem onClick={() => setSelectedValue(value)}>
    {value}
  </DropdownItem>
)

const DropdownInput = ({values, selected}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(selected);
  const toggle = () => setOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle caret>
        {selectedValue}
      </DropdownToggle>
      <DropdownMenu>
        {values.map(value => (
          <Item key={value} value={value} setSelectedValue={setSelectedValue} />
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownInput;
