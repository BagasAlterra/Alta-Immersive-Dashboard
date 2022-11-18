import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import Layout from 'components/Layout'
import Input from 'components/Input'
import Dropdown from 'components/Dropdown'
import RadioButton from 'components/RadioButton'
import Button from 'components/Button'

const addMentee = () => {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
    }

    return (
        <Layout subTitle="Add New">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="rounded shadow-lg bg-white w-full">
                    <div className='p-5'>
                        <p className='my-3 text-black'>Name</p>
                        <Input label='Name' id={'name'} name={'name'} register={register} required
                        />
                        <p className='my-3 text-black'>Address</p>
                        <Input label='Address' id={'address'} name={'address'} register={register} required
                        />
                        <p className='my-3 text-black'>Home Address</p>
                        <Input label='Home Address' id={'home_address'} name={'home_address'} register={register} required
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
                        <Input label='Email' id={'email'} name={'email'} register={register} required
                        />
                        <p className='my-3 text-black'>Telegram</p>
                        <Input label='Telegram' id={'telegram'} name={'telegram'} register={register} required
                        />
                        <p className='my-3 text-black'>Phone</p>
                        <Input label='Phone' id={'phone'} name={'phone'} register={register} required
                        />
                    </div>
                    <div className='p-5'>
                        <p className='text-black text-lg font-bold'>Emergency</p>
                        <p className='my-3 text-black'>Name</p>
                        <Input label='Emergency Name' id={'emergency_name'} name={'emergency_name'} register={register} required
                        />
                        <p className='my-3 text-black'>Phone</p>
                        <Input label='Emergency Phone' id={'emergency_phone'} name={'emergency_phone'} register={register} required
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
                        <Input label='Major' id={'major'} name={'major'} register={register} required
                        />
                        <p className='my-3 text-black'>Graduate</p>
                        <Input label='Graduate' id={'graduate'} name={'graduate'} register={register} required
                        />
                    </div>
                    <div className='p-5 flex flex-row-reverse'>
                        <div>
                            <Button type='submit' label='Save' id='save'
                            />
                        </div>
                        <div className='mr-5'>
                            <Button variant='secondary' label='Cancel' id='cancel'
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default addMentee