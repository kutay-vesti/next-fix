import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: String;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    type="submit"
    className={`  py-3 px-5  text-white font-medium text-lg   focus:outline-none  ${
      canClick
        ? "bg-black hover:bg-gray-800"
        : "bg-gray-400 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);

export default Button;
