import { FC } from 'react'

interface Props {
    name?: string,
    joined_class?: string,
    major?: string,
    graduate?: string,
    phone?: number,
    telegram?: string,
    email?: string
}

const LogProfile: FC<Props> = ({ name, joined_class, major, graduate, phone, telegram, email }) => {
    return (
        <div className="card w-full h-72 flex-row justify-between bg-white shadow">
            <div className="m-7">
                <h2 className="card-title font-inter font-semibold mb-2 text-black">{name}</h2>
                <p className="font-inter font-thin mb-2 text-black">{joined_class}</p>
                <p className='font-inter font-normal text-black'>{major}</p>
                <p className='font-inter font-normal text-black'>{graduate}</p>
            </div>
            <div className="m-7 w-96 break-all my-10">
                <p className='font-inter font-normal text-black mb-2'>Phone : {phone}</p>
                <p className='font-inter font-normal text-black mb-2'>Telegram : {telegram}</p>
                <p className='font-inter font-normal text-black'>Email : {email}</p>
            </div>
        </div>
    )
}

export default LogProfile