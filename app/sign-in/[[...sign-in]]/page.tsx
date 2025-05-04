import SignInForm from "@/components/SignInForm";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { NavbarDemo } from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div>
      {/* Use the unified Navbar component */}
      <NavbarDemo />

      <main className="flex-1 flex justify-center items-center p-6">
        <SignInForm />
      </main>

      {/* Dark mode footer */}
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Storio. All rights reserved.
          </p>
        </div>
    </div>
  );
}
