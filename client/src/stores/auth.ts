import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: 'customer' | 'affiliate' | 'vendor' | 'admin';
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  bankAccount?: string;
  taxId?: string;
  affiliateApplied?: boolean;
  affiliateApprovedAt?: string;
  authMethod?: 'email' | 'google' | 'web3';
  walletAddress?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  loginWithGoogle: (name: string, email: string, avatar: string) => void;
  loginWithWeb3: (walletAddress: string, name: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  submitAffiliateApplication: (formData: any) => void;
  approveAffiliateApplication: () => void;
  // OTP Verification
  sendOTP: (email: string, method: 'email' | 'phone', phone?: string) => { success: boolean; otp: string };
  verifyOTP: (email: string, otp: string, password: string, name: string) => boolean;
  googleVerifyAndCreateAccount: (idToken: string) => { success: boolean; message: string };
  web3VerifyAndCreateAccount: (signature: string, message: string, walletAddress: string) => { success: boolean; message: string };
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role: 'customer',
            authMethod: 'email',
          },
          isAuthenticated: true,
        });
      },
      signup: (email: string, password: string, name: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            role: 'customer',
            authMethod: 'email',
          },
          isAuthenticated: true,
        });
      },
      loginWithGoogle: (name: string, email: string, avatar: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            avatar,
            role: 'customer',
            authMethod: 'google',
          },
          isAuthenticated: true,
        });
      },
      loginWithWeb3: (walletAddress: string, name: string) => {
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email: `${walletAddress}@web3.local`,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`,
            role: 'customer',
            authMethod: 'web3',
            walletAddress,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
      submitAffiliateApplication: (formData: any) => {
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            affiliateApplied: true,
            phone: formData.phone || state.user.phone,
            address: formData.address || state.user.address,
            city: formData.city || state.user.city,
            country: formData.country || state.user.country,
            postalCode: formData.postalCode || state.user.postalCode,
            bankAccount: formData.bankAccount,
            taxId: formData.taxId,
          } : null,
        }));
      },
      approveAffiliateApplication: () => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            role: 'affiliate',
            affiliateApprovedAt: new Date().toISOString(),
          } : null,
        }));
      },
      // OTP Verification Flow
      sendOTP: (email: string, method: 'email' | 'phone', phone?: string) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // In production: Send via SendGrid/Resend (email) or Twilio (SMS)
        console.log(`OTP sent to ${method === 'email' ? email : phone}: ${otp}`);
        // Store OTP temporarily (in production: store in database with expiry)
        (window as any).__otpStore = { otp, email, timestamp: Date.now() };
        return { success: true, otp };
      },
      verifyOTP: (email: string, otp: string, password: string, name: string) => {
        // Verify OTP
        const stored = (window as any).__otpStore;
        if (!stored || stored.otp !== otp || stored.email !== email) {
          return false;
        }
        // OTP verified - create account
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            role: 'customer',
            authMethod: 'email',
          },
          isAuthenticated: true,
        });
        return true;
      },
      googleVerifyAndCreateAccount: (idToken: string) => {
        // In production: Verify idToken with Google API
        // For demo: Assume verification succeeds
        return { success: true, message: 'Google account verified and approved' };
      },
      web3VerifyAndCreateAccount: (signature: string, message: string, walletAddress: string) => {
        // In production: Verify signature with ethers.js
        // For demo: Assume verification succeeds
        return { success: true, message: 'Web3 wallet verified and approved' };
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
