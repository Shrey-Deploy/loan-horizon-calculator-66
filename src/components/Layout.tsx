
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Container, 
  Divider,
  useTheme as useMuiTheme,
  useMediaQuery
} from "@mui/material";
import { Menu as MenuIcon, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@/hooks/useTheme";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Exchange Rates", path: "/exchange-rates" },
  { name: "About", path: "/about" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const { setTheme, theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Loan<Box component="span" sx={{ color: 'secondary.main' }}>Horizon</Box>
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    color: 'white',
                    opacity: location.pathname === item.path ? 1 : 0.7,
                    mr: 2
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
          
          <IconButton onClick={toggleDarkMode} color="inherit">
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          {isMobile && (
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu" 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileNavOpen && isMobile}
        onClose={() => setMobileNavOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.name} 
                component={RouterLink} 
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Box>
      
      <Box component="footer" sx={{ py: 3, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
        <Container>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' }
          }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} LoanHorizon. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, md: 0 } }}>
              Built with React, Material UI & React Router
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
