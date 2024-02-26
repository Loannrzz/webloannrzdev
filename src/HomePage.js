import "./style/HomePage.scss";
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import {useEffect, useState} from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Sheet, Stack} from "@mui/joy";


function changepage() {
    window.open("https://github.com/Loannrzz", "_blank");
}

function Moyen_data(value) {
    const [waka, setWaka] = useState(null);
    const [layout, setLayout] = React.useState(undefined);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''}/data`).catch(console.error)
            .then(response => response.json())
            .then(data => setWaka(data));
    }, []);

    if (waka === null) return "Chargement..."


    // remove keys who have 0 in value
    let filtered = Object.fromEntries(
        Object.entries(waka.languages).filter(([key, value]) => value !== 0)
    );
    let output = [];
    for (let [key, value] of Object.entries(filtered)) {
        output.push({name: key, value: value});
    }
    output = output.sort((a, b) => b.value - a.value)
        .filter((elem, index) => index < 4);

    let values_sum = 0;
    for (let elem of output) {
        values_sum += elem.value;
    }

    return (
        <div className={"second_part"}>

            {output.map((elem) => {
                return <div className={"f1-round-waka"}>
                    <React.Fragment>
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={() => {
                                    setLayout('center');
                                }}
                            sx={{

                            }}>
                                {elem.name}
                            </Button>
                        </Stack>
                        <Modal open={!!layout} onClose={() => setLayout(undefined)}>
                            <ModalDialog layout={layout}>
                                <ModalClose />
                                <DialogTitle>Modal Dialog</DialogTitle>
                                <DialogContent>
                                    <div>
                                        This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
                                        close it.
                                    </div>
                                </DialogContent>
                            </ModalDialog>
                        </Modal>
                    </React.Fragment>
                    <ProgressBar completed={Math.round(elem.value * 100 / values_sum)} bgColor="#176BCB"></ProgressBar>
                </div>
            })}


        </div>
    )
}

export default function HomePage() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(inOpen);
    };

    return (
        <div className={"page"}>
            <div className={"homepage"}>
                <div className={"Loannrzdev"}>
                    <Card
                        sx={{
                            width: '500px',
                            height: '300px',
                            variant: 'outlined',
                            borderRadius: '12px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            }}
                        >
                            <Avatar src={"/assets/img/img_loannrzdev.jpeg"} size="lg"/>
                            <AvatarGroup size="sm" sx={{'--Avatar-size': '28px'}}>
                                <Avatar src="/assets/img/thomarzdev.png"/>
                                <Avatar src="/assets/img/epitech.png"/>
                                <Avatar src="/assets/img/logi-it.png"/>
                                <Avatar>+18</Avatar>
                            </AvatarGroup>
                        </Box>
                        <CardContent>
                            <Typography level="title-lg">LoannrzDev</Typography>
                            <Typography level="body-sm">
                                We are a community of developers prepping for coding interviews,
                                participate, chat with others and get better at interviewing.
                            </Typography>
                        </CardContent>
                        <CardActions sx=
                                         {{
                                             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                         }}>

                            <IconButton variant="outlined" color="neutral" sx=
                                {{
                                    mr: '30px', paddingRight: '100px', paddingLeft: '100px',
                                }}>
                                <FavoriteBorder color="primary" variant="outlined" size="lg"/>
                            </IconButton>

                            <Button endDecorator={<KeyboardArrowRight/>} sx={{
                                display: 'column', justifyContent: 'center', alignItems: 'right',
                            }}
                                    color="primary"
                                    onClick={changepage}>
                                Github page
                            </Button>

                        </CardActions>
                    </Card>
                </div>

                <div className={"Text_me"}>


                </div>

                <div className={"CrossBar"}>
                    <Box sx={{display: 'flex'}}>
                        <Button variant="outlined" onClick={toggleDrawer(true)}>
                            Menu
                        </Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}
                                anchor="right"
                                color="primary"
                                size="sm"
                                variant="soft"
                        >
                            <Box
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >

                                <List className={"MenuList"}
                                      sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'left',
                                          alignItems: 'left',
                                      }}
                                >
                                    {['Moi', 'Projects', 'Fomration', 'Contact'].map((text) => (<ListItem key={text}>
                                        <ListItemButton>{text}</ListItemButton>
                                    </ListItem>))}
                                </List>

                            </Box>
                        </Drawer>
                    </Box>
                </div>
            </div>

            <Moyen_data/>

        </div>);
}
