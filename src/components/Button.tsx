import React, { FC } from 'react'

interface Props {
    type: string,
    fill?: boolean,
    unfill?: boolean,
    inactive?: boolean,
    title: string,
    onClick?: React.MouseEventHandler
}

const Button: FC<Props> = ({ type, fill, unfill, inactive, title, onClick }) => {
    return (
        <>
            {
                type === "short" ?
                    <button className={
                        fill ? "rounded-xl bg-alta-orange font-inter font-bold text-white text-xs h-10 w-20" :
                            unfill ? "rounded-xl bg-white border border-alta-orange font-inter font-bold text-alta-orange text-xs h-10 w-20 " :
                                inactive ? "rounded-xl bg-alta-border font-inter font-bold text-white text-xs h-10 w-20" : ""
                    } onClick={onClick}>
                        {title}
                    </button>
                    :
                    <>
                        {
                            type === "long" &&
                            <button className='rounded-xl bg-alta-orange font-inter font-bold text-white text-xs h-10 w-40' onClick={onClick}>
                                {title}
                            </button>
                        }
                    </>
            }
        </>
    )
}

export default Button