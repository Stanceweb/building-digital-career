// === FILE: app/register/page.tsx ===

import type { Metadata } from "next";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata: Metadata = {
  title: "Register — Building a Digital Career",
  description:
    "Sign up for the free digital skills workshop at CGMI Ihiagwa, Imo State. 18th – 20th June 2025. Choose from 15 skill tracks.",
};

/** Entry page — renders the multi-step registration form. */
const RegisterPage = () => {
  return <RegistrationForm />;
};

export default RegisterPage;
