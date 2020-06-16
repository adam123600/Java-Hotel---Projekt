import * as React from "react";
import { Font ,Document, Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import { Table, TableHeader, TableCell, TableBody, DataTableCell, TableBorder, br} from "@david.kucsai/react-pdf-table"
import { Collapse } from "reactstrap";
import { TableRow } from "@david.kucsai/react-pdf-table/lib/TableRow";
import RoomService from "../../service/RoomService";
import ServicesService from "../../service/ServicesService";

const hotelImg = require('../../image/hotelBillTop.png');

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

export default class PdfBill extends React.Component{
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
            
        
        /*RoomService.getRoomServices(this.props.room).then(
            results => {
                this.setState({
                    services: results,
                })
        })*/
        this.setState({
            guest: this.props.guest,
            room: this.props.room,
        })
    }

    render(){
        /*let servicesInfo = this.state.services.map( service => (
            ServicesService.getServiceType(service).then( serviceType => {
            return <Text>{serviceType.type} {serviceType.price}</Text>
            })
        ));*/
        /*const servicesInfo = Object.keys(this.state.services).map(key => (
            ServicesService.getServiceType(this.state.services[key]).then( serviceType => {
                //return (<Text>{serviceType.type} {serviceType.price}</Text>)
                console.log(serviceType);
            })
        ));*/
        /*var servicesInfo = this.state.servicesType.map( function(service){
            console.log("here " + service);
            return(<Text>{service.price}</Text>);
        });*/
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
                            <View key={service.id}  style={styles.paymentInfo}>
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
                    {/*<Table 
                        data={[{description: "guest room " + this.state.room.roomName, charges: this.state.room.balance + "zł", credit: ""},

                               {description: "", charges: "", credit: this.state.credit + "zł"}
                            ]}>
                        <TableHeader textAlign={"center"} styles={styles.tableHeader}
                            includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
                            <TableCell>
                                Description
                            </TableCell>
                            <TableCell>
                                Charges
                            </TableCell>
                            <TableCell>
                                Credit
                            </TableCell>
                        </TableHeader>
                        <TableBody textAlign={"center"}
                            includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false} includeBottomBorder={false}>
                            <DataTableCell getContent={(data) => data.description }/>
                            <DataTableCell getContent={(data) => data.charges}/>
                            <DataTableCell getContent={(data) => data.credit}/>
                        </TableBody>
                        
                        </Table>*/}
                </Page>
            </Document>        
        );
    }
    
}