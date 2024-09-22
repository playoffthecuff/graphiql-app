import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';

interface AccordionProps {
  label: string;
  children: React.ReactNode;
}

export const AccordionBlock: React.FC<AccordionProps> = ({label, children}) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        <Typography component={'h6'} variant="h6">
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
