import React, { FC } from 'react'

interface Props {
    title: string,
    name: string,
    data?: any[],
    register?: any,
}

const Dropdown: FC<Props> = ({ data, title, name, register, ...props }, ref) => {
    return (
        <select className="rounded-md select-md w-1/3 pl-2 bg-gray-50 border border-gray-400 text-sm m-1 w-1/5 "
            name={name}
            ref={ref}
            {...(register ? register(name) : {})} {...props}
        >
            <option disabled selected >{title}</option>
            {data ? data.map((item) => (
                <option value={item.value}>{item.value}</option>
            )) :
                <option selected>No data available</option>
            }
        </select>
    )
}

export default Dropdown