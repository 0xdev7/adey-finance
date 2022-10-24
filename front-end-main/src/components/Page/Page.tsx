import { Container, useMediaQuery } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';
import Menu, { MenuProps } from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';

import Footer from '../Footer';

import React, { useEffect, useMemo } from 'react';
import { styled, alpha, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import AccountButton from '../Nav/AccountButton';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';

import grapeLogo from '../../assets/img/logo1.png';
import grapeImg from '../../assets/img/grape.png';
import grapeMimImg from '../../assets/img/twap.png';
import nodesImg from '../../assets/img/gnode.png';
import bondImg from '../../assets/img/gbond.png';
import wineImg from '../../assets/img/gshare.png';
import vintageImg from '../../assets/img/vintage-token.png';
import magikImg from '../../assets/img/magik.png';
import creamImg from '../../assets/img/cream.png';
import beefyImg from '../../assets/img/beefy.png';
import yieldwolfImg from '../../assets/img/yieldwolf.png';
import debankImg from '../../assets/img/debank.png';
import rebatesImg from '../../assets/img/rebates.png';
import vintage from '../../assets/img/vintage-token.png';
import winemaker from '../../assets/img/Winemaker.png';
import goldenGrape from '../../assets/img/golden-grape.png';
import dashboardImg from '../../assets/img/dashboard.png';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import useGrapeStats from '../../hooks/useGrapeStats';
import useWineStats from '../../hooks/useWineStats';
import useVintagePrice from '../../hooks/useVintagePrice';

import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StadiumIcon from '@mui/icons-material/Stadium';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LinkIcon from '@mui/icons-material/Link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MapIcon from '@mui/icons-material/Map';
import StorefrontIcon from '@mui/icons-material/Storefront';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import pressIcon from '../../assets/img/barrel.png';
import homeIcon from '../../assets/img/menu_home.png';
import tokenIcon from '../../assets/img/menu_token.png';
import bridgeIcon from '../../assets/img/menu_bridge.png';
import fiatIcon from '../../assets/img/menu_fiat.png';
import swapIcon from '../../assets/img/menu_swap.png';
import vaultIcon from '../../assets/img/menu_vault.png';
import dexIcon from '../../assets/img/menu_dex.png';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  overflow: 'hidden',
  overflowY: 'auto',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '25px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  color: '#322f32 !important',
  background: '#545454',
  boxShadow: '50px 4px 26px -18px rgba(0,0,0,0.99) !important',
  borderRadius: '0 !important',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  overflow: 'hidden',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    borderRadius: 6,
    backgroundColor: 'rgba(147, 9, 147, 0.9) !important',
    marginTop: theme.spacing(1),
    minWidth: 190,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const Page: React.FC = ({ children }) => {
  useEagerConnect();

  const grapeStats = useGrapeStats();
  const bShareStats = useWineStats();
  const vintagePrice = useVintagePrice();

  const grapePrice = useMemo(() => (grapeStats ? Number(grapeStats.tokenInFtm).toFixed(3) : null), [grapeStats]);
  const winePrice = useMemo(() => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null), [bShareStats]);

  const cashStat = useCashPriceInEstimatedTWAP();
  const twap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };

  const [gamesOpen, setGamesOpen] = React.useState(false);
  const handleGamesClick = () => {
    if (!open) {
      handleDrawerOpen();
    }
    setGamesOpen(!gamesOpen);
  };

  const [vaultsOpen, setVaultsOpen] = React.useState(false);
  const handleVaultsClick = () => {
    if (!open) {
      handleDrawerOpen();
    }
    setVaultsOpen(!vaultsOpen);
  };

  const [walletsOpen, setWalletsOpen] = React.useState(false);
  const handleWalletsClick = () => {
    if (!open) {
      handleDrawerOpen();
    }
    setWalletsOpen(!walletsOpen);
  };

  const [usefullLinksOpen, setUsefulllinksOpen] = React.useState(false);
  const handleUsefullLinksClick = () => {
    if (!open) {
      handleDrawerOpen();
    }
    setUsefulllinksOpen(!usefullLinksOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const buyOpen = Boolean(anchorEl);
  const handleBuyClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBuyClose = () => {
    setAnchorEl(null);
  };

  const screenSM = useMediaQuery('(min-width:600px)');

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            style={{
              gridGap: '100px',
              minHeight: '100px',
            }}
          >
            {/* <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: !open ? '24px !important' : '0 !important',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon
                sx={{
                  color: 'white',
                  fill: 'white',
                }}
              />
            </IconButton> */}
            <div>
              <h3 style={{ color: '#212652', fontSize: '2.2rem' }}>ADEY'S</h3>
              <h3 style={{ color: '#E4E935', fontSize: '2.2rem' }}>ADVANTAGE</h3>
            </div>
            <Box
              style={{
                flexGrow: '1',
                display: 'flex',
              }}
            ></Box>
            <div
              className="price-flex"
              style={{
                gridGap: '50px',
              }}
            >
              <div className="price-item">
                <a
                  className="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xd25e8D31C43133Af6E5321228E19EC4CbA66718d"
                >
                  <img src={grapeImg} alt="Grape" width={45} height={45} />
                  <span className="token-price">{grapePrice ? '$' + grapePrice : '--'}</span>
                </a>
              </div>
              <div className="price-item">
                <a
                  className="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7"
                >
                  <img src={wineImg} alt="Wine" width={45} height={45} />
                  <span className="token-price">{winePrice ? '$' + winePrice : '--'}</span>
                </a>
              </div>
              <div className="price-item">
                <a
                  className="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.swapsicle.io/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x01Af64EF39AEB5612202AA07B3A3829f20c395fd#/"
                >
                  <img src={vintageImg} alt="Wine" width={45} height={45} />
                  <span className="token-price">{vintagePrice ? '$' + vintagePrice : '--'}</span>
                </a>
              </div>
              {/* <div className="price-item">
                <img src={grapeMimImg} alt="TWAP" height={35} />
                <span className="token-price">{twap ? twap : '--'}/1.01</span>
              </div> */}
            </div>

            <Box
              style={{
                display: 'flex',
                gridGap: '20px',
              }}
            >
              {/* {screenSM && (
                <div>
                  <Button
                    className="shinyButton"
                    aria-haspopup="true"
                    aria-expanded={buyOpen ? 'true' : undefined}
                    disableElevation
                    onClick={handleBuyClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Buy
                  </Button>
                  <StyledMenu
                    id="customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={buyOpen}
                    onClose={handleBuyClose}
                  >
                    <a
                      className="menu-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xd25e8D31C43133Af6E5321228E19EC4CbA66718d"
                    >
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy Grape
                      </MenuItem>
                    </a>
                    <a
                      className="menu-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7"
                    >
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy Wine
                      </MenuItem>
                    </a>
                    <a className="menu-item" href="/bond">
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy Gbond
                      </MenuItem>
                    </a>
                    <a
                      className="menu-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.swapsicle.io/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x01Af64EF39AEB5612202AA07B3A3829f20c395fd#/"
                    >
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy Vintage
                      </MenuItem>
                    </a>
                    <Divider sx={{ my: 0.5 }} />
                    <a
                      className="menu-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://nftrade.com/assets/avalanche/0x99fec0ca5cd461884e2e6e8484c219bbfb91e2df"
                    >
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy NFTs with Avax
                      </MenuItem>
                    </a>
                    <a
                      className="menu-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://hexagon.market/collections/0x99fec0ca5cd461884e2e6e8484c219bbfb91e2df?sort=-highestPrice"
                    >
                      <MenuItem onClick={handleBuyClose} disableRipple>
                        Buy NFTs with Grape
                      </MenuItem>
                    </a>
                  </StyledMenu>
                </div>
              )} */}
              <AccountButton text="Connect" />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          style={{
            color: '#322f32 !important',
            backgroundColor: '#fff !important',
            boxShadow: 'none !important',
            borderRadius: '0 !important',
          }}
        >
          <img src={grapeImg} alt="Grape" style={{ margin: '5px 30px', width: 'calc(100% - 60px)' }} />
          <div style={{ background: '#EAFF45', margin: '0px 30px', borderRadius: '15px' }}>
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a href="/" className="menu-item" rel="noopener noreferrer" style={{ padding: 0, display: 'block' }}>
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={homeIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>HOME</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>
            <Divider color="#aaa" />

            <List>
              <Tooltip arrow followCursor title={open ? '' : 'Dashboard'} placement="top-start">
                <ListItem className="menu-item" button component={Link} to="#" disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={grapeImg} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>KINGDOM</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              {/* <Tooltip arrow followCursor title={open ? '' : "ADEY'S HOME"} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/dashboard"
                  disablePadding
                  sx={{ display: 'block', textAlign: 'left' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>ADEY'S HOME</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip> */}
              <Tooltip arrow followCursor title={open ? '' : 'FARMERS VILLAGE'} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/vineyard"
                  disablePadding
                  sx={{ display: 'block', textAlign: 'left' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>FARMERS VILLAGE</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Tooltip arrow followCursor title={open ? '' : 'HIGH YIELD MARKET'} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/winery"
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>HIGH YIELD MARKET</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Tooltip arrow followCursor title={open ? '' : "ADEY'S STRATEGIES"} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/strategies"
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>ADEY'S STRATEGIESY</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Tooltip arrow followCursor title={open ? '' : "ADEY'S Bonds"} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/bond"
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>ADEY'S Bonds</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Tooltip arrow followCursor title={open ? '' : "ADEY'S DAO"} placement="top-start">
                <ListItem
                  className="menu-item"
                  button
                  component={Link}
                  to="/dao"
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px 20px',
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <h1 style={{ fontSize: '0.8rem', color: '#000000' }}>ADEY'S DAO</h1>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </List>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={tokenIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>TOKEN</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>MINTER</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={bridgeIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>BRIDGE</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={fiatIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>FIAT</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={swapIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>SWAP/LP</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={vaultIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>VAULT</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>

            <Divider color="#aaa" />
            <Tooltip arrow followCursor title={open ? '' : 'Wine Press'} placement="top-start">
              <a
                href="/"
                target="_blank"
                className="menu-item"
                rel="noopener noreferrer"
                style={{ padding: 0, display: 'block' }}
              >
                <ListItem className="menu-item" button disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'black',
                        minWidth: 0,
                        mr: '0px',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={dexIcon} alt="Home" width={50} />
                    </ListItemIcon>
                    <div style={{ textAlign: 'left' }}>
                      <h1 style={{ fontSize: '1.0rem', color: '#0C5D2D' }}>ADEY'S</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>MULTICHAIN</h1>
                      <h1 style={{ fontSize: '1.0rem', color: 'black' }}>DEX</h1>
                    </div>
                  </ListItemButton>
                </ListItem>
              </a>
            </Tooltip>
          </div>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
            {children}
          </Container>
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default Page;
