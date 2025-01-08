import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import { AppDispatch, TypeRootState } from "@/app/appStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
