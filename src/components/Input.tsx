import React, { ChangeEventHandler, FC } from 'react'

interface Props {
    size: string,
    outline: boolean,
    id?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    name?: string,
    onChange?: ChangeEventHandler
}

const Input: FC<Props> = ({ size, value, outline, type, name, id, placeholder, onChange }) => {
    return (
        <>
            <input
                id={id}
                className={
                    outline === true ?
                        `  <>
                            ${size === "long" ? "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded h-9 w-5/6 pl-2" :
                            size === "medium" ? "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded h-9 w-1/3 pl-2" :
                                size === "small" ? "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded h-9 w-1/5 pl-2" :
                                    size === "xtra-small" && "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded h-9 w-1/6 pl-2"
                        }
                           </>`
                        :
                        `  <>
                        ${size === "long" ? "bg-gray-50  text-gray-900 text-sm rounded h-9 w-5/6 pl-2" :
                            size === "medium" ? "bg-gray-50  text-gray-900 text-sm rounded h-9 w-1/3 pl-2" :
                                size === "small" ? "bg-gray-50  text-gray-900 text-sm rounded h-9 w-1/5 pl-2" :
                                    size === "xtra-small" && "bg-gray-50  text-gray-900 text-sm rounded h-9 w-1/6 pl-2"
                        }
                           </>`
                }
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                onChange={onChange}
            ></input>
        </>
    )
}

export default Input