"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { ChevronDown, User } from "lucide-react";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

export function NavbarDemo({ user }: NavbarProps) {


  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard");

  const userDetails = {
    initials:
      user?.firstName?.[0]?.toUpperCase() ??
      user?.emailAddress?.[0]?.toUpperCase() ??
      "U",
    displayName:
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.firstName || user?.username || user?.emailAddress || "",
    email: user?.emailAddress || "",
  };

  const handleSignOut = () => {
    signOut(() => router.push("/"));
  };

  return (
    <div className="relative w-full mt-5">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <NavbarButton variant="secondary">Sign In</NavbarButton>
              </Link>
              <Link href="/sign-up">
                <NavbarButton variant="primary">Sign Up</NavbarButton>
              </Link>
            </SignedOut>
            <SignedIn>
              {!isOnDashboard && (
                <Link href="/dashboard">
                  <button className="w-40 h-10 rounded-xl bg-black text-white border border-blue- text-sm">
                        Dashboard
                      </button>
                </Link>
              )}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="p-0 min-w-0"
                    endContent={<ChevronDown />}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={userDetails.initials}
                        size="sm"
                        src={user?.imageUrl || undefined}
                        fallback={<User />}
                      />
                      <span className="hidden sm:inline">
                        {userDetails.displayName}
                      </span>
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="profile"
                    onClick={() => router.push("/dashboard?tab=profile")}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="files"
                    onClick={() => router.push("/dashboard")}
                  >
                    My Files
                  </DropdownItem>
                  <DropdownItem
                    key="signout"
                    color="danger"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            
            <SignedOut>
              <div className="flex flex-col gap-4">
                <Link href="/sign-in">
                  <NavbarButton variant="primary" className="w-full">
                    Sign In
                  </NavbarButton>
                </Link>
                <Link href="/sign-up">
                  <NavbarButton variant="primary" className="w-full">
                    Sign Up
                  </NavbarButton>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col gap-4">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <NavbarButton variant="secondary" className="w-full">
                      Dashboard
                    </NavbarButton>
                  </Link>
                )}
                <NavbarButton
                  onClick={handleSignOut}
                  variant="primary"
                  className="w-full text-danger"
                >
                  Sign Out
                </NavbarButton>
              </div>
            </SignedIn>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
