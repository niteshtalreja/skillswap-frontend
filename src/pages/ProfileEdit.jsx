import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { updateProfile, changePassword, getCurrentUser } from '../services/userService';

export default function ProfileEdit() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', city: '', bio: '' });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await getCurrentUser();
            setUser(res.data);
        } catch (err) {
            console.error('Failed to load user', err);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await updateProfile(user);
            localStorage.setItem('user', JSON.stringify(user));
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await changePassword(passwordData);
            setSuccess('Password changed successfully!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data || 'Failed to change password');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card variant="dark">
                <h2 className="text-2xl font-heading font-bold text-white">Profile Settings</h2>

                <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                    <input
                        type="text"
                        value={user.name || ''}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                        required
                    />
                    <input
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                        required
                        disabled
                    />
                    <input
                        type="text"
                        value={user.city || ''}
                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                        placeholder="City"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                    />
                    <textarea
                        value={user.bio || ''}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        placeholder="Bio"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white min-h-[100px]"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>

                <hr className="my-6 border-border" />

                <h3 className="text-lg font-heading font-bold text-white">Change Password</h3>
                <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
                    <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                        placeholder="Current Password"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                        required
                    />
                    <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="New Password"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                        required
                    />
                    <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Confirm New Password"
                        className="w-full p-3 bg-dark border border-border rounded-lg text-white"
                        required
                    />
                    <Button type="submit" variant="outline">Change Password</Button>
                </form>

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </Card>
        </div>
    );
}