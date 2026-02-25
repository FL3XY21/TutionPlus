import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button
} from "@mui/material";

const MaterialCard = ({ material }) => {

    return (

        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {material.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                >
                    {material.description}
                </Typography>

                <Box mt={2}>

                    <Typography variant="body2">
                        Class: {material.classId?.sclassName || "N/A"}
                    </Typography>

                    <Typography variant="body2">
                        Subject: {material.subjectId?.subName || "N/A"}
                    </Typography>

                    <Typography variant="body2">
                        Uploaded:
                        {" "}
                        {new Date(material.createdAt)
                            .toLocaleDateString()}
                    </Typography>

                </Box>

                <Box
                    mt={2}
                    display="flex"
                    gap={1}
                >

                    <Button
                        variant="contained"
                        color="primary"
                        href={material.fileUrl}
                        target="_blank"
                        fullWidth
                    >
                        View
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        href={material.fileUrl}
                        download
                        fullWidth
                    >
                        Download
                    </Button>

                </Box>

            </CardContent>

        </Card>

    );

};

export default MaterialCard;