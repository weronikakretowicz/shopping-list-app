import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Wywołaj endpoint logowania (POST /users/login) z danymi formData
        console.log('Login data:', formData);
        // Po udanym logowaniu możesz np. zapisać token w localStorage i przekierować na stronę główną:
        // localStorage.setItem('token', response.token);
        // navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-form-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
