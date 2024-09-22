import {
  Box,
  Button,
  Checkbox,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import React, {useEffect, useState} from 'react';
import {Header} from './models/header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from 'react-i18next';

interface HeaderProps {
  decodedHeaders: Header[];
  setStoredHeaders: (headers: Header[]) => void;
}

const initialHeader: Header = {
  key: '',
  value: '',
  checked: false,
};

const HeadersEditor: React.FC<HeaderProps> = ({decodedHeaders, setStoredHeaders}) => {
  const {t} = useTranslation();
  const [headers, setHeaders] = useState<Header[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (headers.length > 0 && JSON.stringify(headers) !== JSON.stringify(decodedHeaders)) {
      setStoredHeaders(headers);
    }
  }, [headers, setStoredHeaders, decodedHeaders]);

  useEffect(() => {
    if (decodedHeaders.length > 0) {
      setHeaders(decodedHeaders);
    }
  }, [decodedHeaders]);

  const handleHeaderAddition = () => {
    setHeaders([...headers, initialHeader]);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleHeaderChange = (field: keyof Header, value: string) => {
    if (editingIndex !== null) {
      const updatedHeaders = [...headers];
      updatedHeaders[editingIndex] = {...updatedHeaders[editingIndex], [field]: value};
      setHeaders(updatedHeaders);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index].checked = !updatedHeaders[index].checked;
    setHeaders(updatedHeaders);
  };

  const handleEditFinish = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };

  return (
    <Container sx={{width: '90%', padding: 2}}>
      <Box sx={{width: '100%'}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={2}>
        <Typography component={'h6'} variant="h6">
          {t('editors.headersTitle')}
        </Typography>
        <Button variant="contained" onClick={handleHeaderAddition}>
          {t('editors.add')}
        </Button>
      </Box>
      <TableContainer sx={{width: '100%', border: '1px solid', borderColor: grey[200]}}>
        <Table sx={{border: '1px solid', borderColor: grey[100]}} padding="normal" size="small">
          <TableHead sx={{backgroundColor: grey[100]}}>
            <TableRow>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], minWidth: '75px'}}></TableCell>
              <TableCell
                sx={{
                  border: '1px solid',
                  borderColor: grey[200],
                  width: '35%',
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                }}>
                <b>{t('editors.keyTitle')}</b>
              </TableCell>
              <TableCell
                sx={{
                  border: '1px solid',
                  borderColor: grey[200],
                  width: '35%',
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                }}>
                <b>{t('editors.valueTitle')}</b>
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], minWidth: '160px'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow
                key={index}
                sx={index === editingIndex ? {backgroundColor: blue[100]} : {backgroundColor: 'transparent'}}>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Checkbox checked={header.checked} onChange={() => handleCheckboxChange(index)}></Checkbox>
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Input
                    value={header.key}
                    disableUnderline
                    fullWidth
                    disabled={index !== editingIndex}
                    onChange={e => handleHeaderChange('key', e.target.value)}
                    onKeyDown={handleEditFinish}
                    onBlur={() => setEditingIndex(null)}
                  />
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Input
                    value={header.value}
                    disableUnderline
                    fullWidth
                    disabled={index !== editingIndex}
                    onChange={e => handleHeaderChange('value', e.target.value)}
                    onKeyDown={handleEditFinish}
                    onBlur={() => setEditingIndex(null)}
                  />
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Box display={'flex'} alignItems={'center'}>
                    <Button onClick={() => handleEditClick(index)} aria-label="Edit">
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(index)} aria-label="Delete">
                      <DeleteIcon />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HeadersEditor;
