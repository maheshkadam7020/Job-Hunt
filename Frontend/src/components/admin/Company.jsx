import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTablle from './CompanyTablle'
import useGetCompies from './useGetCompies'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchText } from '@/redux/companySlice'

const Company = () => {
  const { user } = useSelector((store) => store.auth)
  const { companies } = useSelector((store) => store.companies)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState("")

  useGetCompies()

  useEffect(() => {
    dispatch(setSearchText(input))
  }, [input, dispatch])

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div>
      <div className='max-w-6xl mx-auto my-10 px-4'>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5'>
          <Input
            placeholder='Filter by name'
            className='w-full sm:w-75'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate('/admin/addcompany')}
            className='w-full sm:w-fit'
          >
            New Company
          </Button>
        </div>

        <CompanyTablle companies={companies} />
      </div>
    </div>
  )
}

export default Company