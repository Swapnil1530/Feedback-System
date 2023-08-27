import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const profile = async ()=> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <p> Name : {user&& user.name}</p>
        <p> Prn Number : {user && user.prnNumber}</p>
      </div>
    </div>
  );
}
export default profile;
