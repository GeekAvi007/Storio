"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FileUp, FileText, User, Folder, Image, Upload, File, FolderOpen } from "lucide-react";
import FileUploadForm from "@/components/FileUploadForm";
import FileList from "@/components/FileList";
import UserProfile from "@/components/UserProfile";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back,{" "}
          <span className="text-cyan-600 dark:text-cyan-400">
            {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "User"}
          </span>
          !
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          {activeTab === "files" 
            ? "Manage your files and folders"
            : "Update your profile settings"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("files")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === "files"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FolderOpen className="h-5 w-5" />
            My Files
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <User className="h-5 w-5" />
            Profile
          </button>
        </nav>
      </div>

      {/* Content Section */}
      {activeTab === "files" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                    <Upload className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upload Files
                  </h2>
                </div>
                <FileUploadForm
                  userId={userId}
                  onUploadSuccess={handleFileUploadSuccess}
                  currentFolder={currentFolder}
                />
              </div>
            </div>
          </div>

          {/* File List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                    <File className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentFolder ? "Folder Contents" : "All Files"}
                  </h2>
                </div>
                <FileList
                  userId={userId}
                  refreshTrigger={refreshTrigger}
                  onFolderChange={handleFolderChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <User className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Settings
              </h2>
            </div>
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
}