import React, { useEffect } from "react";
import styles from "@/pages/auth/style/Index.module.css";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import { useRegister } from "@/contexts/RegisterContext";
import Dispa8chSelect from "@/lib/inputs/Dispa8chSelect";
import { getCountries } from "@yusifaliyevpro/countries";

function StepTwo() {
  const business = useRegister();
  const [countries, setCountries] = React.useState<Dispa8chSelectOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      // Fetch all countries with specific fields
      const countries = await getCountries({
        fields: ["name", "flags"],
      });
      if (countries && Array.isArray(countries)) {
        console.log(countries);

        setCountries(
          countries.map((country) => {
            return {
              label: country.name.common,
              value: country.name.common.split(" ").join("-").toLowerCase(),
              extra: country.flags.png,
            };
          })
        );
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);
  return (
    <div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Business name"
          type="text"
          placeholder="Goodwill Logistics"
          value={business?.companyName}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              companyName: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Business email"
          type="email"
          placeholder="company@example.com"
          value={business?.business_email}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              business_email: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chSelect
          options={countries}
          label="Country"
          placeholder="Select country"
          value={business?.country}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              country: value.label as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="City"
          type="text"
          placeholder="Abc County"
          value={business?.city}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              city: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Business address"
          type="text"
          placeholder="123 Ave. Abc County"
          value={business?.address}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              address: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Phone number"
          type="phone"
          placeholder="9063213825"
          value={business?.phone}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              phone: value as string,
            }));
          }}
        />
      </div>
    </div>
  );
}

export default StepTwo;
