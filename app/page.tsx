import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
  Database,
} from "lucide-react";
import { NavbarDemo } from "@/components/Navbar";
import { IconCloudDemo } from "@/components/ui/ICD";
import { BentoDemo } from "@/components/Bento";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
export const projects = [
  {
    title: "Secure Storage",
    description:
      "All your files are encrypted both in transit and at rest, ensuring complete data privacy and protection.",
  },
  {
    title: "Instant Sharing",
    description:
      "Easily generate secure, shareable links to files and folders with custom access permissions.",
  },
  {
    title: "Cross-Device Sync",
    description:
      "Seamlessly access and sync your files across mobile, desktop, and web platforms in real-time.",
  },
];


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Use the unified Navbar component */}

      {/* Main content */}
      <main className="flex-1 ">
        <NavbarDemo />
        {/* Hero section */}
        <section className="flex flex-col py-10 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <section className="h-[15rem] flex flex-col items-center  px-4 md:px-6 bg-background">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                  Store <AuroraText>Seamlessly!</AuroraText>
                </h1>

                <div className="mt-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <SignedOut>
                    <Link href="/sign-up">
                      <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                        Get Started
                      </button>
                    </Link>
                    <Link href="/sign-in">
                      <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
                        Sign In
                      </button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
                        Go To Dashboard
                      </button>
                    </Link>
                  </SignedIn>
                </div>
              </section>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-80 h-80 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                  <IconCloudDemo />
                </div>
              </div>
            </div>
            <BentoDemo />
          </div>
        </section>

        {/* Features section */}

        <section className="py-20 md:py-24 px-4 md:px-6">
       

            
          <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
            What's For you?
          </h2>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-md transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-2">
                    {project.description}
                  </p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-[#00FFF1] hover:underline"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        {/* <section className="py-12 md:py-20 px-4 md:px-6 ">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
              Ready?
            </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let's Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>*/}
      </main> 

      {/* Simple footer */}
      <footer className=" border-t border-default-200 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Database />
              <h2 className="text-lg font-bold">Storio</h2>
            </div>
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} Storio @Cloud Storage by Avishek
              with 💖
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
