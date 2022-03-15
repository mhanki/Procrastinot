import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const DevMultiselect = ({label, members}) => {
  return (
    <FormGroup>
      <Label>Assign Developer</Label>
      <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" >
        {members.map(({user}) => (
          <option key={user._id}>
            {user.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  )
}

export default DevMultiselect;