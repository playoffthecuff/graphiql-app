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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useTranslation} from 'react-i18next';
import {QueryParam} from './models/queryParams';
import {variableNamePattern, variableValuePattern} from '../VariablesEditor/models/regex';

const initialVariable: QueryParam = {
  name: '',
  value: '',
  checked: false,
};

type Props = {
  onParamsChange: (params: QueryParam[]) => void;
  queryParams: QueryParam[];
};

const QueryParamsEditor: React.FC<Partial<Props>> = ({onParamsChange, queryParams = []}) => {
  const {t} = useTranslation();
  const [params, setParams] = useState<QueryParam[]>(queryParams);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => setParams(queryParams), [queryParams]);

  const handleParamAddition = () => {
    setParams([...params, initialVariable]);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleParamChange = (field: keyof QueryParam, value: string) => {
    const pattern = field === 'name' ? variableNamePattern : variableValuePattern;

    if (pattern.test(value) || value === '') {
      if (editingIndex !== null) {
        const updatedParams = [...params];
        updatedParams[editingIndex] = {...updatedParams[editingIndex], [field]: value};
        setParams(updatedParams);
        onParamsChange?.(updatedParams);
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedParams = [...params];
    updatedParams[index].checked = !updatedParams[index].checked;
    setParams(updatedParams);
    onParamsChange?.(updatedParams);
  };

  const handleEditFinish = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedParams = params.filter((_, i) => i !== index);
    setParams(updatedParams);
    onParamsChange?.(updatedParams);
  };

  return (
    <Container sx={{width: '90%', padding: 2}}>
      <Box sx={{width: '100%'}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={2}>
        <Typography component={'h6'} variant="h6">
          {t('editors.paramsTitle')}
        </Typography>
        <Button variant="contained" onClick={handleParamAddition}>
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
            {params.map((variable, index) => (
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
                    onChange={e => handleParamChange('name', e.target.value)}
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
                    onChange={e => handleParamChange('value', e.target.value)}
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

export default QueryParamsEditor;
