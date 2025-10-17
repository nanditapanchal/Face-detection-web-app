import React from 'react';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md transform transition duration-500 hover:scale-105 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h2>
        <LoginForm />
        <p className="mt-6 text-center text-gray-500 dark:text-gray-300 text-sm">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-purple-500 dark:text-purple-400 hover:underline font-semibold transition-colors duration-300"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
