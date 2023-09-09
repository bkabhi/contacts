import React from 'react'

const LoadingCustomBtn = () => {
    return (
        <>
            <div className="flex items-center space-x-2">
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.294A7.963 7.963 0 014 12H0c0 3.042 1.135 5.86 3.01 8L6 17.294z"
                    ></path>
                </svg>
                <span>Loading</span>
            </div>
        </>
    )
}

export default LoadingCustomBtn