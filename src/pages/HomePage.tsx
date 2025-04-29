import "../index.css"; // Ensure Tailwind CSS is imported
import "../era.css";

interface HomePageProps {
    setCurrentPage: (page: string) => void;
}

function HomePage({ setCurrentPage }: HomePageProps) {
    return (
        <>
            <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col absolute left-0 top-0">
                <div className="p-4 py-6 rounded-lg md:min-w-[450px] md:max-w-[450px] lg:max-w-[450px] w-full transition bg-gray-800 bg-opacity-25 backdrop-blur z-10 shadow flex flex-col justify-center items-center gap-2">

                    <div className="md:max-w-[450px] lg:max-w-[450px] w-full flex flex-col gap-2">
                        <p className="text font-bold">M231-Auth3</p>

                        <span className="text-sm shrink-0 text-gray-600 uppercase font-bold w-full mt-4">account credentials </span>
                        <div className="cursor-pointer justify-between text-right hover:bg-black/50 transition w-full rounded-lg bg-black/25 p-4 flex gap-2 items-center text-gray-300">
                            <span className="text-gray-500 font-semibold">Email: </span>
                            <code className="px-2 rounded bg-gray-800 py-0.5">
                                <input type="email" className="bg-transparent" id="emailInput" placeholder="user@example.com"></input>
                            </code>
                        </div>

                        <div className="cursor-pointer hover:bg-black/50 justify-between text-right transition w-full rounded-lg bg-black/25 p-4 flex gap-2 items-center text-gray-300">
                            <span className="text-gray-500 font-semibold">Password: </span>
                            <code className="px-2 rounded bg-gray-800 py-0.5">
                                <input type="password" id="passwordInput" placeholder="password123"></input>
                            </code>
                        </div>

                        <span className="text-sm shrink-0 text-gray-600 uppercase font-bold w-full mt-4">Sources</span>
                        <p className="text-gray-300">https://github.com/noqxdev/M231-Auth3</p>

                        <div className="w-full flex gap-2 mt-2">
                            <button onClick={checkLogin} className="w-full px-2 py-1 rounded bg-blue-500 text-gray-100 hover:bg-blue-400 active:opacity-75 transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="area">
                <ul className="circles">
                    {[...Array(10)].map((_, i) => (
                        <li key={i}></li>
                    ))}
                </ul>
            </div>
        </>
    )

    function checkLogin() {
        const email = document.getElementById("emailInput") as HTMLInputElement | null;
        const password = document.getElementById("passwordInput") as HTMLInputElement | null;

        if (email?.value === "user@example.com" && password?.value === "password123") {
            console.log("Login successful.");
            setCurrentPage('TOTP');
        } else {
            console.log("Login failed.");
            const nextButton = document.querySelector("button") as HTMLButtonElement | null;
            if (nextButton) {
                nextButton.style.backgroundColor = "#ef4444";
            }
        }
    }
}

export default HomePage;