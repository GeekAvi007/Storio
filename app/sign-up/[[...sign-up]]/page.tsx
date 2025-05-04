import SignUpForm from "@/components/SignUpForm";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { NavbarDemo } from "@/components/Navbar";

export default function SignUpPage() {
  return (
    <div >
      {/* Use the unified Navbar component */}
      <NavbarDemo />

      <main className="flex-1 flex justify-center items-center p-6 mb-30">
        <SignUpForm />
      </main>

    </div>
  );
}
