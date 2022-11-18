import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import Layout from 'components/Layout'
import Input from 'components/Input'
import Dropdown from 'components/Dropdown'
import RadioButton from 'components/RadioButton'
import Button from 'components/Button'

const addMentee = () => {

    return (
        <Layout subTitle="Add New">
            <form >
                <div className="rounded shadow-lg bg-white w-full">
                    <div className='p-5'>
                        <p className='my-3 text-black'>Name</p>
                        <Input
                            id={'name'}
                            name={'name'}
                        />
                        <p className='my-3 text-black'>Address</p>
                        <Input
                            id={'address'}
                            name={'address'}
                        />
                        <p className='my-3 text-black'>Home Address</p>
                        <Input
                            id={'home_address'}
                            name={'home_address'}
                        />
                        <div className='my-3 flex'>
                            <p className='text-black mt-2'>Gender</p>
                            <div className='ml-20'>
                                <RadioButton name='Male' />
                            </div>
                            <div className='ml-20'>
                                <RadioButton name='Female' />
                            </div>
                        </div>
                        <p className='my-3 text-black'>Email</p>
                        <Input
                            id={'email'}
                            name={'email'}
                        />
                        <p className='my-3 text-black'>Telegram</p>
                        <Input
                            id={'telegram'}
                            name={'telegram'}
                        />
                        <p className='my-3 text-black'>Phone</p>
                        <Input
                            id={'phone'}
                            name={'phone'}
                        />
                    </div>
                    <div className='p-5'>
                        <p className='text-black text-lg font-bold'>Emergency</p>
                        <p className='my-3 text-black'>Name</p>
                        <Input
                            id={'emergency_name'}
                            name={'emergency_name'}
                        />
                        <p className='my-3 text-black'>Phone</p>
                        <Input
                            id={'emergency_phone'}
                            name={'emergency_phone'}
                        />
                        <p className='my-3 text-black'>Status</p>
                        <Dropdown title='status' />
                    </div>
                    <div className='p-5'>
                        <p className='text-black text-lg font-bold'>Education Data</p>
                        <div className='my-3 flex'>
                            <p className='text-black mt-2'>Type</p>
                            <div className='ml-20'>
                                <RadioButton name='Informatic' />
                            </div>
                            <div className='ml-20'>
                                <RadioButton name='Non-informatic' />
                            </div>
                        </div>
                        <p className='my-3 text-black'>Major</p>
                        <Input
                            id={'major'}
                            name={'major'}
                        />
                        <p className='my-3 text-black'>Graduate</p>
                        <Input
                            id={'graduate'}
                            name={'graduate'}
                        />
                    </div>
                    <div className='p-5 flex flex-row-reverse'>
                        <div>
                            <Button
                                label='Save'
                                id='save'
                            />
                        </div>
                        <div className='mr-5'>
                            <Button
                                label='Cancel'
                                id='cancel'
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default addMentee