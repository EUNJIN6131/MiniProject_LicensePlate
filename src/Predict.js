import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Predict({ rows, data, isLoading, plateImage }) {

    const [showSkeleton, setShowSkeleton] = useState(isLoading);

    useEffect(() => {
        console.log("plateImage", plateImage)
    }, [data, plateImage]);

    useEffect(() => {
        setShowSkeleton(isLoading);
    }, [isLoading]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    let sortedData = [];
    if (data) {
        sortedData = [...data].sort((a, b) => b.accuracy - a.accuracy);
        console.log("sortedData", sortedData)
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                    gap: '30px',
                    padding: '16px',
                }}
            >
                <Card sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                    mb: 3
                }}>
                    <Skeleton variant="rectangular" width={'100%'} height={'30vh'} animation="wave" alignItems='center' justifyContent='center' />
                    {/* <img
                        src={plateImage}
                        alt="Plate Image"
                        style={{ width: '100%', height: '30vh', alignItems: 'center', justifyContent: 'center', }}
                    /> */}
                </Card>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px',
                        width: '100%'
                    }}
                >
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} sx={{ width: '100%', minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                </Typography>
                                <Skeleton variant="text" width={150} height={20} animation="wave" />
                                <Skeleton variant="text" width={200} height={30} animation="wave" />
                                <Skeleton variant="text" width={100} height={15} animation="wave" />
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        );
    }

    return (
        data ?
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                    gap: '30px',
                    padding: '16px',

                }}
            >
                <Card sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                    mb: 3
                }}>
                    <img
                        src={plateImage}
                        alt="Plate Image"
                        style={{ width: '100%', height: '30vh', alignItems: 'center', justifyContent: 'center', }}
                    />
                </Card>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px',
                        width: '100%'
                    }}
                >
                    {sortedData.map((item, index) => (
                        <Card key={index} sx={{ width: '100%', minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                </Typography>
                                <Typography variant="h5" component="div">
                                    모델명 : {item.modelType}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    예측 차량번호 : {item.predictedText}
                                </Typography>
                                <Typography variant="body2">
                                    인식률 : {item.accuracy.toFixed(3)}
                                    <br />
                                    등록상태 : {item.present ? '등록 번호' : '미등록 번호'}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
            :

            // <Box
            //     sx={{
            //         display: 'flex',
            //         alignItems: 'center',
            //         gap: '30px',
            //         width: '100%',
            //         justifyContent: 'center'
            //     }}
            // >

            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                width: '100%',
                justifyContent: 'center'
            }}>
                {/* <CardContent> */}
                <img src="/fail.png" />
                {/* </CardContent> */}
            </Card>
    );
}