import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAdmin } from '../../contexts/AdminContext';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';

export function CredentialsManager() {
  const { adminUser, updateCredentials } = useAdmin();
  const [formData, setFormData] = useState({
    currentUsername: adminUser.username,
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsLoading(true);

    // Validation
    if (!formData.newUsername.trim()) {
      setMessage({ type: 'error', text: 'Username is required' });
      setIsLoading(false);
      return;
    }

    if (!formData.newPassword.trim()) {
      setMessage({ type: 'error', text: 'Password is required' });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 4) {
      setMessage({ type: 'error', text: 'Password must be at least 4 characters long' });
      setIsLoading(false);
      return;
    }

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      updateCredentials(formData.newUsername.trim(), formData.newPassword);
      setMessage({ type: 'success', text: 'Credentials updated successfully!' });
      setFormData({
        currentUsername: formData.newUsername,
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update credentials' });
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setFormData({
      currentUsername: adminUser.username,
      newUsername: '',
      newPassword: '',
      confirmPassword: ''
    });
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
        <p className="text-gray-600 text-sm">Update your admin username and password</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Credentials */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Shield className="w-5 h-5 text-blue-600" />
                Current Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-gray-900 font-medium">{adminUser.username}</span>
                  </div>
                </div>
                <div>
                  <Label className="flex items-center gap-2 text-gray-700 mb-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <span className="text-gray-500">••••••••</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Update Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Lock className="w-5 h-5 text-green-600" />
                Update Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="newUsername" className="flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4" />
                    New Username
                  </Label>
                  <Input
                    id="newUsername"
                    type="text"
                    value={formData.newUsername}
                    onChange={(e) => setFormData({ ...formData, newUsername: e.target.value })}
                    placeholder="Enter new username"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword" className="flex items-center gap-2 text-gray-700">
                    <Lock className="w-4 h-4" />
                    New Password
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-700' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      'Update Credentials'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-6">
            <h4 className="flex items-center gap-2 text-amber-800 font-semibold mb-3">
              <Shield className="w-5 h-5" />
              Security Tips
            </h4>
            <ul className="text-amber-700 text-sm space-y-2">
              <li>• Use a strong password with at least 8 characters</li>
              <li>• Include a mix of letters, numbers, and special characters</li>
              <li>• Don't use easily guessable information like names or dates</li>
              <li>• Keep your credentials secure and don't share them</li>
              <li>• Update your password regularly for better security</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}