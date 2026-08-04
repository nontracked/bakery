import './Field.scss'
import {clsx} from "clsx";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {ReactNode} from "react";

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
  actionElement?: ReactNode; // динамический элемент, по типу кнопки и тд
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
                        type = 'text',
                        actionElement
                      }: FieldProps) => {
  const fieldError = errors[schemaName]
  const Component = textarea ? 'textarea' : 'input'
  return (
    <div className={clsx("field", `field--${className}`)}>
      <div className="field__inner">
        <label className="field__label" htmlFor={schemaName}>{label} {isReq && <b>*</b>}</label>
        <div className="field__group">
          <Component
            className={clsx(`field__${Component}`, fieldError && 'field--error')}
            type={textarea ? undefined : type}
            placeholder={placeholder}
            id={schemaName}
            {...register(schemaName)}
          />
          {actionElement && actionElement}
        </div>
        {fieldError && <p className="field__label--error">{fieldError.message as string}</p>}
      </div>
    </div>
  )
}