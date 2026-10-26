import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  // CRITICAL: Inputs MUST be completely blank by default so no one sees credentials
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!adminId.trim() || !password) {
      setError('Please enter both Admin ID and Password.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      // Validate against the user's specific credentials
      if (adminId.trim() === 'rabbit00b' && password === 'rabbitiviqie') {
        localStorage.setItem('ivqie_admin_auth', 'true');
        localStorage.setItem('ivqie_admin_session_time', Date.now().toString());
        setIsAuthenticating(false);
        setAdminId('');
        setPassword('');
        onLoginSuccess();
      } else {
        setIsAuthenticating(false);
        setError('Invalid Admin credentials. Access denied.');
      }
    }, 400);
  };

  const handleClose = () => {
    setAdminId('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider mb-2">
          <Lock className="w-4 h-4" />
          <span>Internal Portal</span>
        </div>

        <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
          IVQIE Executive Access
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Authorized administrative portal for portfolio management, content uploads, and incoming client inquiries.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-1.5">
              Admin ID
            </label>
            <input
              type="text"
              autoComplete="off"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter administrator ID"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthenticating ? (
                <span>Verifying Secure Session...</span>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Session</span>
          </div>
          <span>Confidential</span>
        </div>
      </div>
    </div>
  );
};
