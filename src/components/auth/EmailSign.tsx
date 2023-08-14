import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillWarning,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

interface IProps {
  email: string;
  close: () => void;
  emailType: "new" | "old";
}

interface IPassword {
  password: string;
  confirmPassword: string;
  loginPassword: string;
}

const EmailSign = ({ email, close, emailType }: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IPassword>();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (passwords: IPassword) => {
    setIsLoading(true);
    if (emailType === "old") {
      await signInWithEmailAndPassword(auth, email, passwords.loginPassword)
        .then(async (userCredential) => {
          if (userCredential) {
            const { data } = await primaryAxios.put("user/login", {
              email: userCredential.user.email,
            });
            if (data.token) {
              localStorage.setItem("authorizationToken", data.token);
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      reset();
    } else {
      if (passwords.password === passwords.confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, passwords.password)
          .then(async (userCredential) => {
            if (userCredential) {
              const { data } = await primaryAxios.put("user/login", {
                email: userCredential.user.email,
              });
              if (data.token) {
                localStorage.setItem("authorizationToken", data.token);
              }
            }
          })
          .catch((error) => {
            setError(error.message);
          });
        reset();
      } else {
        setIsError(true);
      }
    }
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setIsError(false);
    }
  }, [password, confirmPassword]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-center h-full"
    >
      <button onClick={close} className="mb-6 text-2xl">
        <MdOutlineKeyboardBackspace />
      </button>
      {emailType === "new" ? (
        <>
          <p className="text-xl font-bold mb-3">Setup your password!</p>
          <div className="mb-3 relative">
            <input
              type={isShowPass ? "text" : "password"}
              {...register("password", {
                required: {
                  value: emailType === "new" && true,
                  message: "Please Enter Your Password",
                },
                minLength: {
                  value: 8,
                  message: "Password must 8-32 Charracter",
                },
                maxLength: {
                  value: 32,
                  message: "Password must 8-32 Charracter",
                },
              })}
              placeholder="Enter a new password"
              className={`${
                errors.password
                  ? "outline-red-500 border-red-400"
                  : "outline-blue-400/70 border-slate-300/70"
              } bg-slate-200/70 rounded-sm border-2 px-2 py-1.5 w-80`}
            />
            <button
              type="button"
              onClick={() => setIsShowPass(!isShowPass)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-xl"
            >
              {isShowPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <div className="relative">
            <input
              type={isShowPass ? "text" : "password"}
              {...register("confirmPassword", {
                required: {
                  value: emailType === "new" && true,
                  message: "Please Confirm Your Password",
                },
                minLength: {
                  value: 8,
                  message: "Password must 8-32 Charracter",
                },
                maxLength: {
                  value: 32,
                  message: "Password must 8-32 Charracter",
                },
              })}
              placeholder="Confirm new password"
              className={`${
                errors.confirmPassword
                  ? "outline-red-500 border-red-400"
                  : "outline-blue-400/70 border-slate-300/70"
              } bg-slate-200/70 rounded-sm border-2 px-2 py-1.5 w-80`}
            />
            <button
              type="button"
              onClick={() => setIsShowPass(!isShowPass)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-xl"
            >
              {isShowPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
              <AiFillWarning /> <>{errors.password.message}</>
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
              <AiFillWarning /> <>{errors.password.message}</>
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
              <AiFillWarning /> <>{errors.password.message}</>
            </p>
          )}
          {isError && (
            <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
              <AiFillWarning /> Password does not matched
            </p>
          )}
        </>
      ) : (
        <>
          {emailSent ? (
            <div className="w-80">
              <p className="text-xl text-center font-bold mb-3">Email Sent!</p>
              <p className="text-sm mb-4 bg-[#161c2c]/10 p-2 w-80 text-center rounded-lg">
                We have sent a password reset message to your email - {email}
              </p>
            </div>
          ) : (
            <>
              <p className="text-xl font-bold mb-3">Welcome!</p>
              <div className="relative">
                <input
                  type={isShowPass ? "text" : "password"}
                  {...register("loginPassword", {
                    required: {
                      value: emailType === "old" && true,
                      message: "Please Enter Your Password",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must 8-32 Charracter",
                    },
                    maxLength: {
                      value: 32,
                      message: "Password must 8-32 Charracter",
                    },
                  })}
                  placeholder="Enter your password"
                  className={`${
                    errors.confirmPassword
                      ? "outline-red-500 border-red-400"
                      : "outline-blue-400/70 border-slate-300/70"
                  } bg-slate-200/70 rounded-sm border-2 px-2 py-1.5 w-80`}
                />
                <button
                  type="button"
                  onClick={() => setIsShowPass(!isShowPass)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-xl"
                >
                  {isShowPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {errors.loginPassword?.type === "required" && (
                <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
                  <AiFillWarning /> <>{errors.loginPassword.message}</>
                </p>
              )}
              {errors.loginPassword?.type === "minLength" && (
                <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
                  <AiFillWarning /> <>{errors.loginPassword.message}</>
                </p>
              )}
              {errors.loginPassword?.type === "maxLength" && (
                <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
                  <AiFillWarning /> <>{errors.loginPassword.message}</>
                </p>
              )}
              <div className="flex justify-end w-80">
                <button
                  onClick={() => handleResetPassword()}
                  type="button"
                  className="font-bold text-blue-400"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}
        </>
      )}
      {error && (
        <p className="text-xs flex items-center gap-2 text-red-500 mt-1">
          <AiFillWarning /> {error}
        </p>
      )}
      {emailSent ? (
        <button
          onClick={() => {
            setEmailSent(false);
            close();
          }}
          className="mt-6 py-1.5 w-80 font-bold rounded-sm bg-blue-400 text-white"
        >
          Ok
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 py-1.5 w-80 font-bold rounded-sm bg-blue-400 text-white"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
          ) : (
            "Submit"
          )}
        </button>
      )}
    </form>
  );
};

export default EmailSign;
