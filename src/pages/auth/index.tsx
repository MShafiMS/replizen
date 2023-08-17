import EmailSign from "@/components/auth/EmailSign";
import UnauthenticatedPage from "@/components/auth/UnauthenticatedPage";
import VerifyForm from "@/components/auth/VerifyForm";
import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Comfortaa } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillWarning, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiBadgeCheck } from "react-icons/bi";
import { PiTruck } from "react-icons/pi";

const comforta = Comfortaa({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [emailType, setEmailType] = useState<"new" | "old">("new");
  const [confirmationResult, setConfirmationResult] = useState<any>();
  const [isMethod, setIsMethod] = useState<"phone" | "email" | undefined>(
    undefined
  );
  const [isDataType, setDataType] = useState<"phone" | "email" | undefined>(
    undefined
  );

  const authData = watch("emailOrPhone");

  const handleSendCode = async (phone: string) => {
    const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "normal",
    });

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      setPhoneNum(phone);
      setIsMethod("phone");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (user: any) => {
    if (isDisabled) {
      setIsError(true);
    } else {
      setIsLoading(true);
      if (isDataType === "phone") {
        await handleSendCode("+88" + user.emailOrPhone);
      } else {
        const { data } = await primaryAxios.get(
          `user/login?email=${user.emailOrPhone}`
        );
        setIsEmail(user.emailOrPhone);
        if (data.success) {
          setEmailType("old");
        }
        setIsMethod("email");
      }
      reset();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(authData)) {
      setDataType("email");
      setIsDisabled(false);
      setIsError(false);
    } else if (/^01[3-9]\d{8}$/.test(authData)) {
      setDataType("phone");
      setIsDisabled(false);
      setIsError(false);
    } else {
      setDataType(undefined);
      setIsDisabled(true);
    }
  }, [authData]);

  return (
    <UnauthenticatedPage>
      <div className={comforta.className}>
        <div className="pt-24 pb-10 lg:px-14 px-4 w-full h-[60vh] lg:h-screen flex lg:flex-row flex-col justify-center">
          {isMethod ? (
            <>
              {isMethod === "phone" && (
                <VerifyForm
                  confirmationResult={confirmationResult}
                  phone={phoneNum}
                  close={() => setIsMethod(undefined)}
                />
              )}
              {isMethod === "email" && (
                <EmailSign
                  email={isEmail}
                  close={() => setIsMethod(undefined)}
                  emailType={emailType}
                />
              )}
            </>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col lg:items-start items-center justify-center h-full"
            >
              <div className="mb-6">
                <p className="text-xl font-bold mb-3">
                  Continue with Mobile/Email
                </p>
                <input
                  type="text"
                  {...register("emailOrPhone", {
                    required: {
                      value: true,
                      message: "Please Enter Your Email/Phone",
                    },
                  })}
                  placeholder="01XXXXXXXXX"
                  className={`${
                    isError
                      ? "outline-red-500 border-red-400"
                      : "outline-blue-400/70 border-slate-300/70"
                  } bg-slate-200/70 rounded-sm border-2 px-2 py-1.5 w-80`}
                />

                {errors.emailOrPhone?.type ? (
                  <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
                    <AiFillWarning /> <>{errors.emailOrPhone.message}</>
                  </p>
                ) : (
                  <>
                    {isError && (
                      <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
                        <AiFillWarning /> Your Phone/Email is not correct
                      </p>
                    )}
                  </>
                )}
              </div>
              <div id="recaptcha-container"></div>
              <button
                type="submit"
                disabled={isLoading}
                className={`py-1.5 w-80 font-bold rounded-sm ${
                  isDisabled
                    ? "bg-slate-400 text-white"
                    : "bg-blue-400 text-white"
                }`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}
          <div className="w-full h-full lg:block hidden bg-[url(https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80)] bg-cover bg-center rounded-3xl">
            <div
              className={`bg-black/40 w-full h-full flex flex-col justify-end items-center text-gray-200 rounded-3xl px-8 ${comforta.className}`}
            >
              <h1 className="text-center text-2xl font-thin">
                Explore, Shop, Thrive <br /> Where Dreams Come Home!
              </h1>
              <p className="font-thin text-center text-sm my-2">
                Explore our handpicked treasures, carefully curated to elevate
                your style. Discover the latest trends, and make every day a
                fashion statement.
              </p>
              <div className="flex gap-4 items-center mb-10">
                <div className="w-fit flex gap-2 items-center border px-4 py-1.5 rounded-3xl">
                  <BiBadgeCheck size={22} /> 100% Guarantee
                </div>
                <div className="w-fit flex gap-2 items-center border px-4 py-1.5 rounded-3xl">
                  <PiTruck size={22} /> Free delivery Dhaka area
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnauthenticatedPage>
  );
};

export default Login;
