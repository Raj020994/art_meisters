"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Palette, Shield } from "lucide-react"

import ApproveArt from './_components/ApproveArt'
import useFetch from '@/hooks/useFetch'
import { getPendingArt } from '@/service/admin'
import { getAllUser } from '@/service/auth'
import ManageAccount from './_components/ManageAccount'

export default function Page() {
    const [artWorks, setartWorks] = useState(null)
    const [users, setUsers] = useState(null)
    const { data: arts, loading: artLoading, fn: getPenArtFn } = useFetch(getPendingArt)
    const { data: res2, loading: accountLoading, fn: getAllAccountFn } = useFetch(getAllUser)

    useEffect(() => {
        getPenArtFn()
        getAllAccountFn()
    }, [])

    useEffect(() => {
        if (!artLoading && arts?.Success) {
            setartWorks(arts.Data)
        }
    }, [arts, artLoading])

    useEffect(() => {
        if (!accountLoading && res2?.Success) {
            setUsers(res2.Data)
        }
    }, [res2, accountLoading])
    
    if (artLoading || accountLoading) {
        return (
            <div className="min-h-screen bg-black flex-center flex-col gap-4">
                <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium tracking-widest animate-pulse text-xs uppercase">Loading Admin Hub</p>
            </div>
        );
    }
     
    return (
        <section id='adminPage' className="min-h-screen py-16 px-4 md:px-8 bg-black">
            <div className="max-w-6xl mx-auto space-y-12">
                

                <div className="text-center space-y-4 mb-10">
                    <h1 className="text-5xl md:text-6xl font-serif">Admin <span className="text-red-500">Dashboard</span></h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Manage User accounts, and Artwork approvals from your centralized control panel.</p>
                </div>

                {/* Dashboard Frame using Radix Tabs */}
                <Tabs defaultValue="manage-account" orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Tab Navigation Sidebar */}
                    <div className="md:col-span-1">
                        <TabsList className="bg-white/5 border border-white/10 p-2 rounded-2xl flex md:flex-col gap-2 w-full md:sticky md:top-24 h-auto">
                            <TabsTrigger 
                                value="manage-account"
                                className="rounded-xl w-full text-white text-sm py-3 px-4 flex items-center justify-center md:justify-start gap-2.5 transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-white/5 cursor-pointer font-medium"
                            >
                                <Users className="w-4 h-4" />
                                <span>Accounts</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="approve-art"
                                className="rounded-xl w-full text-white text-sm py-3 px-4 flex items-center justify-center md:justify-start gap-2.5 transition-all data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-white/5 cursor-pointer font-medium"
                            >
                                <Palette className="w-4 h-4" />
                                <span>Artworks</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab Content Display Area */}
                    <div className="md:col-span-3">
                        <TabsContent value="manage-account" className="mt-0 outline-none">
                            <ManageAccount users={users}/>
                        </TabsContent>
                        <TabsContent value="approve-art" className="mt-0 outline-none">
                            <ApproveArt art={artWorks}/>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
