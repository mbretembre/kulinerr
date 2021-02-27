import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, InfoWindowManager } from '@agm/core';
import { GeoService } from '../geo.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/firestore';
import {GoogleMapsAPIWrapper } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShrngService } from '../srv/shrng.service';
import { NavController } from '@ionic/angular';


declare var google:any;

// const directionsService = new google.maps.DirectionsService();
// const directionsRenderer = new google.maps.DirectionsRenderer();


@Component({
  selector: 'apgmp',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
@NgModule({
  imports: [
     AgmCoreModule,
    ]
 })

export class GMapComponent implements OnInit {
  lat:number;
  lng:number;
  map:google.maps.Map;
  crdTmp:any[];
  ltTmp:number;
  lgTmp:number;
  started:any;
  ended:any;
  data:any[];
  loadedData:any[];
  crdData:number[];
  nameData:number[];
  coords: any;
  markers:any;
  tmp:number;
  userLocation:any;
  infw:any;
  rld:boolean=false;
  siteLocation: any;
  canCheckIn: boolean;
  lngth:number;
  cek:any;

 
  constructor(
  private geo:GeoService,
  private afs:AngularFirestore,
  private gmApi:GoogleMapsAPIWrapper,
  private shareIt:ShrngService,
  public navCtrl: NavController,
  ) {}

  
  async ngOnInit() {
    this.rld=this.shareIt.getBln()
    if(this.rld==true){
      location.reload()
    }
    // await this.clct()
    this.initMap()
    this.setCurrentPosition()
    // this.updateUserLocation()
  
    this.afs.collection(`locations`).valueChanges().subscribe(res=> {
      this.data=res;
      this.lngth=this.data.length
      console.log(this.lngth)
     },);
    
  }//end of onInit

  async shr(a){ 
    // await this.clct(a);
    this.shareIt.setMsg(a)
 
    // this.clct(a);
    // console.log(this.lngth)
    // for(let i=0;i<this.lngth;i++)
    // {
    //   console.log(this.loadedData[i])
    // }
    // console.log(a);
    // this.shareIt.setArray(this.loadedData)
    // console.log(this.loadedData )
    this.navCtrl.navigateRoot('dloc')
  }

  public clct(a){
    this.afs.collection(`locations`, ref => ref.where('Nama', '==', a)).valueChanges().subscribe(res=>{
      this.loadedData=res;
      // var ancok=[];
      // res.docs.forEach((doc)=>{
      //   ancok.push(doc.data())
      //   this.loadedData=ancok;
      //   this.lngth=this.loadedData.length
      // })    
    });
  }

  
  public addMarker(){
   const map = this.gmApi.createMap(document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  );
    console.log(this.lngth)
    for( let i=0; i<3; i++){

     console.log(this.loadedData[i].coords.latitude,this.loadedData[i].coords.longitude)
      const mrkr = this.gmApi.createMarker(
        {
        position:{lat:this.loadedData[i].coords.latitude,lng:this.loadedData[i].coords.longitude},
        clickable:true
        })
      const infw = this.gmApi.createInfoWindow({
          content: this.loadedData[i].Nama
      })

        // mrkr.catch.apply("click", () =>{
        // (await infw).open(map, mrkr)
      // })
        // this.markers.addListener('click', ((this.markers, this.map, this.infw)=>{ return() => {}})  )
        // return () =>{

        //   this.infw.setContent('<b> this.loadedData[i].Nama</b>');
        //   this.infw.open(this.map, this.markers);
        // }))
      }//end For
  }//end Addmarker
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.lat=position.coords.latitude
        this.lng=position.coords.longitude
        this.gmApi.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        // if (!this.userLocation) {
        //   this.userLocation = await this.gmApi.createMarker(
        //     {
        //       position: { lat: position.coords.latitude, lng: position.coords.longitude },
        //       clickable: true
        //     })
        // } else {
          // this.userLocation.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        // }
      })
    }
  }

  public rst(){location.reload()}
  public initMap(){
    this.gmApi.createMap(document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  );
  }
//   private updateUserLocation() {
//     navigator.geolocation.watchPosition(async (position) => {
//       this.setCurrentPosition()
//       // this.checkUserLocation()
//     })
//   }
//   async setWorkSiteLocation() {
//     this.siteLocation = await this.gmApi.createCircle({
//       center: {
// //Pick a circle location that is near your current position
//         lat: this.lat,
//         lng: this.lng 
//       },
//       radius: 400
//     })
//   }
  // public checkUserLocation() {
  //   const bounds = this.siteLocation.getBounds()
  //   if (bounds.contains(this.userLocation.position)) {
  //     this.canCheckIn = true
  //   }
  // }


  // public getUserLocation(){
  //   if(navigator.geolocation){
      
  //   navigator.geolocation.getCurrentPosition(position=>{
  //     this.lat=position.coords.latitude;
  //     this.lng=position.coords.longitude;
  //     this.coords=position.coords;
      // this.geo.getLocations(500, [this.lat, this.lng])
  //   });
  //   }
  // }//end of GetUserLocation
  
  public setRoute(a,b) {
    // const ended=document.getElementById("end")
    // console.log(this.lat, this.lng,a,b)
  //   const map = this.gmApi.createMap(document.getElementById("map") as HTMLElement,
  //   {
  //     zoom: 8,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  // )
  // this.setCurrentPosition()
  
    // if(this.tmp=null){
    // location.reload()}
    this.gmApi.getNativeMap().then(map => {

    // for (let i = 0; i < this.tmp.length; i++) {
    //   this.tmp[i].setMap(null);
    // }
    
    this.started=new google.maps.LatLng(this.lat,this.lng),
    this.ended=new google.maps.LatLng(a,b);
    const dirService=new google.maps.DirectionsService()
    const dirDisplay=new google.maps.DirectionsRenderer()
    
//     this.doIt=true;

//     // console.log(started,ended)
//     // window.alert(started + ended)

    dirDisplay.setMap(map);
    dirService.route({

      origin: this.started,
      destination: this.ended,      
      travelMode: 'DRIVING',
      // optimizeWaypoints: true
      // visible:true
    }, (res, status) => {
      console.log(res)
      // window.alert(res.routes.length)
      if (status === 'OK') {
        if(this.tmp>1){this.tmp=0;}
          else{this.tmp++;}

      console.log(this.tmp)  
      dirDisplay.setDirections(res);
      }//end if status 
      else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  });

}}
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.036 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: uluru,
//   });
// }




// function initMap(): void {
//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();

//   directionsRenderer.setMap(Map);

//   const onChangeHandler = function () {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   };
//   (document.getElementById("start") as HTMLElement).addEventListener(
//     "change",
//     onChangeHandler
//   );
//   (document.getElementById("end") as HTMLElement).addEventListener(
//     "change",
//     onChangeHandler
//   );
// }

