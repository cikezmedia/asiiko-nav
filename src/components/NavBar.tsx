import './NavBar.scss';
import PrimaryButton from '../common/components/PrimaryButton';
import SecondaryButton from '../common/components/SecondaryButton';
import Logo from '../img/logo.png';
import { RiMenu3Fill } from 'react-icons/ri';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const NavBar = () => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handler = (e: any) => {
      if (show && !ref.current?.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [show]);

  return (
    <>
      <header ref={ref}>
        <div className='menu-link'>
          <div>
            <img src={Logo} alt='Logo' />
          </div>
          <button
            onClick={() => setShow((prev) => !prev)}
            className='hamburger'
          >
            <RiMenu3Fill />
          </button>
          {/* Desktop Menu */}
          <nav className='desktop-menu'>
            <ul>
              <li>Features</li>
              <li>Who We Serve</li>
              <li>Pricing</li>
            </ul>
          </nav>
        </div>
        {/* Mobile Menu */}
        {show && (
          <nav className='mobile-menu'>
            <ul>
              <li>Features</li>
              <li>Who We Serve</li>
              <li>Pricing</li>
            </ul>
            <div className='mobile-button'>
              <PrimaryButton />
              <Button onClick={handleOpen}>
                <SecondaryButton />
              </Button>
            </div>
          </nav>
        )}

        <div className='desktop-button'>
          <PrimaryButton />
          <Button onClick={handleOpen}>
            <SecondaryButton />
          </Button>
        </div>
      </header>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <div onClick={handleClose} className='close'>
              X
            </div>
            Modal item will appear here.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
