// import { useCallback, useEffect, useRef, useState } from 'react'


// function App() {
//   const [length, setLength] = useState(8);
//   const [numberAllowed, setNumberAllowed] = useState(true);
//   const [charAllowed, setCharAllowed] = useState(false);
//   const [password, setPassword] = useState("");


//   const passwordRef=useRef(null)
//   const passwordGenerator = useCallback(()=>{
//     let pass=""
//     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

//     if(numberAllowed) str+= "1234567890"
//     if(charAllowed) str+="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

//     for (let index = 1; index <= length; index++) {
//       const curr = Math.floor(Math.random() * str.length + 1);
//       pass+=str.charAt(curr)
//     }
// console.log("pass:",pass);
//     setPassword(pass)

//   },[length,numberAllowed,charAllowed,setPassword])

//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0, 999);
//     window.navigator.clipboard.writeText(password)
//   }, [password])


// // const copyPasswordToClipboard = useCallback(()=>{
// //   passwordRef.current?.select();
// //   window.navigator.clipboard.writeText(password);
// // },[password])

//   useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
//   return (
//     <>
//     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>

//      <h1 className='text-4xl text-center text-white '>Password Generator</h1>  
//      <div className='flex shadow rounded-lg overflow-hidden mb-4'></div>
//      <input type="text" value={password} placeholder='Password' readOnly className='outline-none py-1 px-3 rounded-lg' ref={passwordRef} />
// <button onClick = {copyPasswordToClipboard} className='outline-none py-0.5 px-3 shrink-0 bg-blue-700 text-white'> Copy </button>
// <div className='flex items-center gap-x-1'>
//         <input 
//         type="range"
//         min={8}
//         max={100}
//         value={length}
//          className='cursor-pointer'
//          onChange={(e) => {setLength(e.target.value)}}
//           />
//           <label>Length: {length}</label>
//       </div>
//       <div className='flex text-sm gap-x-2'>
//       <div className="flex items-center gap-x-1">
//       <input
//           type="checkbox"
//           defaultChecked={numberAllowed}
//           id="numberInput"
//           onChange={() => {
//             setNumberAllowed((prev) => !prev);
//           }}
//       />
//       <label htmlFor="numberInput">Numbers</label>
//       </div>
//       <div className="flex items-center gap-x-1">
//           <input
//               type="checkbox"
//               defaultChecked={charAllowed}
//               id="characterInput"
//               onChange={() => {
//                   setCharAllowed((prev) => !prev )
//               }}
//           />
//           <label htmlFor="characterInput">Characters</label>
//       </div>
//     </div>
//     </div>

//     </>
//   )
// }

// export default App


import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:'\",.<>?";

    for (let index = 1; index <= length; index++) {
      const curr = Math.floor(Math.random() * str.length);
      pass += str.charAt(curr);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator,]);

  return (
    <div
      className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        } min-h-screen flex flex-col items-center justify-center font-sans`}
    >
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 my-8 shadow-md">
        <h1 className="text-3xl text-center text-indigo-600 font-semibold mb-4">
          Password Generator
        </h1>
        <label className="block text-gray-400">Generated Password</label>
        <input
          type="text"
          value={password}
          placeholder="Generated Password"
          readOnly
          className={`py-2 px-4 rounded-lg mb-4 outline-none w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'
            }`}
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`py-2 px-4 rounded-lg focus:outline-none focus:ring ${isDarkMode
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300'
              : 'bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-500'
            }`}
        >
          Copy to Clipboard
        </button>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="range"
            min={8}
            max={40}
            value={length}
            className="cursor-pointer w-full"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-gray-400">Password Length: {length}</label>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          <label className="text-gray-400" htmlFor="numberInput">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          <label className="text-gray-400" htmlFor="characterInput">
            Include Special Characters
          </label>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleTheme}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring ${isDarkMode
                ? 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300'
                : 'bg-gray-300 text-gray-900 hover:bg-gray-400 focus:ring-gray-500'
              }`}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
