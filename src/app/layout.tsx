import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import CategoryBar from '@/components/navbar/CategoryBar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Mayorstar',
	description: 'Mayorstar - Your trusted online shopping destination',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
				{/* Sticky Header Wrapper */}
				<Navbar />
				<CategoryBar />

				{/* Main Content Area */}
				<main>{children}</main>
			</body>
		</html>
	);
}
