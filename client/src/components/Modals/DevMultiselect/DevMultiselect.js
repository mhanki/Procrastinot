import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const DevMultiselect = ({ members, assignees, updateInfo }) => {
  const [newAssignees, setNewAssignees] = React.useState([...assignees])

  const handleClick = (value) => {
    let updatedAssignees = newAssignees.includes(value)
      ? newAssignees.filter(assignee => assignee !== value)
      : [...newAssignees, value]

    setNewAssignees(updatedAssignees);
    updateInfo('assigned', updatedAssignees)
  }

  return (
    <FormGroup>
      <Label>Assign Developer</Label>
      <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" value={assignees} onChange={(e) => e.preventDefault()}>
        {members.map(({ user }) => (
          <option value={user.name} key={user._id} onClick={(e) => handleClick(e.target.value)}>
            {user.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  )
}

export default DevMultiselect;