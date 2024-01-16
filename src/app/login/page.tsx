"use client";
/** @package */
import BrandLogoAtm from "@/components/atoms/brand-logo-atm";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

/** @images */
import backgroundLogin from "../../../public/background-login.jpg";
import { useState } from "react";

export default function Page() {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("test@test.com"); // Default values for testing
  const [password, setPassword] = useState("Paswordrandom123*"); // Default values for testing
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard/rooms");
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <Image
        alt="Descripción de la imagen"
        layout="fill"
        placeholder="blur"
        quality={100}
        src={backgroundLogin}
      />
      <Grid
        sx={{
          backgroundColor: "white",
        }}
        position="absolute"
        width={{ xs: "85vw", md: "60vw", lg: "30vw" }}
        height={{ xs: "50vh", md: "55vh" }}
        borderRadius="20px"
        margin="auto"
        pl={5}
        pr={5}
      >
        <Grid container mt={2} justifyContent="center">
          <BrandLogoAtm />
        </Grid>
        <Grid container mt={5} justifyContent="center">
          <Typography variant="h4" fontWeight={700}>
            Iniciar Sesión c:
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid mt={3} gap={2} container>
            <Grid item width="100%">
              <Typography fontWeight={400} fontSize="20px">
                Dirección Correo
              </Typography>
              <TextField
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exapmple@example.com"
                type="email"
                variant="outlined"
                value={email}
              />
            </Grid>
            <Grid item mb={3} width="100%">
              <Typography fontWeight={400} fontSize="20px">
                Contraseña
              </Typography>
              <TextField
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                type="password"
                variant="outlined"
                value={password}
              />
            </Grid>
            <Button fullWidth size="large" type="submit" variant="contained">
              Iniciar Sesion
            </Button>
          </Grid>
        </form>
      </Grid>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
