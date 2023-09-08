import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Modal from 'react-modal';

const bull = (

    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);

export default function Predict({ rows, data, isLoading, plateImage  }) {

    const [showSkeleton, setShowSkeleton] = useState(isLoading);

    useEffect(() => {
        console.log("plateImage", plateImage)
    }, [data, plateImage]);
    
    useEffect(() => {
        setShowSkeleton(isLoading);
    }, [isLoading]);

    if (!data) {
        return <div>Loading...</div>;
    }

        
    return (
        <>
       <div>
            <img src={plateImage} alt="Plate Image" />
        </div>

        <div>
          {data.map((item, index) => (
            <Card isLoading={showSkeleton} key={index} sx={{ width:'100%',minWidth: 275, margin: '16px' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <Typography variant="h5" component="div">
                seq : {item.logId}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  예측 차량번호 : {item.predictedText}
                </Typography>
                <Typography variant="body2">
                  모델명 : {item.modelType}
                  <br />
                  {/* Add more fields as needed */}
                  인식률 : {item.accuracy}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        </>

    );
}