import React from 'react';
import { Controller } from 'react-hook-form'

import { IProps } from './types';

const TextInput: React.FC<IProps> = (props) => {
  const { control, name, ...rest } = props
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            {...rest}
          />
        )} />
    </>
  )
}

export default TextInput;