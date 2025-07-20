interface CompanyRegistrationPayload {
  companyName: string;
  business_email: string;
  country: string;
  city: string;
  phone: string;
  address: string;
  user: UserRegistrationData;
}

interface UserRegistrationData {
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  confirm_password: string;
}

interface CompanyResponse {
  id: string;
  company_name: string;
  company_country: string;
  company_city: string;
  company_phone: string;
  company_email: string;
  company_address: string;
  company_logo: string;
  company_status: string;
  verified: number;
  created_at: string;
  updated_at: string;
}
