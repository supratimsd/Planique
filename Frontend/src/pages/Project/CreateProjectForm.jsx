import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { tags } from '../ProjectList/ProjectList'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
// import { create } from 'domain'
import { createProjects } from '@/Redux/Project/Action'

function CreateProjectForm() {
    const dispatch=useDispatch();
    const handleTagsChange=(newValue)=>{
        const currentTags=form.getValues('tags')
        const updatedTags=currentTags.includes(newValue)?currentTags.filter(tag=>tag!==newValue):[...currentTags,newValue];
        form.setValue('tags',updatedTags);
    }
    const form=useForm({
        // resolver:Zod
        defaultValues:{
            name:"",
            description:"",
            category:"",
            tags:["javascript","react"]
        }
    })

    const onSubmit=(data)=>{
        dispatch(createProjects(data));
        console.log("create project data",data);
    }
  return (
    <div>
      <Form {...form}>
        <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name="name"
                render={({field})=><FormItem>
                <FormControl>
                   <Input {...field}
                   type="text"
                   className='boredr w-full border-gray-700 px-5 py-5'
                   placeholder="Project Name"
                   /> 
                   
                   
                </FormControl>
                <FormMessage/>
                </FormItem>}
            />

            <FormField 
                control={form.control}
                name="description"
                render={({field})=><FormItem>
                <FormControl>
                   <Input {...field}
                   type="text"
                   className='boredr w-full border-gray-700 px-5 py-5'
                   placeholder="Project Description"
                   /> 
                   
                   
                </FormControl>
                <FormMessage/>
                </FormItem>}
            />

            <FormField control={form.control}
                name="category"
                render={({field})=>(<FormItem>
                    <FormControl>
                        <Select 
                            defaultValue='fullstack'
                            value={field.value}
                            onValueChange={(value)=>{field.onChange(value)}}
                            // className='boredr w-full border-gray-700 px-5 py-5'
                            
                        >
                            
                        

                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="category"/>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value='fullstack'>Full Stack</SelectItem>
                            <SelectItem value='frontend'>Frontend</SelectItem>
                            <SelectItem value='backend'>Backend</SelectItem>
                        </SelectContent>

                        </Select>

                        
                   
                    </FormControl>
                    <FormMessage/>
                    </FormItem>)}
            />

            <FormField control={form.control}
                name="tags"
                render={({field})=>(<FormItem>
                    <FormControl>
                        <Select 
                            // defaultValue='spring boot'
                            // value={field.value}
                            onValueChange={(value)=>{handleTagsChange(value)}}
                            
                        >

                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Tags"/>
                        </SelectTrigger>

                        <SelectContent>
                            {tags.map((item)=><SelectItem key={item} value={item}>{item}</SelectItem>)}
                        </SelectContent>

                        </Select>

                        
                   
                    </FormControl>
                    <div className='flex flex-wrap gap-1'>
                        {field.value.map((item)=><div key={item} onClick={()=>handleTagsChange(item)} className='cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1'>
                            <span className='text-sm'>{item}</span>
                            <Cross1Icon className='h-3 w-3'/>
                        </div>)}
                    </div>
                    <FormMessage/>
                    </FormItem>)}
            />


            <DialogClose>
                {false?( <div><p>you can create only 3 projects with free plan,please upgrade your plan for more projects</p></div>):(<Button type='submit' className='w-full my-5'>Create Project</Button>)}
            </DialogClose>

        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
