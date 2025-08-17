import { colors } from "./style";

export const icons = {
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" fill={colors.font} />
      <path
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 8l8 8M16 8l-8 8"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" fill={colors.secondary} />
      <path
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 16v-4m0-4h.01"
      />
    </svg>
  ),
  danger: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" fill={colors.red} />
      <path
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v4m0 4h.01"
      />
    </svg>
  ),
};
