/** @package */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

/** @styles */
import { useMediaQuery, useTheme } from '@mui/material';
import { RoomStatus } from '@prisma/client';
import { colorState } from '@/utils/room';

export enum EFilter {
  all = 'all',
  available = 'available',
  occupied = 'occupied',
  cleaning = 'cleaning',
  maintenance = 'maintenance',
  create = 'create',
}

interface Props {
  tabValue: EFilter;
  onChange: (value: EFilter) => void;
}

const TabsFilterMol = ({ tabValue, onChange }: Props) => {
  const matchMaxWidth = useMediaQuery('(max-width:500px)');
  const theme = useTheme();

  const stateColor = colorState[tabValue as unknown as keyof typeof colorState]
    ?? theme.palette.primary.main;

  const handleChange = (_: React.SyntheticEvent, newValue: EFilter) => {
    onChange(newValue);
  };

  return (
    <Box
      borderBottom={2}
      borderTop={2}
      borderColor={theme.palette.text.secondary}
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: !matchMaxWidth ? stateColor : 'unset',
          },
          '& .Mui-selected': {
            color: stateColor,
          },
          '& .MuiTabs-flexContainer': {
            overflowY: 'auto',
            display: 'block',
          },
        }}
      >
        <Tab
          label="Todas"
          value="all"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
        <Tab
          label="Disponibles"
          value={RoomStatus.available}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
        <Tab
          label="Ocupadas"
          value={RoomStatus.occupied}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
        <Tab
          label="Limpieza"
          value={RoomStatus.cleaning}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
        <Tab
          label="Mantenimiento"
          value={RoomStatus.maintenance}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
        <Tab
          label="Crear Habitación"
          value="create"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        />
      </Tabs>
    </Box>
  );
};

export default TabsFilterMol;
