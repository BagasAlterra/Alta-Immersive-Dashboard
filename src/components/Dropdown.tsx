import React, { FC } from 'react'

interface Props {
    children?: React.ReactNode;
    title: string
}

const Dropdown: FC<Props> = ({ children, title }) => {
    return (
        <>
            <select className="rounded-md select-md w-1/3 pl-2 bg-gray-50 border border-gray-400 text-sm m-1 w-1/5 ">
                <option disabled selected>{title}</option>
                {children}
            </select>
        </>
    )
}

export default Dropdown