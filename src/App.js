import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import CryptoJS from 'crypto-js';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
}));

function App() {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = () => {
    if (!plaintext || !key) {
      alert('Please enter both text and key!');
      return;
    }
    const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
    setEncryptedText(encrypted);
  };

  const handleDecrypt = () => {
    if (!encryptedText || !key) {
      alert('Please enter both encrypted text and key!');
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedText(decrypted || 'Invalid key or text');
    } catch (error) {
      setDecryptedText('Invalid key or text');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          AES Encrypt/Decrypt
        </Typography>

        <TextField
          label="Plaintext"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          variant="outlined"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />

        <TextField
          label="Key"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleEncrypt}>
            Encrypt
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDecrypt}>
            Decrypt
          </Button>
        </Box>

        {encryptedText && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Encrypted Text:</Typography>
            <Typography
              variant="body1"
              sx={{
                wordWrap: 'break-word',
                backgroundColor: '#f0f0f0',
                padding: 2,
                borderRadius: 1,
                mt: 1,
              }}
            >
              {encryptedText}
            </Typography>
          </Box>
        )}

        {decryptedText && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Decrypted Text:</Typography>
            <Typography
              variant="body1"
              sx={{
                wordWrap: 'break-word',
                backgroundColor: '#e0f7fa',
                padding: 2,
                borderRadius: 1,
                mt: 1,
              }}
            >
              {decryptedText}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography marginTop={2}> This project is created for Mr.Ganjoo by Amirreza Mahmoudi</Typography>
    </StyledContainer>
  );
}

export default App;
