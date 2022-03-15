import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const TextInput = ({ label, type = "text" }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input type={type} />
    </FormGroup>
  )
}

export default TextInput;