import React, { ChangeEventHandler, FC } from 'react'

interface Props {
    size: string,
    outline: boolean,
    id?: string,
    placeholder: string,
    type: string,
    onChange?: ChangeEventHandler
}

const Input: FC<Props> = ({ size, placeholder, type, id, outline, onChange }) => {
    return (
        <>
            {
                outline === true ?
                    <>
                        {
                            size === "long" ?
                                <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md h-9 w-5/6 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                :
                                <>
                                    {
                                        size === "medium" ?
                                            <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md h-9 w-1/3 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                            :
                                            <>
                                                {
                                                    size === "small" ?
                                                        <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md h-9 w-1/5 pl-2" tabIndex={-1} placeholder={placeholder}></input> :
                                                        <>
                                                            {
                                                                size === "xtra-small" &&
                                                                <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md h-9 w-1/6 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                        }
                    </>
                    :
                    <>
                        {
                            size === "long" ?
                                <input onChange={onChange} type={type} id={id} className="bg-gray-50 text-gray-900 text-sm rounded-md h-9 w-5/6 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                :
                                <>
                                    {
                                        size === "medium" ?
                                            <input onChange={onChange} type={type} id={id} className="bg-gray-50 text-gray-900 text-sm rounded-md h-9 w-1/3 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                            :
                                            <>
                                                {
                                                    size === "small" ?
                                                        <input onChange={onChange} type={type} id={id} className="bg-gray-50 text-gray-900 text-sm rounded-md h-9 w-1/5 pl-2" tabIndex={-1} placeholder={placeholder}></input> :
                                                        <>
                                                            {
                                                                size === "xtra-small" &&
                                                                <input onChange={onChange} type={type} id={id} className="bg-gray-50 text-gray-900 text-sm rounded-md h-9 w-1/6 pl-2" tabIndex={-1} placeholder={placeholder}></input>
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                        }
                    </>
            }
        </>
    )
}

export default Input