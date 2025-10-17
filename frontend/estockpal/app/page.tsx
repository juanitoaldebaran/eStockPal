import Link from "next/link";
import TypingWord from "./components/TypingWord";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
          <div className="max-w-5xl px-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white bg-blue-900/80 text-center text-sm rounded-lg p-2 mb-5">✨ Features with AI and Machine Learning</span>
              <h1 className="text-white text-6xl">eStockPal</h1>
              <h2 className="sm:text-2xl text-3xl mt-4 text-white">Your Trusted Online Stock Platform</h2>
              <h3 className="text-white text-2xl">
                <span className="inline-flex items-center mt-2">
                  <TypingWord word="Invest the future with our finance online platform" />
                  <span className="animate-pulse text-blue-800 text-2xl">|</span>
                </span>
              </h3>
              <p className="text-gray-200 text-sm">
                Best online stock platform with AI and Machine Learning Predictor with excellent accuracy
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Link href={"/market"} className="text-black bg-white rounded-lg p-2 text-center w-30 hover:bg-gray-200 duration-100">
                    Get Started
                </Link>
              </div>
            </div>  
          </div>
    </div>
  );
}
