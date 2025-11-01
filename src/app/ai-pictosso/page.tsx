"use client"

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const AIPictossoChat = dynamic(() => import('./AIPictossoChat'), { ssr: false });

export default function AIPictossoPage() {
    const router = useRouter();

    const handleGenerated = () => {
        // Redirect to project page after applying
        setTimeout(() => {
            router.push('/project');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <div className="container mx-auto py-8">
                <AIPictossoChat onGenerated={handleGenerated} />
            </div>
        </div>
    );
}
