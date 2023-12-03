/** @scripts */
import { formatRequest } from "@/utils/format";
import services from "./services.json";

const RoomsService = () => {
  const getAll = async () => {
    const res = await fetch(formatRequest(services.rooms), {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  return { getAll };
};

export default RoomsService();
