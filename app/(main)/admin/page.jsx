import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateEvent from './_components/CreateEvent'
import ApproveAccount from './_components/ApproveAccount'
import ApproveArt from './_components/ApproveArt'

export default function Page() {
    return (
        <section id='adminPage' className="min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4 mb-10">
                    <h1 className="text-5xl md:text-6xl font-serif">Admin <span className="text-red-500">Dashboard</span></h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Manage events, user accounts, and artwork approvals from your centralized control panel.</p>
                </div>

                <Tabs defaultValue="create-event" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <TabsList className="md:col-span-1 bg-white/10  h-14 md:h-48 flex sm:flex-row md:flex-col md:justify-center md:items-center rounded-2xl mt-24 w-full p-2 md:p-3 md:space-y-2 sm:space-x-2 md:space-x-0">
                        <TabsTrigger 
                            value="create-event"
                            className="rounded-lg bg-balck data-[state=active]:bg-red-600 w-full text-white  text-sm md:text-base py-2.5"
                        >
                            Create Event
                        </TabsTrigger>
                        <TabsTrigger 
                            value="approve-account"
                            className="rounded-lg data-[state=active]:bg-red-600 w-full text-white  text-sm md:text-base py-2.5"
                        >
                            Accounts
                        </TabsTrigger>
                        <TabsTrigger 
                            value="approve-art"
                            className="rounded-lg data-[state=active]:bg-red-600 w-full text-white text-sm md:text-base py-2.5"
                        >
                            Artworks
                        </TabsTrigger>
                    </TabsList>

                    <div className="md:col-span-3">
                        <TabsContent value="create-event" className="mt-0 outline-none">
                            <CreateEvent />
                        </TabsContent>
                        <TabsContent value="approve-account" className="mt-0 outline-none">
                            <ApproveAccount />
                        </TabsContent>
                        <TabsContent value="approve-art" className="mt-0 outline-none">
                            <ApproveArt />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
