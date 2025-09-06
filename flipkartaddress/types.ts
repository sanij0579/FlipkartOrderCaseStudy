// types.ts
export type RootStackParamList = {
  AddAddress: undefined;
  Payment: { mobile: string };
  OTPVerification: { mobile: string };
  BookingSuccess: undefined;
  BookingConfirmation: undefined; // 👈
};