import { StyleSheet, SafeAreaView, ScrollView, View,Text } from 'react-native';
import {Button } from '@rneui/base';
import React , {useEffect,useState} from 'react'
import { auth, db } from '../fireBase';
import { DataTable } from 'react-native-paper';
import { shareAsync } from 'expo-sharing';
import { printAsync } from 'expo-print';

const DetailsDScreen = () => {


  // get name from database 

let userID = auth.currentUser.uid
let userEmail = auth.currentUser.email
let userCIN = auth.currentUser.photoURL

const  [Dname,setDname] = useState("");
const [origin,setOrigin] = useState("");
const [destination,setdestination] = useState("");
const [currentDate,setcurrentDate]=useState('')
const [handingC,sethandingC]=useState(0)
const [size,setsize]=useState("")
const [totalPrice,settotalPrice]=useState(0)
const [CIN,setCIN]=useState("")

   

  useEffect(()=>{
      const unsubscrib = db.collection('users').doc(userID).onSnapshot(snapschot => (
        setDname(snapschot.get("Name")),
        setdestination(snapschot.get("adderDestination")),
        setOrigin(snapschot.get("addrOrigin")),
        setcurrentDate(snapschot.get("date")),
        sethandingC(snapschot.get("handing")),
        setsize(snapschot.get("size")),
        settotalPrice(snapschot.get("price")),
		setCIN(snapschot.get("CIN"))
        
        
      ))
      return unsubscrib
  },[])
  
  //end get name

  let sizeCoast = 0;
  switch(size) {
    case 'small':
      sizeCoast =  10 ;
      break;
    case 'medium':
      sizeCoast =  20 ;
      break;
    case 'large':
      sizeCoast =  30 ;
      break;
      
  }

  //pdf

  const html =`
  <html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="https://www.sparksuite.com/images/logo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Invoice #: ${userID} 
									Date: ${currentDate}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									AddrOrigin : ${origin} <br />
									AddrDestination : ${destination} <br />
									Driver : Johny
								</td>

								<td>
									Custumar Name : ${Dname} <br />
									C.I.N : ${CIN}<br />
									${userEmail}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Credit Card </td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Description</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Driving Coast</td>

					<td>100.00 DH</td>
				</tr>

				<tr class="item">
					<td>Handing</td>

					<td>${handingC} DH</td>
				</tr>

				<tr class="item last">
					<td>SIZE "${size} "</td>

					<td>${sizeCoast}.00 DH</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: ${totalPrice}.00 DH</td>
				</tr>
			</table>
		</div>
	</body>
</html>
  `;

  let generatePdf = async () =>{
    const file = await printAsync({
      html:html,
      
    });
   
  };

  return (
    <SafeAreaView>
        <ScrollView>


        <View style={{ margin:15,width:"93%",elevation:25,backgroundColor:"#eeeeee",alignSelf:'center',borderRadius:10}}>
           <View style={{marginLeft:'30%',margin:8}}><Text style={{fontWeight:'bold',color:"#f7c894"}}>DELIVERY INVOICE</Text></View> 
           <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>ID:</Text>#{userID} </Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>Driver Name :</Text>  Johny</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>Customer Name :</Text> {Dname}</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>C.I.N :</Text> {CIN}</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>Email :</Text> {userEmail}</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>AddrOrigin :</Text> {origin}</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>AddrDestination :</Text> {destination}</Text>
            <Text style={styles.textStyle}><Text style={{fontWeight:'bold'}}>Date :</Text> {currentDate}</Text>




            <DataTable>
      <DataTable.Header>
        <DataTable.Title>Description</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
        
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Driving Coast</DataTable.Cell>
        <DataTable.Cell numeric>100 DH</DataTable.Cell>
        
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Handing</DataTable.Cell>
        <DataTable.Cell numeric>{handingC} DH</DataTable.Cell>
        
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Size "{size}"</DataTable.Cell>
        <DataTable.Cell numeric>{sizeCoast} DH</DataTable.Cell>
        
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>TOTAL</DataTable.Cell>
        <DataTable.Cell numeric>{totalPrice} DH</DataTable.Cell>
        
      </DataTable.Row>


    </DataTable>
       

    </View>
    






    <Button color="#1f1e1f" containerStyle={styles.button}  title="DOWNLOAD" onPress={generatePdf} />

        </ScrollView>
    </SafeAreaView>
  )
}

export default DetailsDScreen

const styles = StyleSheet.create({
  button:{
    width:"90%",
    marginTop:10,
    margin:15,
    borderRadius:20,
  },
  textStyle:{
    margin:3,
    marginLeft:8,

  }
})