import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';

import { User, Lock, Mail, UserCircle, ChevronDown } from 'lucide-react';

const Register = () => {
    const [loading,setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/register', {
          name,
          email,
          password,
          role,
        });
  
        console.log(response.data);
  setLoading(false)
        setName('');
        setEmail('');
        setPassword('');
        toast.success(response.data.message);
        navigate('/login');
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
        console.log(error);
       
      }
  
      console.log('Registration data:', { name, email, password, role });
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex animate-fade-in">
          {/* Image Section */}
          <div className="hidden md:block w-1/2 relative group overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?t=st=1737807234~exp=1737810834~hmac=ce989720bef237d92eb68efc456a9626471d4ca1df339ddaac36bf0d28827ef9&w=826"
              alt="Workspace"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Join Our Community</h3>
              <p className="text-lg opacity-90">Start your journey with us today</p>
            </div>
          </div>
    
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'password'].map((field, index) => (
                <div
                  key={field}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {field === 'name' && <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300" />}
                  {field === 'email' && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300" />}
                  {field === 'password' && <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300" />}
                  <input
                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={
                      field === 'name' ? 'Full Name' :
                      field === 'email' ? 'Email Address' :
                      'Password'
                    }
                    value={field === 'name' ? name : field === 'email' ? email : password}
                    onChange={(e) => {
                      if (field === 'name') setName(e.target.value);
                      if (field === 'email') setEmail(e.target.value);
                      if (field === 'password') setPassword(e.target.value);
                    }}
                    className="w-full pl-12 pr-4 py-4 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  />
                </div>
              ))}
    
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl appearance-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
    
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  'Sign Up Now'
                )}
              </button>
            </form>
    
            <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-purple-600 font-semibold hover:text-purple-800 transition-colors duration-300"
                >
                  Sign In Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    
  }


export default Register