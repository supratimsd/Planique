import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader,DialogTrigger,DialogContent } from '@/components/ui/dialog'

import React from 'react'
import CreateProjectForm from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/Redux/Auth/Action'

function Navbar() {
  const {auth}=useSelector(store=>store);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogOut=()=>{
    dispatch(logout())
  }

  return (
    <div className='border-b px-4 py-5 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <p  onClick={()=>navigate("/")}className='cursor-pointer'>Project Management</p>
        <Dialog>
            <DialogTrigger>
                <Button variant='ghost'>
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Create New Project
                </DialogHeader>
                
                <CreateProjectForm/>
            </DialogContent>

        </Dialog>
        <Button onClick={()=>navigate("/upgrade_plan")} variant='ghost'>
            Upgrade Plan
        </Button>
      </div>


      <div className='flex items-center gap-3'>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant='outline' size='icon' className='rounded-full border-2 border-gray-500'>
                    <PersonIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user.fullName}</p>
      </div>
    </div>
  )
}

export default Navbar
