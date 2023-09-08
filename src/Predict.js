import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);


export default function Predict({data, isLoading}) {
    
    const [showSkeleton, setShowSkeleton] = useState(isLoading);

    useEffect(() => {
    }, [data]);
  
    useEffect(() => {
      setShowSkeleton(isLoading);
    }, [isLoading]);

    if (!data) {
        return <div>Loading...</div>;
      }

    return (
        <Card  loading={showSkeleton} sx={{ minWidth: 275 }} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Log Details
                </Typography>
                <Typography variant="h5" component="div">
                    Log ID: {rows.logId}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    License Plate: {rows.licensePlate}
                </Typography>
                <Typography variant="body2">
                    Accuracy: {rows.accuracy}
                    <br />
                    State: {rows.state}
                    {/* Add more fields as needed */}
                </Typography>
            </CardContent>
        </Card>
    );
}