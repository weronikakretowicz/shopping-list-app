import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Wywołaj endpoint rejestracji (POST /users/register) z danymi formData
        console.log('Register data:', formData);
        // Po udanej rejestracji możesz np. przekierować na stronę logowania:
        // navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-form-box">
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="John Tener"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="JohnTener@the8.design"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="*******"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="*******"
                            required
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <button onClick={() => navigate('/login')}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
