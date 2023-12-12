/** @scripts */
import { formatRequest } from "@/utils/format";
import services from "./services.json";
import { cookies } from "next/headers";

const RoomsService = () => {
  const jwtAccess = cookies().get("next-jwt");

  const getAll = async () => {
    const res = await fetch(formatRequest(services.rooms), {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtAccess?.value}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  return { getAll };
};

export default RoomsService();
