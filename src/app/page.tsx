"use client";
/** @package */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Box p="10px">
      {session ? (
        <Button color="error" variant="contained" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button color="primary" variant="contained" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </Box>
  );
}
