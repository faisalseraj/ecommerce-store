import { SelectAsync } from "@/components/Inputs/SelectInput";

export const Roles = ({ onChange }: any) => {
  const options = [
    { value: "seller", label: "Seller" },
    { value: "buyer", label: "Buyer" },
  ];

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(options);
      }, 1000);
    });

  return <SelectAsync options={promiseOptions} onChange={onChange} />;
};
