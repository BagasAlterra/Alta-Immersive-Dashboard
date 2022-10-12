import React, { FC } from 'react'

interface Props {
    type: string,
    fill?: boolean,
    unfill?: boolean,
    inactive?: boolean,
    title: string,
    onClick?: React.MouseEventHandler
}

const Button: FC<Props> = ({ type, fill, unfill, inactive, onClick, title }) => {
    return (
        <>
            {
                type === 'short' ?
                    <>
                        {
                            fill ?
                                <button className='rounded-xl bg-alta-orange font-rotunda-bold text-white text-xs h-10 w-20' onClick={onClick}>
                                    {title}
                                </button> :
                                <>
                                    {unfill ?
                                        <button className='rounded-xl bg-white border border-alta-orange font-rotunda-bold text-alta-orange text-xs h-10 w-20 ' onClick={onClick}>
                                            {title}
                                        </button> :
                                        <>
                                            {inactive &&
                                                <button className='rounded-xl bg-alta-border font-rotunda-bold text-white text-xs h-10 w-20'>
                                                    {title}
                                                </button>
                                            }
                                        </>
                                    }
                                </>
                        }
                    </> :
                    <>
                        {
                            type === 'long' &&
                            <button className='rounded-xl bg-alta-orange font-rotunda-bold text-white text-xs h-10 w-40' onClick={onClick}>
                                {title}
                            </button>
                        }
                    </>
            }
        </>
    )
}

export default Button