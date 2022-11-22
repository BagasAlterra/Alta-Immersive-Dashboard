import React, { ChangeEventHandler, FC } from 'react'

interface Props {
    id: string,
    name: string,
    option_1: string,
    option_2: string,
    value_1: string,
    value_2: string,
    checked?: boolean,
    value?: string,
    register?: any,
    onChange?: ChangeEventHandler
}

const RadioButton: FC<Props> = ({ id, value_1, value_2, option_1, option_2, checked, value, name, register, onChange, ...props }) => {
    return (
        <div className='flex'>
            <label className='label flex flex-row-reverse'>
                <span className='ml-5 text-black'>{option_1}</span>
                <input id={id} onChange={onChange} type="radio" name={name} {...(register ? register(name) : {})} {...props}
                    className={
                        `radio radio-md ${checked ? `bg-alta-orange` : `border border-alta-orange`}`
                    }
                    value={value_1}
                />
                <span className='ml-5 mr-20 text-black'>{option_2}</span>
                <input id={id} onChange={onChange} type="radio" name={name} {...(register ? register(name) : {})} {...props}
                    className={
                        `radio radio-md ${checked ? `bg-alta-orange` : `border border-alta-orange`}`
                    }
                    value={value_2}
                />
            </label>
        </div>
    )
}

export default RadioButton