import { createContext, useContext, useState } from "react";

export const RegisterContext = createContext<
  | (CompanyRegistrationPayload & {
      setRegisterPayload: React.Dispatch<
        React.SetStateAction<CompanyRegistrationPayload>
      >;
    })
  | null
>(null);

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [registerPayload, setRegisterPayload] =
    useState<CompanyRegistrationPayload>({
      companyName: "",
      business_email: "",
      country: "",
      city: "",
      phone: "",
      address: "",
      user: {
        first_name: "",
        last_name: "",
        user_email: "",
        user_password: "",
        confirm_password: "",
      },
    });

  return (
    <RegisterContext.Provider
      value={{ ...registerPayload, setRegisterPayload }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  try {
    const context = useContext(RegisterContext);
    if (!context) throw new Error("Please use inside a provider");
    return context;
  } catch (err) {
    throw new Error("Please use inside of RegisterProvider");
  }
}

export default RegisterProvider;
