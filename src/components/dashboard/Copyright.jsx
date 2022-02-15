import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ padding: 2 }}
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Qutred">
        Qutred
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
