import Navbar from "../navbar/Navbar"; // Sørg for at bruge den korrekte sti

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-500 flex flex-col">
            {/* Topbar */}
            <div className="w-full bg-white py-4 px-8 shadow-md">
                <h1 className="text-2xl font-bold text-black">Smart Greenhouse</h1>
            </div>

            {/* Navbar */}
            <div className="flex flex-col items-start p-8">
                <Navbar />
            </div>

        </div>
    );
}

export default LandingPage;
