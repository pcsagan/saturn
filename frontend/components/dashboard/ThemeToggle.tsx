import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ColorModeContext from '@/helpers/colorModeContext';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color='inherit'
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
