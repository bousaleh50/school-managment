"use client"

import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { axiosClient } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30)
})


function StudentsLogin() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "bousalehahmed@gmail.com",
          password: "123456789",
        },
    })
     
      
      const onSubmit= async (values)=>{
        await axiosClient.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        const data = await axiosClient.post("http://127.0.0.1:8000/api/login",values);
        if(data.status === 204){
          navigate("/")
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    
}

export default StudentsLogin;