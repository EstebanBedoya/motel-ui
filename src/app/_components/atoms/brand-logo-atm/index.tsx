/** @package */
import Typography from "@mui/material/Typography";

/** @style */
import BrandIcon from "@/styles/icons/brand-icon";

const BrandLogoAtm = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <BrandIcon size="45px" />
    <Typography color="primary" sx={{ fontSize: "30px", fontWeight: 700 }}>
      Rooms
    </Typography>
  </div>
);

export default BrandLogoAtm;
