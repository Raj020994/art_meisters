import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function Page() {
    return (
        <section id='adminPage'>
            <Tabs defaultValue="create-Event" className="w-full h-full bg-red-600 grid-cols-2">
                <div className="">

                <TabsList>
                    <TabsTrigger value="create-Event">Create-Event</TabsTrigger>
                    <TabsTrigger value="approve">Approve</TabsTrigger>
                </TabsList>
                </div>
                <div className="">

                <TabsContent value="create-Event">Make changes to your create-Event here.</TabsContent>
                <TabsContent value="approve">Change your approve here.</TabsContent>
                </div>
            </Tabs>
        </section>
    )
}
