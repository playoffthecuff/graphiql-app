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
import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from 'react-i18next';
import {Variable} from './models/variable';
import {variableNamePattern, variableValuePattern} from './models/regex';

interface VariableProps {
  onChange: (variables: Variable[]) => void;
  vars: Variable[];
}

const initialVariable: Variable = {
  name: '',
  value: '',
  checked: false,
};

const VariablesEditor: React.FC<Partial<VariableProps>> = ({onChange, vars = []}) => {
  const {t} = useTranslation();
  const [variables, setVariables] = useState<Variable[]>(vars);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleVariableAddition = () => {
    const updatedVariables = [...variables, initialVariable];
    setVariables(updatedVariables);
    if (onChange) onChange(updatedVariables);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleVariableChange = (field: keyof Variable, value: string) => {
    const pattern = field === 'name' ? variableNamePattern : variableValuePattern;

    if (pattern.test(value) || value === '') {
      if (editingIndex !== null) {
        const updatedVariables = [...variables];
        updatedVariables[editingIndex] = {...updatedVariables[editingIndex], [field]: value};
        setVariables(updatedVariables);
        if (onChange) onChange(updatedVariables);
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedVariables = [...variables];
    updatedVariables[index].checked = !updatedVariables[index].checked;
    setVariables(updatedVariables);
    if (onChange) onChange(updatedVariables);
  };

  const handleEditFinish = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
    if (onChange) onChange(updatedVariables);
  };

  return (
    <Container sx={{width: '90%', padding: 2}}>
      <Box sx={{width: '100%'}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={2}>
        <Typography component={'h6'} variant="h6">
          {t('editors.variablesTitle')}
        </Typography>
        <Button variant="contained" onClick={handleVariableAddition}>
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
                <b>{t('editors.nameTitle')}</b>
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
            {variables.map((variable, index) => (
              <TableRow
                key={index}
                sx={index === editingIndex ? {backgroundColor: blue[100]} : {backgroundColor: 'transparent'}}>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Checkbox checked={variable.checked} onChange={() => handleCheckboxChange(index)}></Checkbox>
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Input
                    value={variable.name}
                    disableUnderline
                    fullWidth
                    disabled={index !== editingIndex}
                    onChange={e => handleVariableChange('name', e.target.value)}
                    onKeyDown={handleEditFinish}
                    onBlur={() => setEditingIndex(null)}
                  />
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Input
                    value={variable.value}
                    disableUnderline
                    fullWidth
                    disabled={index !== editingIndex}
                    onChange={e => handleVariableChange('value', e.target.value)}
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

export default VariablesEditor;
