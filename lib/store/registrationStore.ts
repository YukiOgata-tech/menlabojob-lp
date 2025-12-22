import { create } from "zustand";

export interface RegistrationData {
  // Step 1
  priority?: string;

  // Step 2
  qualifications: string[];

  // Step 3
  prefecture?: string;
  fullName?: string;
  age?: string;
  phoneNumber?: string;
  email?: string;

  // Step 4
  agreeToTerms: boolean;
  applyForAgent: boolean;
}

interface RegistrationStore {
  currentStep: number;
  data: RegistrationData;
  setCurrentStep: (step: number) => void;
  setData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialData: RegistrationData = {
  qualifications: [],
  agreeToTerms: false,
  applyForAgent: false,
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  currentStep: 1,
  data: initialData,
  setCurrentStep: (step) => set({ currentStep: step }),
  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  reset: () =>
    set({
      currentStep: 1,
      data: initialData,
    }),
}));
