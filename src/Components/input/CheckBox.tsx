import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { pink } from '@mui/material/colors'
interface CheckBoxProps {
  label: string
  onChange: any
}

const CheckBoxInput: React.FC<CheckBoxProps> = ({ label, onChange }) => {
  return (
    <>
      <div className="flex items-center">
        <Checkbox
          onChange={onChange}
          defaultChecked
          size="small"
          sx={{
            color: 'white',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
          id="checkbox"
        />
        <label className="text-sm text-gray-100 cursor-pointer" htmlFor="checkbox">
          {label}
        </label>
      </div>
    </>
  )
}

export default CheckBoxInput
