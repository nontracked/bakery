import './Field.scss'
import {clsx} from "clsx";
import {FieldErrors, UseFormRegister} from "react-hook-form";

interface FieldProps {
  className?: string;
  label: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  isReq?: boolean;
  textarea?: boolean;
  schemaName: string;
  placeholder: string;
  type?: string;
}

export const Field = ({
                        className,
                        label,
                        register,
                        isReq,
                        textarea,
                        errors,
                        schemaName,
                        placeholder,
                        type = 'text'
                      }: FieldProps) => {
  const fieldError = errors[schemaName]
  const Component = textarea ? 'textarea' : 'input'
  return (
    <div className={clsx("field", className)}>
      <div className="field__inner">
        <label className="field__label" htmlFor={schemaName}>{label} {isReq && <b>*</b>}</label>
        <Component
          className={clsx(`field__${Component}`, 'field--error')}
          type={textarea ? undefined : type}
          placeholder={placeholder}
          id={schemaName}
          {...register(schemaName)}
        />
        {fieldError && <p className="field__label--error">{fieldError.message as string}</p>}
      </div>
    </div>
  )
}