/** @components */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  title: string;
  items: string[] | { primary: string; secondary: string }[];
  inlineItems?: boolean;
  headerSize?: number;
}

const ListItemsMol = ({
  title,
  items,
  inlineItems = false,
  headerSize = 20,
}: Props) => (
  <List
    subheader={(
      <ListSubheader
        sx={{
          fontSize: headerSize,
          fontWeight: 700,
          color: 'black',
          lineHeight: 'unset',
        }}
      >
        {title}
      </ListSubheader>
    )}
  >
    {items.map((item) => (
      <ListItem
        key={typeof item === 'string' ? item : item.primary}
        sx={{
          paddingY: 0,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: '30px',
          }}
        >
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText
          sx={
            inlineItems
              ? {
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                '& .MuiListItemText-secondary': {
                  fontSize: 16,
                  color: 'black',
                },
              }
              : null
          }
          primaryTypographyProps={{
            fontWeight: typeof item === 'string' ? 'normal' : 700,
          }}
          secondaryTypographyProps={{
            color: 'black',
          }}
          primary={typeof item === 'string' ? item : item.primary}
          secondary={typeof item === 'string' ? '' : item.secondary}
        />
      </ListItem>
    ))}
  </List>
);
export default ListItemsMol;
