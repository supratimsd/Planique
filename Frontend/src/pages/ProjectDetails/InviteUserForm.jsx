import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inviteToProject } from "@/Redux/Project/Action";
import { useState } from "react";
// import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// function InviteUserForm() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const form = useForm({
//     // resolver:Zod
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = (data) => {
//     dispatch(inviteToProject({ email: data.email, projectId: id }));
//     console.log("create project data", data);
//   };
//   return (
//     <div>
//       <Form {...form}>
//         <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="text"
//                     className="boredr w-full border-gray-700 px-5 py-5"
//                     placeholder="user email"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <DialogClose>
//             <Button type="submit" className="w-full my-5">
//               Invite User
//             </Button>
//           </DialogClose>
//         </form>
//       </Form>
//     </div>
//   );
// }


function InviteUserForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      await dispatch(inviteToProject({ email: data.email, projectId: id }));
      // Optional: Add a success toast or close dialog
      form.reset(); // Reset form after successful submission
    } catch (error) {
      // Handle error
      setError(error.response?.data?.message || "Failed to invite user");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="boredr w-full border-gray-700 px-5 py-5"
                    placeholder="user email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <DialogClose>
            <Button type="submit" className="w-full my-5">
              Invite User
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}

export default InviteUserForm;



