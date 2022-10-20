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
        <div className="card w-120 h-72 flex-row justify-between bg-white shadow">
            <div className="m-5">
                <h2 className="card-title font-inter font-semibold mb-2 text-black">{section}</h2>
                <p className="font-inter font-medium mb-2 text-black">{name}</p>
                <p className='font-inter font-thin text-black'>{date}</p>
            </div>
            <div className="m-7 w-96 break-all">
                <p className="font-inter font-normal mb-2 text-black">{feedback}</p>
                <p className='font-inter font-semibold text-black'>Changed Status : {status ? status : "-"}</p>
            </div>
        </div>
    )
}

export default LogSection