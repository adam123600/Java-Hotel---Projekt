import * as React from "react";
import { Font ,Document, Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import RoomService from "../../service/RoomService";
import ServicesService from "../../service/ServicesService";

const hotelImg = require('../../image/hotelReceiptTop.png');

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
  });

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        padding: 30,
        fontSize: 12,
    },
    textInfo: {
        paddingLeft: 35,
        marginBottom: 50,
    },
    paymentInfo: {
        marginLeft: 120,
    },
    tableHeader: {
        color: "#ffcccc",
    },
    price: {
        marginLeft: 230,
    },
    bottomLine: {
        paddingLeft: 20,
        paddingRight: 20,
        border: '1px solid #000',
    }

})

export default class PdfReceipt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            guest: "",
            room: "",
            servicesType: [],
        }
    }

    componentDidMount(){
        RoomService.getRoomServices(this.props.room).then( 
            results => results.map( service => {
                ServicesService.getServiceType(service).then(serviceType => {
                    this.setState({
                        servicesType: this.state.servicesType.concat(serviceType)
                    })
                })
            }));

        this.setState({
            guest: this.props.guest,
            room: this.props.room,
        })
    }

    render(){
        var credit = 0;
        this.state.servicesType.forEach( function(service){
            credit += service.price;
        })
        credit += this.state.room.balance;
        console.log(credit)
        return(
            <Document>
                <Page style={styles.page}>
                    <Image source={hotelImg}/>
                    <View style={styles.textInfo}>
                        <Text>The Grand Budapest Hotel</Text>
                        <Text>Kraków</Text>
                        <Text>Ulica 1</Text>
                        <Text>31-062</Text>
                    </View>
                    <View style={styles.paymentInfo}>
                        <Text>{"Pokój numer " + this.state.room.roomName}</Text>
                        <Text style={styles.price}>{this.state.room.balance + " zł."}</Text>
                    </View> 
                    {
                        this.state.servicesType.map( service => (
                            <View style={styles.paymentInfo}>
                                <Text>{service.type}</Text>
                                <Text style={styles.price}>{service.price + " zł."}</Text>
                            </View>
                        ))
                    }
                    <View style={styles.bottomLine}></View>
                    <View style={styles.paymentInfo}>
                        <Text>Suma</Text>   
                        <Text style={styles.price}>{credit + " zł."}</Text>   
                    </View>
                </Page>
            </Document>        
        );
    }
    
}