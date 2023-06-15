"use client";
import React from "react";

const IndexPage = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  async function getQuery(query) {
    setLoading(true);
    // await new Promise((resolve) => {
    //   setOutput("generating");
    //   setTimeout(resolve, 2000);
    // });

    // setOutput(query);
    // setLoading(false);
    // return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://gpt-api-z4khdeirua-uc.a.run.app/predict/${query}`
      );

      console.log(
        "Asked:",
        `https://gpt-api-z4khdeirua-uc.a.run.app/predict/${query}`
      );

      const data = await res.json();
      console.log(data[0].revised);
      setOutput(data[0].revised);
    } catch {
      setOutput("Error: Try again later");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }
  return (
    <div className="w-[25rem] h-[35rem] bg-black text-white flex justify-center p-1 pt-3">
      <div className="flex w-full flex-col items-center gap-4">
        <a
          className="font-extrabold leading-tight tracking-tighter text-4xl"
          href="https://promptllm.vercel.app/"
        >
          Prompt GPT
        </a>
        <div className="bg-white relative dark:bg-black rounded-xl p-1 border border-gray-700 shadow-lg grid w-[90%] h-[12rem] mt-1">
          <div className="flex w-full rounded-lg border border-gray-700 bg-white dark:bg-black h-full flex-col">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              className="h-full p-2.5 resize-none rounded-b-none rounded-lg bg-black shadow-none outline-none"
              placeholder="Enter your prompt here..."
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                getQuery(input);
              }}
              className="rounded-t-none rounded-lg bg-white text-black font-medium tracking-tight h-[3rem] hover:bg-gray-200"
              variant="default"
            >
              Send Query
            </button>
          </div>
        </div>
        <div className="bg-white relative dark:bg-black rounded-xl p-1 border border-gray-700 shadow-lg grid w-[90%] h-[12rem] mt-1">
          <div className="flex w-full rounded-lg border border-gray-700 bg-black dark:bg-black h-full flex-col text-white">
            {!output ? (
              <div className="p-2.5 opacity-40">
                Generated prompt will appear here...
              </div>
            ) : (
              <>
                {!loading ? (
                  <textarea className="h-full p-2.5 resize-none rounded-lg bg-black shadow-none outline-none">
                    {output === "" ? "Enter a prompt to get started!" : output}
                  </textarea>
                ) : (
                  <div className="flex w-full h-full">
                    <div className="animate-spin text-white repeat-infinite m-auto">
                      <svg
                        className="w-6 h-6"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleCopy()}
            className="rounded-lg bg-white text-black font-medium tracking-tight p-2 border-gray-800 border-2 transition-transform transform-gpu hover:scale-110"
          >
            Accept Prompt
          </button>
          <button
            onClick={() => getQuery(input)}
            className="rounded-lg bg-white text-black font-medium tracking-tight p-2 border-gray-800 border-2 transition-transform transform-gpu hover:scale-110"
          >
            Deny Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
