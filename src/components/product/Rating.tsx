import { useEffect, useState } from "react";
interface IProps {
  readValue?: number;
  size?: string;
}
const Rating = ({ readValue, size }: IProps) => {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (readValue) {
      setRating(readValue);
    }
  }, [readValue]);
  return (
    <div className="flex gap-1">
      {/* 1st rating  */}
      <div className="flex w-fit">
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(0.5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(0.5);
            }
          }}
        >
          <path
            d="M8 0C7.8 0 7.6 0.100313 7.5 0.300939L5.3 4.6144L0.400001 5.31659C0.300001 5.31659 0.2 5.4169 0.1 5.51721C3.7998e-07 5.61753 0 5.71784 0 5.81815C0 5.91847 0 6.01878 0 6.01878C0 6.11909 0.1 6.11909 0.1 6.2194L3.6 9.63005L2.8 14.3448C2.7 14.746 3.2 15.1473 3.5 14.9466L8 12.7397C8 12.7397 8 0.300939 8 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 0.5
                ? "fill-yellow-500"
                : hovered >= 0.5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(1);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(1);
            }
          }}
        >
          <path
            d="M0 0C0.2 0 0.4 0.100313 0.5 0.300939L2.7 4.6144L7.6 5.31659C7.7 5.31659 7.8 5.4169 7.9 5.51721C8 5.61753 8 5.71784 8 5.81815C8 5.91847 8 6.01878 8 6.01878C8 6.11909 7.9 6.11909 7.9 6.2194L4.4 9.63005L5.2 14.3448C5.3 14.746 4.8 15.1473 4.5 14.9466L0 12.7397C0 12.7397 0 0.300939 0 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 1
                ? "fill-yellow-500"
                : hovered >= 1
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
      </div>
      {/* 2nd rating  */}
      <div className="flex w-fit">
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(1.5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(1.5);
            }
          }}
        >
          <path
            d="M8 0C7.8 0 7.6 0.100313 7.5 0.300939L5.3 4.6144L0.400001 5.31659C0.300001 5.31659 0.2 5.4169 0.1 5.51721C3.7998e-07 5.61753 0 5.71784 0 5.81815C0 5.91847 0 6.01878 0 6.01878C0 6.11909 0.1 6.11909 0.1 6.2194L3.6 9.63005L2.8 14.3448C2.7 14.746 3.2 15.1473 3.5 14.9466L8 12.7397C8 12.7397 8 0.300939 8 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 1.5
                ? "fill-yellow-500"
                : hovered >= 1.5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(2);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(2);
            }
          }}
        >
          <path
            d="M0 0C0.2 0 0.4 0.100313 0.5 0.300939L2.7 4.6144L7.6 5.31659C7.7 5.31659 7.8 5.4169 7.9 5.51721C8 5.61753 8 5.71784 8 5.81815C8 5.91847 8 6.01878 8 6.01878C8 6.11909 7.9 6.11909 7.9 6.2194L4.4 9.63005L5.2 14.3448C5.3 14.746 4.8 15.1473 4.5 14.9466L0 12.7397C0 12.7397 0 0.300939 0 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 2
                ? "fill-yellow-500"
                : hovered >= 2
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
      </div>
      {/* 3rd rating  */}
      <div className="flex w-fit">
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(2.5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(2.5);
            }
          }}
        >
          <path
            d="M8 0C7.8 0 7.6 0.100313 7.5 0.300939L5.3 4.6144L0.400001 5.31659C0.300001 5.31659 0.2 5.4169 0.1 5.51721C3.7998e-07 5.61753 0 5.71784 0 5.81815C0 5.91847 0 6.01878 0 6.01878C0 6.11909 0.1 6.11909 0.1 6.2194L3.6 9.63005L2.8 14.3448C2.7 14.746 3.2 15.1473 3.5 14.9466L8 12.7397C8 12.7397 8 0.300939 8 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 2.5
                ? "fill-yellow-500"
                : hovered >= 2.5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(3);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(3);
            }
          }}
        >
          <path
            d="M0 0C0.2 0 0.4 0.100313 0.5 0.300939L2.7 4.6144L7.6 5.31659C7.7 5.31659 7.8 5.4169 7.9 5.51721C8 5.61753 8 5.71784 8 5.81815C8 5.91847 8 6.01878 8 6.01878C8 6.11909 7.9 6.11909 7.9 6.2194L4.4 9.63005L5.2 14.3448C5.3 14.746 4.8 15.1473 4.5 14.9466L0 12.7397C0 12.7397 0 0.300939 0 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 3
                ? "fill-yellow-500"
                : hovered >= 3
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
      </div>
      {/* 4th rating  */}
      <div className="flex w-fit">
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(3.5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(3.5);
            }
          }}
        >
          <path
            d="M8 0C7.8 0 7.6 0.100313 7.5 0.300939L5.3 4.6144L0.400001 5.31659C0.300001 5.31659 0.2 5.4169 0.1 5.51721C3.7998e-07 5.61753 0 5.71784 0 5.81815C0 5.91847 0 6.01878 0 6.01878C0 6.11909 0.1 6.11909 0.1 6.2194L3.6 9.63005L2.8 14.3448C2.7 14.746 3.2 15.1473 3.5 14.9466L8 12.7397C8 12.7397 8 0.300939 8 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 3.5
                ? "fill-yellow-500"
                : hovered >= 3.5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(4);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(4);
            }
          }}
        >
          <path
            d="M0 0C0.2 0 0.4 0.100313 0.5 0.300939L2.7 4.6144L7.6 5.31659C7.7 5.31659 7.8 5.4169 7.9 5.51721C8 5.61753 8 5.71784 8 5.81815C8 5.91847 8 6.01878 8 6.01878C8 6.11909 7.9 6.11909 7.9 6.2194L4.4 9.63005L5.2 14.3448C5.3 14.746 4.8 15.1473 4.5 14.9466L0 12.7397C0 12.7397 0 0.300939 0 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 4
                ? "fill-yellow-500"
                : hovered >= 4
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
      </div>
      {/* 5th rating  */}
      <div className="flex w-fit">
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(4.5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(4.5);
            }
          }}
        >
          <path
            d="M8 0C7.8 0 7.6 0.100313 7.5 0.300939L5.3 4.6144L0.400001 5.31659C0.300001 5.31659 0.2 5.4169 0.1 5.51721C3.7998e-07 5.61753 0 5.71784 0 5.81815C0 5.91847 0 6.01878 0 6.01878C0 6.11909 0.1 6.11909 0.1 6.2194L3.6 9.63005L2.8 14.3448C2.7 14.746 3.2 15.1473 3.5 14.9466L8 12.7397C8 12.7397 8 0.300939 8 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 4.5
                ? "fill-yellow-500"
                : hovered >= 4.5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
        <svg
          width={size || "10"}
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => {
            if (!readValue) {
              setHovered(5);
            }
          }}
          onMouseLeave={() => {
            if (!readValue) {
              setHovered(0);
            }
          }}
          onClick={() => {
            if (!readValue) {
              setRating(5);
            }
          }}
        >
          <path
            d="M0 0C0.2 0 0.4 0.100313 0.5 0.300939L2.7 4.6144L7.6 5.31659C7.7 5.31659 7.8 5.4169 7.9 5.51721C8 5.61753 8 5.71784 8 5.81815C8 5.91847 8 6.01878 8 6.01878C8 6.11909 7.9 6.11909 7.9 6.2194L4.4 9.63005L5.2 14.3448C5.3 14.746 4.8 15.1473 4.5 14.9466L0 12.7397C0 12.7397 0 0.300939 0 0Z"
            className={`duration-150 cursor-pointer ${
              !hovered && rating >= 5
                ? "fill-yellow-500"
                : hovered >= 5
                ? "fill-yellow-500"
                : "fill-gray-500"
            }`}
          />
        </svg>
      </div>
    </div>
  );
};

export default Rating;
