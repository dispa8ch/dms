interface RiderPreference {
  theme: "light" | "dark";
  notification_alert_mode: "email" | "sms" | "push"; // Extend if needed
  enable_push_notification: boolean;
  enable_order_status_update: boolean;
  enable_order_reminder: boolean;
  currency: string;
  language: string;
}

interface Rider {
  rider_email: string;
  rider_phone: string;
  rider_password: string;
  rider_first_name: string;
  rider_last_name: string;
  rider_other_names: string;
  rider_profile_pic: string;
  rider_preference: RiderPreference;
  rider_gender: "male" | "female";
  rider_dob: string;
  rider_means_of_id: "nin" | "driver_license" | "passport" | "voter_card"; // Extend as needed
  rider_address: string;
  rider_vehicle: "motorcycle" | "car" | "bicycle" | "truck" | string; // Extend or allow custom
  rider_vehicle_plate: string;
  rider_note: string;
  rider_availability: boolean;
  company_id: string | null;
}
