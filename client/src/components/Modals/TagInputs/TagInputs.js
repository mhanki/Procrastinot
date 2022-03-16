import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import DropdownInput from './DropdownInput';

const TagInputs = ({ tags, ticketInfo, updateInfo, size }) => {
  const getSelectedValue = (key) => ticketInfo.tags[key].value

  return (
    <div className={`tag-inputs ${size}`}>
      {tags.map((tag) => (
        <FormGroup key={tag._id}>
          <Label>{tag.name}</Label>
          <DropdownInput
            values={tag.values.map(value => value.name)}
            handleClick={(key, value) => updateInfo(key, [tag.name, value])}
            selectedValue={getSelectedValue(tag.name)}
          />
        </FormGroup>

      ))}
    </div>
  )
}

export default TagInputs;