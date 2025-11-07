import { ConfirmContext } from "@/context/confirm/ConfirmContext";
import { useContext } from "react";

export const useConfirm = () => useContext(ConfirmContext)