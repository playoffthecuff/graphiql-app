/* eslint-disable react/prop-types */
import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {Link} from '@remix-run/react';
import {Team} from '~/models/index';

interface TeamCardProps {
  team: Team;
  key: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({team}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box display="flex" height="100%">
        <Card
          style={{flexGrow: 1}}
          sx={{
            flexGrow: 1,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {boxShadow: 6},
          }}>
          <CardContent>
            <Link to={team.git}>
              <Avatar src={team.image} sx={{width: 150, height: 150, margin: '0 auto'}} />
            </Link>
            <Typography variant="h6" component="div" align="center">
              {team.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{marginBottom: 2}}>
              {team.role}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              {team.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};
