import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '@/Redux/Comment/Action'
function CommentCard({item}) {
    const dispatch=useDispatch();
    
    const handleDelete=()=>{
        // dispatch(updateIssueStatus({status,id:issueId}));
        dispatch(deleteComment(item.id));
        
    }


  return (
    <div className='justify-between flex'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>{item.user.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p>Sanj{item.user.fullName}</p>
                <p>{item.content}</p>
            </div>
        </div>
        <Button onClick={handleDelete} className='rounded-full' variant='ghost' size='icon'>
            <TrashIcon/>
        </Button>
    </div>
  )
}

export default CommentCard
