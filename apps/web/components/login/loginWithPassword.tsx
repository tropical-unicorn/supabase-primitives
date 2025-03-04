'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),    
})      


const LoginWithPassword = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data)
    }


    return <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("password")} />  
        <button type="submit">Login</button>
  </form>;
};

export default LoginWithPassword;
