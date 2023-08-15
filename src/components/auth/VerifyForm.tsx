import primaryAxios from "@/utils/primaryAxios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import OTPInput from "react-otp-input";

interface IProps {
  phone: string;
  confirmationResult: any;
  close: () => void;
}

const VerifyForm = ({ confirmationResult, phone, close }: IProps) => {
  const [code, setCode] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (codes: string) => setCode(codes);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await confirmationResult
        .confirm(code)
        .then(async (userCredential: any) => {
          if (userCredential) {
            const { data } = await primaryAxios.put("user/login", {
              phone: userCredential.user.phoneNumber.slice(1),
            });
            if (data) {
              console.log(data);
            }
            if (data.token) {
              localStorage.setItem("authorizationToken", data.token);
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (code.length === 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [code]);

  return (
    <div className="w-full flex flex-col items-start justify-center h-full">
      <button onClick={close} className="mb-6 text-2xl">
        <MdOutlineKeyboardBackspace />
      </button>
      <div className="mb-6">
        <p className="text-xl font-bold mb-3">Verify Phone Number</p>
        <p className="text-sm mb-4 bg-[#161c2c]/10 py-2 w-80 text-center rounded-lg">
          We have sent a verification code to your phone -{" "}
          {phone || "01XXXXXXXXXX"}
        </p>
        <OTPInput
          value={code}
          onChange={handleChange}
          numInputs={6}
          renderSeparator={<span className="mx-1.5" />}
          renderInput={(props) => <input id="otp-input" {...props} />}
          shouldAutoFocus
          inputType="number"
          inputStyle={{
            border: "2px solid #94A3B8",
            backgroundColor: "#F6F6F6",
            borderRadius: "4px",
            width: "43px",
            height: "43px",
            fontSize: "18px",
            color: "#000",
            fontWeight: "400",
            outlineColor: "#60A5FA",
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || isDisabled}
        className={`py-1.5 w-80 font-bold rounded-sm ${
          isDisabled ? "bg-slate-400 text-white" : "bg-blue-400 text-white"
        }`}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default VerifyForm;
