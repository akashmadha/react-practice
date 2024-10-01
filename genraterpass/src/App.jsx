import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(24);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Use Ref Hook for input
  const passwordRef = useRef();

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Copy to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-md shadow-lg text-center">
        <h1 className="text-white text-xl mb-4">Password Generator</h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 rounded-l-md bg-white text-gray-800 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center justify-center gap-x-2 mb-4">
          <label className="text-orange-500">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full accent-blue-500"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-center gap-x-4 text-orange-500">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
