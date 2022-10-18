import React, { FC } from 'react'

interface Props {
    data?: any[]
    title: string
}

const Dropdown: FC<Props> = ({ data, title }) => {
    return (
        <select className="rounded-md select-md w-1/3 pl-2 bg-gray-50 border border-gray-400 text-sm m-1 w-1/5 ">
            <option disabled selected>{title}</option>
            {data ? data.map((item) => (
                <option value={item.value}>{item.label}</option>
            )) :
                <option selected>No data available</option>
            }
        </select>
    )
}

export default Dropdown