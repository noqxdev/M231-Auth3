import "../index.css"; // Ensure Tailwind CSS is imported
import "../era.css";
import { useState, useEffect } from "react";
import { QRCodeSVG } from 'qrcode.react';

interface TOTPProps {
    setCurrentPage: (page: string) => void;
}

// Mock TOTP secret for demo purposes
const mockTotpSecret = 'JBSWY3PEHPK3PXP';

function TOTP({ setCurrentPage }: TOTPProps) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [userId] = useState("user@example.com");

    // TOTP timing countdown effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            // TOTP codes typically rotate every 30 seconds
            const secondsRemaining = 30 - (Math.floor(Date.now() / 1000) % 30);
            setTimeRemaining(secondsRemaining);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // Only allow digits and limit to 6 characters
        if (/^\d*$/.test(input) && input.length <= 6) {
            setCode(input);
            if (error) setError('');
        }
    };

    const verifyCode = () => {
        // Demo validation - in a real app this would validate against an actual TOTP algorithm
        if (code.length === 6) {
            setCurrentPage('TOTP');
        } else {
            setError('Please enter a valid 6-digit code');
        }
    };

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col absolute left-0 top-0">
                <div className="p-4 py-6 rounded-lg md:min-w-[450px] md:max-w-[450px] lg:max-w-[450px] w-full transition bg-gray-800 bg-opacity-25 backdrop-blur z-10 shadow flex flex-col justify-center items-center gap-2">
                    <div className="md:max-w-[450px] lg:max-w-[450px] w-full flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="text font-bold">M231-Auth3</p>
                            <div className="relative w-8 h-8">
                                <svg viewBox="0 0 36 36" className="w-8 h-8">
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#444"
                                        strokeWidth="3"
                                        strokeDasharray="100"
                                        className="bg-circle"
                                    />
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#4ade80"
                                        strokeWidth="3"
                                        strokeDasharray="100"
                                        strokeDashoffset={100 - (timeRemaining / 30) * 100}
                                        className="progress-circle"
                                    />
                                    <text x="18" y="20.5" textAnchor="middle" className="text-sm font-semibold fill-white">
                                        {timeRemaining}
                                    </text>
                                </svg>
                            </div>
                        </div>

                        <span className="text-sm shrink-0 text-gray-600 uppercase font-bold w-full mt-4">Time-based one-time password</span>

                        <div className="cursor-pointer justify-between hover:bg-black/50 transition w-full rounded-lg bg-black/25 p-4 flex flex-col gap-2 items-center text-gray-300">
                            <div className="bg-white p-3 rounded-md">
                                <QRCodeSVG
                                    value={`otpauth://totp/M231-Auth3:${userId}?secret=${mockTotpSecret}&issuer=M231-Auth3`}
                                    size={160}
                                />
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                Scan this QR code with your authenticator app
                            </p>
                        </div>

                        <div className="cursor-pointer hover:bg-black/50 justify-between text-right transition w-full rounded-lg bg-black/25 p-4 flex gap-2 items-center text-gray-300">
                            <span className="text-gray-500 font-semibold">Code: </span>
                            <code className="px-2 rounded bg-gray-800 py-0.5 w-full">
                                <input
                                    type="text"
                                    id="codeInput"
                                    className="bg-transparent w-full text-right font-mono tracking-wider"
                                    value={code}
                                    onChange={handleCodeChange}
                                    placeholder="000000"
                                    maxLength={6}
                                    autoFocus
                                />
                            </code>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <span className="text-sm shrink-0 text-gray-600 uppercase font-bold w-full mt-4">Sources</span>
                        <p className="text-gray-300">https://www.microsoft.com/en-us/security/mobile-authenticator-app</p>

                        <div className="w-full flex gap-2 mt-2">
                            <button
                                onClick={verifyCode}
                                className="w-full px-2 py-1 rounded bg-blue-500 text-gray-100 hover:bg-blue-400 active:opacity-75 transition flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                                Verify
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
    );
}

export default TOTP;