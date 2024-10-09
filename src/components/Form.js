import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        email: '',
        address: '',
        password: '',
        age: '' // Make sure age is part of formData
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to navigate

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validation logic for name and phone_number
        if (name === 'name' && /\d/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                name: 'Name cannot contain numbers.',
            }));
        } else if (name === 'name') {
            setErrors((prev) => ({
                ...prev,
                name: '',
            }));
        }

        if (name === 'phone_number' && /[a-zA-Z]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                phone_number: 'Phone number cannot contain letters.',
            }));
        } else if (name === 'phone_number') {
            setErrors((prev) => ({
                ...prev,
                phone_number: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Check if form is completely empty
        if (!formData.name || !formData.phone_number || !formData.email || !formData.address || !formData.password || !formData.age) {
            alert('Please fill out all fields.');
            setLoading(false);
            return;
        }

        // Check for existing errors
        if (errors.name || errors.phone_number) {
            setLoading(false);
            return;
        }

        axios
            .post('http://127.0.0.1:3000/forms', { submission: formData }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                setLoading(false);
                navigate('/submissions'); // Redirect to submissions page
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Submit Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    {errors.phone_number && <p style={{ color: 'red' }}>{errors.phone_number}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={() => navigate('/submissions')}>Go to Submissions</button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Form;
    