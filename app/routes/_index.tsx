import type { MetaFunction, LoaderArgs   } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"

type ChatMessage = {
  User: string;
  Time: string;
  Message: string;
}

type ChatHistory = ChatMessage[];

export const loader = async( args: LoaderArgs) => {
  const response = await fetch(`https://api.npoint.io/ebb9ee69efa767ac6532`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }

  const responseData = await response.json();

  console.log(responseData)
  if (!Array.isArray(responseData.ChatHistory)) {
    throw new Error("Invalid data format: expected an array of chat messages");
  }

  return json({ chatHistory: responseData.ChatHistory });
}


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { chatHistory } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} className="relative">
      {/* <h1 className="text-3xl font-bold underline text-center text-red-500">Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul> */}
      <div className=" bg-white fixed z-10 w-full">
       <div className="px-10 flex justify-between items-center py-3">
       <h1 className="text-xl font-semibold text-black">ChatBot <span className="text-gray-600" >1.5</span></h1>
        <img className='h-5 w-5' src="/upload-2-line.png" alt="" />
       </div>
      </div>

      <div className="pt-20 relative">
        <div className="px-10 space-y-5">
        {chatHistory?.map((chat, index) => (
            <div key={index} className={chat.User === 'user' ? 'text-right' : 'text-left'}>
              <p>{chat.Message}</p>
              <p className="text-xs text-gray-500">{chat.time}</p>
            </div>
          ))}
          <p className="text-end">Hello Sir</p>
          
        </div>
      <div className="fixed bottom-1 left-0 w-full px-10 bg-white z-10 ">
        <input type="text" className="border border-slate-950 text-black py-2 w-full rounded-lg"/>
        <img src="/arrow-up-line.png" alt="" className="bg-slate-400 p-1 rounded-lg h-7 w-7 absolute right-12 bottom-2" />
      </div>
      </div>
    </div>
  );
}
