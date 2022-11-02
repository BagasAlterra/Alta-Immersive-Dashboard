import { FC } from 'react'

interface Props {
    section?: string,
    name?: string,
    date?: any,
    status?: string,
    feedback?: string
}

const LogSection: FC<Props> = ({ section, name, date, status, feedback }) => {
    return (
        <div className="card justify-between bg-white shadow
         lg:w-120 lg:h-72 md:w-120 md:h-72 w-30
         lg:flex-row md:flex-row sm:flex-row ">
            <div className="m-5">
                <h2 className="card-title font-inter font-semibold mb-2 text-black">{section}</h2>
                <p className="font-inter font-medium mb-2 text-black">{name}</p>
                <p className='font-inter font-thin text-black'>{date}</p>
            </div>
            <div className=" break-all lg:m-7 lg:w-96 md:m-7 md:w-96 sm:m-7 sm:w-96 m-7">
                <p className="font-inter font-normal mb-2 text-black">{feedback}</p>
                <p className='font-inter font-semibold text-black'>Changed Status : {status ? status : "-"}</p>
            </div>
        </div>
    )
}

export default LogSection