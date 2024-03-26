"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Spinner from "./Spinner";

type Props = {};

export default function page({}: Props) {
  const [liked, setLiked] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const handelLikeUnline = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );
      console.log(await response.json());
      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res?.message);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button disabled={isFetching}
        className={`flex gap-2 items-center py-2 px-4 bg-zinc-300 text-zinc-800 rounded-full hover:bg-zinc-400 border-white`}
        onClick={handelLikeUnline}
      >
        {liked ? "Liked" : "Like"}
        {isFetching ? (
          <Spinner />
        ) : (
          <FaHeart className={`${liked ? "text-red-600" : ""}`} />
        )}
      </button>
      {error && <p className="text-white">{error}</p>}
    </div>
  );
}
