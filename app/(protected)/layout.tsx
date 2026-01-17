
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import React, { Suspense } from 'react';

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect("/handler/sign-in");
    }

    return (
        <>
            <SmoothScroll>
                <Suspense fallback={<div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />}>
                    <Navbar />
                </Suspense>
                <Sidebar />
                <main className="md:ml-64 pt-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
                    <div className="p-6 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </SmoothScroll>
        </>
    );
}
