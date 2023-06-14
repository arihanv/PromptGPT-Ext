"use client"
import React from "react";

const IndexPage = () => {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  async function getQuery(query) {
    const res = await fetch(
      `https://gpt-api-z4khdeirua-uc.a.run.app/predict/${query}`
    )

    console.log(
      "Asked:",
      `https://gpt-api-z4khdeirua-uc.a.run.app/predict/${query}`
    )

    const data = await res.json()
    console.log(data[0].revised)
    setOutput(data[0].revised)
    setLoading(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(output)
  }
  return (
    <div className="w-[25rem] h-[35rem] bg-gray-900 text-white flex justify-center p-1 pt-3">
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="font-extrabold leading-tight tracking-tighter text-4xl">
          Prompt GPT
        </h1>
        <div className="bg-white relative dark:bg-black rounded-xl p-1 border border-gray-700 shadow-lg grid w-[90%] h-[12rem] mt-1">
          <div className="flex w-full rounded-lg border border-gray-700 bg-white dark:bg-black h-full flex-col">
            <textarea className="h-full p-2.5 resize-none rounded-b-none rounded-lg bg-gray-600 shadow-none outline-none">
            </textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                // setLoading(true)
                // getQuery(input)
              }}
              className="rounded-t-none rounded-lg bg-gray-300 text-black font-semibold tracking-tight h-[3rem]"
              variant="default"
            >
              Send Query
            </button>
          </div>
        </div>
        <div className="bg-white relative dark:bg-black rounded-xl p-1 border border-gray-700 shadow-lg grid w-[90%] h-[12rem] mt-1">
          <div className="flex w-full rounded-lg border border-gray-700 bg-white dark:bg-black h-full flex-col">
            <textarea className="h-full p-2.5 resize-none rounded-b-none rounded-lg bg-gray-600 shadow-none outline-none">
              {
                output === "" ? "Enter a prompt to get started!" : output
              }
            </textarea>
          </div>
        </div>
        <div className="flex gap-4">
        <button onClick={() => handleCopy()} className="rounded-lg bg-gray-300 text-black font-semibold tracking-tight p-2">
         Accept Prompt
        </button>
        <button className="rounded-lg bg-gray-300 text-black font-semibold tracking-tight p-2">
         Deny Prompt
        </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
