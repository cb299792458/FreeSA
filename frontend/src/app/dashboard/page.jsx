"use client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
    const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (!sessionUser?.isAdmin) redirect('/dashboard/unauthorized');

    return (
        <h1>Dashboard Page</h1>
    );
};