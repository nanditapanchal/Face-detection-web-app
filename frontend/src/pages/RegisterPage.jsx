import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-12 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Create Your Account
        </h1>
        <RegisterForm />
        <p className="mt-6 text-center text-gray-500 dark:text-gray-300 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
