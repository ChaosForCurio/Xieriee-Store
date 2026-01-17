"use client";

import { StackHandler } from "@stackframe/stack";

export default function Handler(props: any) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-1000" />

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center">

                {/* Logo Section */}
                <div className="mb-8 flex flex-col items-center space-y-2">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Xieriee Store</h1>
                    <p className="text-gray-400 text-sm">Welcome back! Please sign in.</p>
                </div>

                {/* Stack Auth Form */}
                <div className="w-full [&_.stack-component]:!bg-transparent [&_.stack-component]:!border-none [&_.stack-input]:!bg-white/5 [&_.stack-input]:!border-white/10 [&_.stack-input]:!text-white [&_.stack-button]:!bg-blue-600 [&_.stack-button]:!hover:bg-blue-500">
                    <StackHandler fullPage={false} app={props.app} routeProps={props.routeProps} />
                </div>
            </div>
        </div>
    );
}
