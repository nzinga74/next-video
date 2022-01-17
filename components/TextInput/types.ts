import { Control } from "react-hook-form";


export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>
  name: string
  errors?: string
}