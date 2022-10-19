import React, { ChangeEventHandler, FC } from 'react'

interface Props {
    id?: string,
    checked?: boolean,
    value?: string,
    name?: string,
    onChange?: ChangeEventHandler
}

const RadioButton: FC<Props> = ({ id, checked, value, name, onChange }) => {
    return (
        <div className='flex'>
            <label className='label'>
                <input id={id} onChange={onChange} type="radio" name={name}
                    className={
                        "radio radio-md checked:" + (checked ? 'bg-alta-orange' : 'border border-alta-orange')
                    }
                    value={value}
                    checked={checked === true ? true : false}
                />
                <span className="label-text ml-4">{name}</span>
            </label>
        </div>
    )
}

export default RadioButton