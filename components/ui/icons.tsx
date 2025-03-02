import {
  Loader2,
  LucideProps,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export const Icons = {
  spinner: Loader2,
  google: (props: LucideProps) => (
    <FcGoogle {...props} />
  ),
}; 