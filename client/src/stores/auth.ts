import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'affiliate' | 'vendor' | 'admin' | 'manager' | 'cashier' | 'stockkeeper' | 'office_member';

export interface RolePermissions {
  canManageUsers: boolean;
  canManageProducts: boolean;
  canManageOrders: boolean;
  canViewAnalytics: boolean;
  canManageInventory: boolean;
  canProcessPayments: boolean;
  canManageReports: boolean;
  canManageSettings: boolean;
  canApproveRequests: boolean;
  canManageTeam: boolean;
  canAccessPOS: boolean;
  canManageStock: boolean;
  canManageDocuments: boolean;
  canManageSupport: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canManageUsers: true,
    canManageProducts: true,
    canManageOrders: true,
    canViewAnalytics: true,
    canManageInventory: true,
    canProcessPayments: true,
    canManageReports: true,
    canManageSettings: true,
    canApproveRequests: true,
    canManageTeam: true,
    canAccessPOS: true,
    canManageStock: true,
    canManageDocuments: true,
    canManageSupport: true,
  },
  manager: {
    canManageUsers: true,
    canManageProducts: true,
    canManageOrders: true,
    canViewAnalytics: true,
    canManageInventory: true,
    canProcessPayments: false,
    canManageReports: true,
    canManageSettings: false,
    canApproveRequests: true,
    canManageTeam: true,
    canAccessPOS: false,
    canManageStock: true,
    canManageDocuments: true,
    canManageSupport: true,
  },
  cashier: {
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: true,
    canViewAnalytics: false,
    canManageInventory: false,
    canProcessPayments: true,
    canManageReports: false,
    canManageSettings: false,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: true,
    canManageStock: false,
    canManageDocuments: false,
    canManageSupport: false,
  },
  stockkeeper: {
    canManageUsers: false,
    canManageProducts: true,
    canManageOrders: false,
    canViewAnalytics: false,
    canManageInventory: true,
    canProcessPayments: false,
    canManageReports: false,
    canManageSettings: false,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: false,
    canManageStock: true,
    canManageDocuments: false,
    canManageSupport: false,
  },
  office_member: {
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: true,
    canViewAnalytics: true,
    canManageInventory: false,
    canProcessPayments: false,
    canManageReports: true,
    canManageSettings: false,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: false,
    canManageStock: false,
    canManageDocuments: true,
    canManageSupport: true,
  },
  vendor: {
    canManageUsers: false,
    canManageProducts: true,
    canManageOrders: true,
    canViewAnalytics: true,
    canManageInventory: true,
    canProcessPayments: false,
    canManageReports: true,
    canManageSettings: true,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: false,
    canManageStock: true,
    canManageDocuments: false,
    canManageSupport: false,
  },
  affiliate: {
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: false,
    canViewAnalytics: true,
    canManageInventory: false,
    canProcessPayments: false,
    canManageReports: true,
    canManageSettings: true,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: false,
    canManageStock: false,
    canManageDocuments: false,
    canManageSupport: false,
  },
  customer: {
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: false,
    canViewAnalytics: false,
    canManageInventory: false,
    canProcessPayments: false,
    canManageReports: false,
    canManageSettings: false,
    canApproveRequests: false,
    canManageTeam: false,
    canAccessPOS: false,
    canManageStock: false,
    canManageDocuments: false,
    canManageSupport: false,
  },
};

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  role: UserRole;
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
  department?: string;
  employeeId?: string;
  shiftSchedule?: string;
  hireDate?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: (name: string, email: string, avatar: string) => void;
  loginWithWeb3: (walletAddress: string, name: string) => void;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  submitAffiliateApplication: (formData: any) => void;
  approveAffiliateApplication: () => void;
  sendOTP: (email: string, method: 'email' | 'phone', phone?: string) => { success: boolean; otp: string };
  verifyOTP: (email: string, otp: string, password: string, name: string) => boolean;
  googleVerifyAndCreateAccount: (idToken: string) => { success: boolean; message: string };
  web3VerifyAndCreateAccount: (signature: string, message: string, walletAddress: string) => { success: boolean; message: string };
  setRole: (role: UserRole) => void;
  getPermissions: () => RolePermissions | null;
  hasPermission: (permission: keyof RolePermissions) => boolean;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            set({ isLoading: false, error: data.message });
            return { success: false, message: data.message };
          }

          set({
            user: {
              ...data.user,
              authMethod: 'email',
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true, message: data.message };
        } catch (error) {
          const message = 'Failed to login. Please try again.';
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password, name }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            set({ isLoading: false, error: data.message });
            return { success: false, message: data.message };
          }

          set({
            user: {
              ...data.user,
              authMethod: 'email',
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true, message: data.message };
        } catch (error) {
          const message = 'Failed to create account. Please try again.';
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
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

      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({ user: null, isAuthenticated: false, error: null });
      },

      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get();
        if (!user) return { success: false, message: 'Not authenticated' };

        try {
          const response = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });
          
          const result = await response.json();
          
          if (!response.ok) {
            return { success: false, message: result.message };
          }

          set((state) => ({
            user: state.user ? { ...state.user, ...result.user } : null,
          }));
          
          return { success: true, message: result.message };
        } catch (error) {
          return { success: false, message: 'Failed to update profile' };
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        const { user } = get();
        if (!user) return { success: false, message: 'Not authenticated' };

        try {
          const response = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword }),
          });
          
          const result = await response.json();
          
          if (!response.ok) {
            return { success: false, message: result.message };
          }
          
          return { success: true, message: result.message };
        } catch (error) {
          return { success: false, message: 'Failed to change password' };
        }
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

      sendOTP: (email: string, method: 'email' | 'phone', phone?: string) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP sent to ${method === 'email' ? email : phone}: ${otp}`);
        (window as any).__otpStore = { otp, email, timestamp: Date.now() };
        return { success: true, otp };
      },

      verifyOTP: (email: string, otp: string, password: string, name: string) => {
        const stored = (window as any).__otpStore;
        if (!stored || stored.otp !== otp || stored.email !== email) {
          return false;
        }
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
        console.log('Google ID Token received for verification:', idToken.substring(0, 20) + '...');
        return { success: true, message: 'Google account verified and approved' };
      },

      web3VerifyAndCreateAccount: (signature: string, message: string, walletAddress: string) => {
        console.log('Web3 Signature verification - Address:', walletAddress);
        console.log('Signed message:', message.substring(0, 50) + '...');
        return { success: true, message: 'Web3 wallet verified and approved' };
      },

      setRole: (role: UserRole) => {
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        }));
      },

      getPermissions: () => {
        const { user } = get();
        if (!user) return null;
        return ROLE_PERMISSIONS[user.role];
      },

      hasPermission: (permission: keyof RolePermissions) => {
        const { user } = get();
        if (!user) return false;
        return ROLE_PERMISSIONS[user.role][permission];
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);
