import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/auth/register', data);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Name" {...register('name')} className="border w-full p-2 mb-2" />
      <p className="text-red-500">{errors.name?.message}</p>
      <input type="email" placeholder="Email" {...register('email')} className="border w-full p-2 mb-2" />
      <p className="text-red-500">{errors.email?.message}</p>
      <input type="password" placeholder="Password" {...register('password')} className="border w-full p-2 mb-2" />
      <p className="text-red-500">{errors.password?.message}</p>
      <button type="submit" className="bg-green-600 text-white w-full py-2 mt-3">Register</button>
    </form>
  );
}
